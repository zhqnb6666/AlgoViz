# algoviz/code_analyzer.py
"""
代码分析模块 - 负责分析代码并生成操作队列
"""
import difflib
import re
import ast
import builtins
from typing import Dict, List, Any, Optional, Union
import traceback

from operation_queue import OperationQueue
from llm.llm_factory import LLMFactory


class CodeAnalyzer:
    """
    代码分析器类 - 负责将代码转换为可视化操作队列
    """

    def __init__(self):
        """初始化代码分析器"""
        self.llm_factory = LLMFactory()

        # 创建代码转换器链
        self.code_converter = self._create_code_converter()
        self.visualization_strategy_generator = self._create_visualization_strategy_generator()
        self.code_instrumenter = self._create_code_instrumenter()

        self.repair_cases = []  # 存储格式: (error_msg, code_snippet, params, fixed_code)
        self.max_case_count = 5  # 最大存储案例数

    def analyze(self, code: str, language: str, problem_description: str, input_params: Union[List[Any], Dict[str, Any]]) -> OperationQueue:
        """
        分析代码并生成操作队列
        
        参数:
            code: 源代码
            language: 代码语言
            input_params: 输入参数，可以是列表(向后兼容)或字典(多参数支持)
            problem_description: 问题描述
            
        返回:
            OperationQueue 实例，包含可视化操作队列
        """
        # 如果不是 Python 代码，先转换为 Python
        if language.lower() != 'python':
            python_code = self._convert_to_python(code, language)
        else:
            python_code = code

        # 生成带操作队列的代码
        instrumented_code = self._instrument_code(python_code, input_params, problem_description)

        # 执行仪器化代码并获取操作队列
        queue = self._execute_instrumented_code(instrumented_code, input_params)

        return queue

    def _convert_to_python(self, code: str, source_language: str) -> str:
        """
        将其他语言的代码转换为 Python
        
        参数:
            code: 源代码
            source_language: 源语言
            
        返回:
            转换后的 Python 代码
        """
        converted_code = self.code_converter.invoke({
            "code": code,
            "source_language": source_language
        })

        # 提取代码块（如果存在）
        code_match = re.search(r'```python\n([\s\S]*?)\n```', converted_code)
        if code_match:
            return code_match.group(1).strip()

        # 如果没有代码块格式，直接返回
        return converted_code.strip()

    def _instrument_code(self, code: str, input_params: Union[List[Any], Dict[str, Any]], problem_description: str) -> str:
        """
        生成带操作队列的仪器化代码
        
        参数:
            code: Python 代码
            input_params: 输入参数，可以是列表(向后兼容)或字典(多参数支持)
            problem_description: 问题描述
        返回:
            仪器化后的代码
        """
        # 为仪器化提供 OperationQueue 的信息
        op_queue_info = self._get_operation_queue_info()

        # 先生成可视化策略
        # visualization_strategy = self.visualization_strategy_generator.invoke({
        #     "code": code,
        #     "problem_description": problem_description,
        #     "op_queue_info": op_queue_info
        # })

        instrumented_code = self.code_instrumenter.invoke({
            "code": code,
            "input_data": str(input_params),
            "op_queue_info": op_queue_info,
            "problem_description": problem_description
            # ,"visualization_strategy": visualization_strategy
        })

        # 提取代码块（如果存在）
        code_match = re.search(r'```python\n([\s\S]*?)\n```', instrumented_code)
        if code_match:
            return code_match.group(1).strip()

        return instrumented_code.strip()

    def _execute_instrumented_code(self, code: str, input_params: Union[List[Any], Dict[str, Any]]) -> OperationQueue:
        """
        执行仪器化代码并获取操作队列
        
        参数:
            code: 仪器化后的 Python 代码
            input_params: 输入参数，可以是列表(向后兼容)或字典(多参数支持)
            
        返回:
            操作队列
        """

        # 准备执行环境
        exec_globals = {
            'OperationQueue': OperationQueue,
            'queue': OperationQueue(),
            'print': print,
            'len': len,
            'range': range,
            'enumerate': enumerate,
            'min': min,
            'max': max,
            'sum': sum,
            'sorted': sorted,
            'list': list,
            'dict': dict,
            'set': set,
            'tuple': tuple,
            'int': int,
            'float': float,
            'str': str,
            'bool': bool
        }

        # 向执行环境中添加输入参数
        if isinstance(input_params, dict):
            # 添加每个参数
            for key, value in input_params.items():
                exec_globals[key] = value
            # 为向后兼容也添加input_data
            exec_globals['input_data'] = next(iter(input_params.values())) if input_params else []
        else:
            # 如果是列表，则按原来方式处理
            exec_globals['input_data'] = input_params

        # 执行代码，添加自动纠错机制
        original_code = code
        max_retries = 2
        retry_count = 0
        error_message = None
        
        while retry_count <= max_retries:
            try:
                # 执行代码
                exec(code, exec_globals)
                
                # 如果执行成功，跳出循环
                break
                
            except Exception as e:
                # 捕获错误信息
                error_message = f"执行代码时出错: {str(e)}\n{traceback.format_exc()}"
                print(error_message)
                
                # 如果已达到最大重试次数，不再重试
                if retry_count >= max_retries:
                    print(f"已达到最大重试次数 ({max_retries})，停止重试")
                    break
                
                # 否则使用LLM重新生成代码
                retry_count += 1
                print(f"正在进行第 {retry_count} 次代码修复...")
                
                # 使用LLM修复代码
                fixed_code = self._repair_code_with_llm(original_code, error_message, input_params)
                
                if fixed_code:
                    code = fixed_code
                    print("已生成修复后的代码，正在重新执行...")
                else:
                    print("无法修复代码，将使用原始代码继续执行")
                    break

        # 尝试直接调用固定函数名
        if 'visualize_algorithm' in exec_globals and callable(exec_globals['visualize_algorithm']):
            # 尝试多种调用方式，支持不同参数形式
            try:
                if isinstance(input_params, dict):
                    result = exec_globals['visualize_algorithm'](**input_params)
                else:
                    result = exec_globals['visualize_algorithm'](input_params)

                if isinstance(result, OperationQueue):
                    return result
            except Exception as e:
                print(f"执行visualize_algorithm时出错: {e}")

        # 备用方案：查找环境中的所有OperationQueue实例
        for var_name, var_value in exec_globals.items():
            if isinstance(var_value, OperationQueue) and var_name != '_execute_instrumented':
                return var_value

        # 最后的备用方案
        return OperationQueue()

    def _get_operation_queue_info(self) -> str:
        """
        获取 OperationQueue 类的函数信息
        
        返回:
            OperationQueue 类函数的说明字符串
        """
        return """
        OperationQueue 类提供以下方法：

        # 一维数组操作
        1. create_array(array, array_id=None, metadata="创建数组") -> str
        创建一个新数组并添加到操作队列

        2. swap_elements(indices, array_id, metadata=None) -> None
        交换数组中的两个元素

        3. highlight(indices, array_id, metadata=None) -> None
        高亮数组中的元素

        4. unhighlight(indices, array_id, metadata=None) -> None
        取消高亮数组中的元素

        # 二维数组操作
        5. create_array2d(array, array_id=None, metadata="创建二维数组") -> str
        创建一个新的二维数组
        
        6. swap_elements2d(row1, col1, row2, col2, array_id, metadata=None) -> None
        交换二维数组中的两个元素
        
        7. highlight2d(positions, array_id, color="#FF9999", metadata=None) -> None
        高亮二维数组中的元素，positions为(行,列)元组列表
        
        8. unhighlight2d(positions, array_id, metadata=None) -> None
        取消高亮二维数组中的元素，positions为(行,列)元组列表
        
        9. swap_rows2d(row1, row2, array_id, metadata=None) -> None
        交换二维数组中的两行
        
        10. swap_columns2d(col1, col2, array_id, metadata=None) -> None
        交换二维数组中的两列
        
        11. update_element2d(row, col, value, array_id, metadata=None) -> None
        更新二维数组中的元素值
        
        12. add_row2d(row, position, array_id, metadata=None) -> None
        在二维数组中添加一行
        
        13. add_column2d(column, position, array_id, metadata=None) -> None
        在二维数组中添加一列
        
        14. remove_row2d(position, array_id, metadata=None) -> None
        删除二维数组中的一行
        
        15. remove_column2d(position, array_id, metadata=None) -> None
        删除二维数组中的一列

        # 树操作
        16. create_root(value, node_id=None, metadata=None) -> str
        创建树的根节点

        8. add_child(parent_id, value, node_id=None, metadata=None) -> str
        向指定父节点添加子节点
        9. remove_node(node_id, metadata=None) -> None
        删除树节点

        10. highlight_node(node_id, metadata=None) -> None
        高亮树节点

        11. unhighlight_node(node_id, metadata=None) -> None
        取消高亮树节点

        12. update_value(node_id, value, metadata=None) -> None

        更新节点的值

        13. highlight_link(source_id, target_id, metadata=None) -> None
        高亮两个节点间的边

        14. unhighlight_link(source_id, target_id, metadata=None) -> None
        取消高亮两个节点间的边

        15. reparent_node(node_id, new_parent_id, metadata=None) -> None

        改变某个节点的父节点

        链表操作
        16. create_list(value, node_id=None, list_name , metadata=None) -> str

        创建链表头节点

        返回: 节点 ID

        17. append_node(value, list_name="linkedList", node_id=None, metadata=None) -> str

        在链表尾部添加节点

        18. prepend_node(value, list_name="linkedList", node_id=None, metadata=None) -> str

        在链表头部添加节点

        19. insert_after(target_id, value, list_name="linkedList", node_id=None, metadata=None) -> str
        20. insert_before(target_id, value, list_name="linkedList", node_id=None, metadata=None) -> str

        在指定节点前/后插入节点

        21. remove_list_node(node_id, list_name="linkedList", metadata=None) -> None

        删除链表中的某个节点

        22. reverse_list(list_name="linkedList", metadata=None) -> None

        整体反转链表

        23. reverse_segment(start_id, end_id, list_name="linkedList", metadata=None) -> None

        反转链表中一段区间

        24. swap_nodes(id1, id2, metadata=None) -> None

        交换链表中两个节点的值

        25. merge_lists(list1_name, list2_name, new_list_id="merged", metadata=None) -> None

        合并两个链表为新链表

        26. split_list(list_name, split_after_id, new_list_id="splitList", metadata=None) -> None

        拆分链表为两段
        
        图操作
        27. create_graph(graph_id, directed=False, metadata=None) -> None
        
        创建图结构
    
        28. add_node(graph_id, node_id, value, metadata=None) -> None
        
        添加图节点
    
        29. add_edge(graph_id, edge_id, source_id, target_id, weight, metadata=None) -> None
        
        添加带权重的边
        
        30. remove_edge(graph_id, edge_id, metadata=None) -> None
        
        删除边
        
        31. remove_graph_node(graph_id, node_id, metadata=None) -> None
        
        删除图节点
        
        32. contract_edge(graph_id, edge_id, new_node_id, metadata=None) -> None
        
        收缩边
        
        33. highlight_edge(graph_id, edge_id, metadata=None) -> None
        
        高亮边
        
        34. unhighlight_edge(graph_id, edge_id, metadata=None) -> None
        
        取消高亮边
        
        35. highlight_graph_node(graph_id, node_id, metadata=None) -> None
        
        高亮图节点
        
        36. unhighlight_graph_node(graph_id, node_id, metadata=None) -> None
        
        取消高亮图节点
        
        """

    def _indent_code(self, code: str, spaces: int = 4) -> str:
        """
        缩进代码
        
        参数:
            code: 代码字符串
            spaces: 缩进空格数
            
        返回:
            缩进后的代码
        """
        indent = ' ' * spaces
        lines = code.split('\n')
        return '\n'.join(indent + line for line in lines)

    def _create_code_converter(self):
        """创建代码转换器链"""
        system_message = """
        你是一个专业的代码转换专家，精通多种编程语言。你的任务是将不同语言的代码准确地转换为等效的Python代码。
        
        转换时，请遵循以下原则:
        1. 保持原始算法的逻辑和结构
        2. 使用Pythonic的编码风格和惯用表达
        3. 确保转换后的代码是可执行的
        4. 如果源代码是函数或方法，转换结果也应该是函数或方法
        5. 如果源代码使用特定数据结构，使用Python中最接近的等效结构
        
        请仅返回转换后的Python代码，不要包含解释或注释。
        """

        human_message = """
        请将以下{source_language}代码转换为等效的Python代码:
        
        ```{source_language}
        {code}
        ```
        
        仅返回转换后的Python代码。
        """

        return self.llm_factory.create_chat_prompt_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.2,
            max_tokens=2000
        )

    def _create_visualization_strategy_generator(self):
        """创建可视化策略生成器链"""
        system_message = """
        你是一个算法可视化专家，精通分析代码并为其设计最佳可视化策略。你的任务是分析给定的代码，识别其使用的数据结构和算法模式，并提供简洁而详细的可视化策略建议。
请分析代码并识别以下内容：
1. 主要数据结构类型（数组、链表、树、图等）
2. 算法类型和模式（排序、搜索、动态规划等）
3. 关键操作点和需要可视化的步骤
4. 数据结构的转换和状态变化（特别是从一个状态到另一个状态的变化）

对于可视化策略，请遵循以下原则：
- 每一步操作都应该有明确的目的和解释
- 每次高亮操作后必须配对相应的取消高亮操作
- 当算法涉及数据结构转换时，必须创建新的数据结构实例来展示转换后的状态
- 使用具体的方法名称指定操作（如create_list、create_array、append_node等）
- 为每个操作提供简洁而信息丰富的metadata解释

严格禁止：
- 过度依赖高亮/取消高亮操作
- 提供实际代码示例
- 生成未在OperationQueue中定义的方法
- 省略数据结构的创建和转换步骤

请确保你的可视化策略能完整展示算法的整个执行过程，特别是数据结构的变化和转换，对于结果的展现则要创建新的对应数据结构。
        """

        human_message = """
        请分析以下代码，并提供详细的可视化策略：
        
        ```python
        {code}
        ```
        
        问题描述：{problem_description}

        OperationQueue类的信息：
        {op_queue_info}
        """

        return self.llm_factory.create_chat_prompt_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.3,
            max_tokens=2000
        )

    def _create_code_instrumenter(self):
        """创建代码仪器化链"""
        system_message = """
        你是一个专业的代码仪器化专家，精通Python编程和算法可视化。你的任务是将Python算法代码转换为带有可视化操作的版本。

### 核心要求
1. 保持原始算法的主要逻辑不变
2. 结合问题描述在关键步骤添加可视化操作
3. 使用传入的OperationQueue实例来记录可视化操作，**不要自己定义OperationQueue类**
4. OperationQueue只负责记录可视化操作，不能替代实际的数据结构操作
5. 每当创建或修改数据结构时，必须同步使用OperationQueue记录这些变化

### 多参数支持
1. 检查输入参数的格式，支持单个列表参数和多个命名参数两种情况
2. 对于多参数情况，visualize_algorithm函数应当定义多个参数而非单一input_data参数
3. 例如：对于两个链表相加的问题，应该定义为 def visualize_algorithm(l1, l2) 而非 def visualize_algorithm(input_data)
4. 确保正确处理每个参数，为每个数据结构创建适当的可视化

### 必须遵循的规则
1. **不要定义OperationQueue类**，它已经存在于运行环境中
2. 每次高亮操作(highlight)必须有对应的取消高亮操作(unhighlight)
3. 对于数据结构的转换或结果展示，必须创建单独的数据结构(如"rotatedList")来展示结果
4. 必须保存所有节点/元素的ID以便正确引用
5. 二维数组只支持方阵，对于行长度不等的二维数组，需要使用一维数组进行可视化

### ID管理机制
1. 为每个节点或元素分配一个id属性，并记录在映射表中
2. 每次创建新元素时，保存OperationQueue返回的ID
3. 所有可视化操作必须使用正确的ID而非元素值

### 必须实现的可视化功能
1. 数据结构初始化与创建的可视化
2. 算法执行过程中的每个关键步骤的可视化
3. **结果展示：明确创建新的数据结构展示算法的最终结果**
4. 对于元素的比较、交换、移动等操作添加明确的可视化

### 格式要求
- 函数名必须为 visualize_algorithm，接收必要的参数，返回OperationQueue的实例
- 除OperationQueue外，如有必要可定义算法所需的辅助类(如ListNode、TreeNode等)
- 不包含任何调用示例代码或打印语句
- 不包含任何markdown代码块标记

### 代码质量要求
- 确保生成的代码可以直接执行，不会产生运行时错误
- 添加必要的注释以解释可视化逻辑
- 确保每步操作都有有意义的metadata
        
        
        ### 示例1：二叉树算法可视化
        ```
        class TreeNode:
            def __init__(self, val=0, left=None, right=None):
                self.val = val
                self.left = left
                self.right = right
                self.id = None  # 用于存储节点ID
        
        def visualize_algorithm(input_data):
            queue = OperationQueue()
            # 将输入数据转换为二叉树
            if not input_data:
                return queue
                
            # 创建节点ID映射表
            node_map = {{}}
            
            # 构建树并记录可视化
            root = TreeNode(input_data[0])
            root.id = queue.create_root(root.val, metadata="创建根节点")
            node_map[root] = root.id
            
            # 构建树的其余部分...
            
            # 二叉树遍历示例
            def inorder(node):
                if not node:
                    return
                    
                # 高亮当前节点
                queue.highlight_node(node_map[node], metadata=f"访问节点: {{node.val}}")
                
                # 左子树遍历
                if node.left:
                    queue.highlight_link(node_map[node], node_map[node.left], metadata="遍历左子树")
                    inorder(node.left)
                    
                # 处理当前节点
                queue.unhighlight_node(node_map[node], metadata="处理节点完成")
                
                # 右子树遍历
                if node.right:
                    queue.highlight_link(node_map[node], node_map[node.right], metadata="遍历右子树")
                    inorder(node.right)
            
            inorder(root)
            return queue
        ```
        
        ### 示例2：链表算法可视化 (单参数)
        ```
        class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        self.id = None  # 用于存储节点ID


def visualize_algorithm(input_data, k=2):
    queue = OperationQueue()

    # 创建链表并记录可视化
    if not input_data:
        return queue

    # 节点ID映射表
    node_map = {{}}

    # 创建头节点
    head = ListNode(input_data[0])
    list_name = "linkedList"
    head.id = queue.create_list(head.val, list_name=list_name, metadata="创建链表头节点")
    node_map[head] = head.id

    # 构建链表其余部分
    current = head
    for value in input_data[1:]:
        current.next = ListNode(value)
        current.next.id = queue.append_node(current.next.val, list_name=list_name,
                                            metadata=f"添加节点: {{current.next.val}}")
        node_map[current.next] = current.next.id
        current = current.next

    def rotateRight(head, k):
        if not head or not head.next or k == 0:
            return head

        # 计算链表长度
        length = 1
        current = head
        queue.highlight_node(node_map[current], metadata="开始计算链表长度")

        while current.next:
            queue.highlight_node(node_map[current.next], metadata=f"计数: {{length + 1}}")
            current = current.next
            length += 1

        queue.unhighlight_node(node_map[current], metadata=f"链表长度为: {{length}}")

        # 计算实际旋转次数
        k = k % length
        queue.highlight_node(node_map[head], metadata=f"计算实际旋转次数: {{k}} = {{k}} % {{length}}")

        if k == 0:
            return head

        # 创建新的旋转后链表的名称
        rotated_list = "rotatedList"

        # 找到新的头节点和尾节点位置
        steps_to_new_tail = length - k - 1
        queue.highlight_node(node_map[head], metadata=f"定位新尾节点位置: 从头向后走 {{steps_to_new_tail}} 步")

        # 找到新的尾节点
        new_tail = head
        for i in range(steps_to_new_tail):
            queue.highlight_node(node_map[new_tail.next], metadata=f"向后移动 {{i + 1}}/{{steps_to_new_tail}} 步")
            new_tail = new_tail.next
            if i > 0:  # 保持前一个节点的高亮一会儿
                queue.unhighlight_node(node_map[new_tail.next])

        # 标记新的头节点
        new_head = new_tail.next
        queue.highlight_node(node_map[new_head], metadata="找到新的头节点")

        # 创建一个新链表来展示旋转结果
        # 首先复制新头节点作为旋转后链表的起点
        new_head_id = queue.create_list(new_head.val, list_name=rotated_list, metadata="开始构建旋转后的链表")

        # 复制从新头节点到原链表末尾的节点
        temp = new_head.next
        prev_id = new_head_id
        while temp:
            node_id = queue.append_node(temp.val, list_name=rotated_list,
                                        metadata=f"添加旋转后的节点: {{temp.val}}")
            queue.highlight_link(prev_id, node_id, metadata="连接到旋转后的链表")
            prev_id = node_id
            temp = temp.next

        # 复制从原链表头到新尾节点的节点
        temp = head
        while temp != new_tail.next:
            node_id = queue.append_node(temp.val, list_name=rotated_list,
                                        metadata=f"添加原链表前段节点: {{temp.val}}")
            queue.highlight_link(prev_id, node_id, metadata="连接到旋转后的链表")
            prev_id = node_id
            temp = temp.next

        # 在原链表上展示断开和连接的操作
        queue.highlight_link(node_map[current], node_map[head], metadata="在原链表中: 将尾节点连接到头节点")
        queue.highlight_link(node_map[new_tail], node_map[new_head],
                             metadata="在原链表中: 断开新尾节点和新头节点之间的连接")

        return new_head

    # 执行链表旋转
    rotated_head = rotateRight(head, k)

    # 标记原始链表和旋转后的链表
    queue.highlight_node(node_map[head], metadata="原始链表的头节点")
    queue.highlight_node(node_map[rotated_head], metadata="旋转后的链表头节点")

    return queue

        ```
        
        ### 示例3：图算法可视化  - 不要重新定义OperationQueue类（非常重要）
        ```
def visualize_algorithm(input_data):
    queue = OperationQueue() #不要重新定义OperationQueue类（非常重要）
    
    
    # 注意下面的create_graph add_node add_edge方法是OperationQueue类的方法 你不用重新定义OperationQueue类，这个类已经人工实现不用你定义直接用里面的方法就行（非常重要） 你的代码开头必须包含类似的代码块，且必须使用这3个OperationQueue类的方法
    # 创建图的元数据
    graph_id = "main_graph"
    directed = False
    
    # 创建图结构
    queue.create_graph(graph_id, directed, metadata="创建无向图")
    
    # 节点ID映射表（存储节点值到ID的映射）
    node_map = {{}}
    
    # 添加节点（假设输入数据格式为：[节点值列表，边列表]）
    nodes, edges = input_data
    
    # 创建所有节点
    for value in nodes:
        node_id = queue.add_node(
            graph_id=graph_id,
            node_id=f"node{{(value}}",
            value=value,
            metadata=f"添加节点{{value}}"
        )
        node_map[value] = node_id
    
    # 添加所有边
    for edge in edges:
        src_val, dest_val = edge
        edge_id = f"edge_{{src_val}}-{{dest_val}}"
        queue.add_edge(
            graph_id=graph_id,
            edge_id=edge_id,
            source_id=node_map[src_val],
            target_id=node_map[dest_val],
            weight=1,
            metadata=f"添加边 {{src_val}}-{{dest_val}}"
        )
    
    # BFS算法可视化（假设起点是第一个节点）
    start_value = nodes[0]
    visited = set()
    bfs_queue = [start_value]
    
    queue.highlight_graph_node(
        graph_id=graph_id,
        node_id=node_map[start_value],
        metadata=f"BFS起点：{{start_value}}"
    )
    
    while bfs_queue:
        current_val = bfs_queue.pop(0)
        current_id = node_map[current_val]
        
        # 标记当前节点为已访问
        visited.add(current_val)
        
        # 获取相邻节点（根据边数据）
        neighbors = []
        for edge in edges:
            if edge[0] == current_val:
                neighbors.append(edge[1])
            elif not directed and edge[1] == current_val:
                neighbors.append(edge[0])
        
        # 处理相邻节点
        for neighbor in neighbors:
            neighbor_id = node_map[neighbor]
            
            # 高亮边
            edge_id = f"edge_{{min(current_val,neighbor)}}-{{max(current_val,neighbor)}}"
            queue.highlight_edge(
                graph_id=graph_id,
                edge_id=edge_id,
                metadata=f"探索边 {{current_val}}-{{neighbor}}"
            )
            
            if neighbor not in visited and neighbor not in bfs_queue:
                # 高亮新发现的节点
                queue.highlight_graph_node(
                    graph_id=graph_id,
                    node_id=neighbor_id,
                    metadata=f"发现新节点：{{neighbor}}"
                )
                bfs_queue.append(neighbor)
        
        # 取消高亮当前节点
        queue.unhighlight_graph_node(
            graph_id=graph_id,
            node_id=current_id,
            metadata=f"完成处理节点：{{current_val}}"
        )
    
    return queue
        ```
        
        """

        human_message = """
        请将以下Python代码转换为使用OperationQueue生成可视化操作的版本:
        
        ```python
        {code}
        ```
        
        输入参数为: {input_data}
        
        问题描述为: {problem_description}
        
        OperationQueue类的信息:
        {op_queue_info}
        
        请严格按照要求生成visualize_algorithm函数，确保它返回OperationQueue对象。不要包含任何调用示例或打印语句。
        最重要的是，确保正确保存和跟踪所有生成的ID，以便后续操作能够正确引用。
        
        特别注意：
        1. 如果输入参数是字典形式，表示多个参数，函数定义应相应处理多参数
        2. 对于多参数情况，visualize_algorithm应当接受多个命名参数而非单个列表
        """

        return self.llm_factory.create_chat_prompt_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.8,  # 降低temperature以获得更确定的输出
            max_tokens=4000
        )

    def _repair_code_with_llm(self, original_code: str, error_message: str, input_params: Union[List[Any], Dict[str, Any]]) -> Optional[str]:
        """
        使用LLM修复代码
        
        参数:
            original_code: 原始仪器化代码
            error_message: 错误信息
            input_params: 输入参数
            
        返回:
            修复后的代码，如果修复失败则返回None
        """
        try:
            # 构建案例提示部分
            case_prompt = "历史成功修复案例：\n"
            for i, case in enumerate(self.repair_cases[-3:], 1):  # 显示最近3个案例
                case_prompt += f"""
            案例{i}:
            错误类型: {case['error'].split(':')[0]}
            参数示例: {str(case['params'])[:50]}
            修复关键点: {self._analyze_fix_diff(case['original'], case['fixed'])}
                    """

            # 构建提示
            system_message = """你是一个专业的Python代码修复专家。你需要修复AlgoViz项目中的仪器化代码错误。
            仪器化代码是指在原始算法代码的基础上添加了可视化操作的代码，用于生成算法可视化的操作队列。
            你需要根据错误信息修复代码，保持原有的算法逻辑不变，只修复导致错误的部分。
            请返回完整的修复后代码，不要包含解释或标记。"""
            
            human_message = f"""我有一段仪器化代码执行时出错了，错误信息如下：
            
            {error_message}
            
            原始代码：
            ```python
            {original_code}
            ```
            
            输入参数：{input_params}
            
            请修复这段代码，使其能够正常执行。只返回完整的修复后代码，不要包含任何解释或标记。"""
            
            # 创建LLM链
            repair_chain = self.llm_factory.create_chat_prompt_chain(
                system_message= system_message,#case_prompt + system_message
                human_message_template=human_message,
                model_name="gpt-4o",
                temperature=0.2,
                max_tokens=4000
            )
            
            # 执行LLM链
            fixed_code = repair_chain.invoke({})
            
            # 提取代码块（如果存在）
            code_match = re.search(r'```python\n([\s\S]*?)\n```', fixed_code)
            if code_match:
                self._add_repair_case(
                    error_message=error_message,
                    original_code=original_code,
                    input_params=input_params,
                    fixed_code=fixed_code
                )
                return code_match.group(1).strip()

            return fixed_code.strip()
            
        except Exception as e:
            print(f"使用LLM修复代码时出错: {e}")
            return None


        """
        代码自动修复工具类
        """
        def _add_repair_case(self, error_message: str, original_code: str, input_params: Any, fixed_code: str):
            """存储成功修复案例"""
            case = {
                'error': error_message,
                'original': original_code,
                'params': input_params,
                'fixed': fixed_code
            }
            self.repair_cases.append(case)

            # 保持队列长度
            if len(self.repair_cases) > self.max_case_count:
                self.repair_cases.pop(0)

        def _analyze_fix_diff(self, original: str, fixed: str) -> str:
            """分析代码差异生成自然语言描述"""
            diff = difflib.ndiff(original.splitlines(), fixed.splitlines())
            changes = [line for line in diff if line.startswith(('+ ', '- '))]

            analysis = []
            for change in changes[-3:]:  # 取关键修改
                if change.startswith('+ '):
                    analysis.append(f"添加代码: {change[2:]}")
                elif change.startswith('- '):
                    analysis.append(f"移除代码: {change[2:]}")

            return '；'.join(analysis) if analysis else "代码逻辑调整"

        def _find_similar_cases(self, current_error: str, params: Any) -> List:
            """根据当前错误类型查找相似案例"""
            error_type = current_error.split(':')[0].strip()
            return [case for case in self.repair_cases
                    if error_type in case['error']
                    and str(params) == str(case['params'])]