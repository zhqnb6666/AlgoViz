# algoviz/code_analyzer.py
"""
代码分析模块 - 负责分析代码并生成操作队列
"""

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

    def analyze(self, code: str, language: str, problem_description: str, input_data: List[Any]) -> OperationQueue:
        """
        分析代码并生成操作队列
        
        参数:
            code: 源代码
            language: 代码语言
            input_data: 输入数据
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
        instrumented_code = self._instrument_code(python_code, input_data, problem_description)

        # 执行仪器化代码并获取操作队列
        queue = self._execute_instrumented_code(instrumented_code, input_data)

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

    def _instrument_code(self, code: str, input_data: List[Any], problem_description: str) -> str:
        """
        生成带操作队列的仪器化代码
        
        参数:
            code: Python 代码
            input_data: 输入数据
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
            "input_data": str(input_data),
            "op_queue_info": op_queue_info,
            "problem_description": problem_description
            # ,"visualization_strategy": visualization_strategy
        })

        # 提取代码块（如果存在）
        code_match = re.search(r'```python\n([\s\S]*?)\n```', instrumented_code)
        if code_match:
            return code_match.group(1).strip()

        return instrumented_code.strip()

    def _execute_instrumented_code(self, code: str, input_data: List[Any]) -> OperationQueue:
        """
        执行仪器化代码并获取操作队列
        
        参数:
            code: 仪器化后的 Python 代码
            input_data: 输入数据
            
        返回:
            操作队列
        """

        # 准备执行环境
        exec_globals = {
            'OperationQueue': OperationQueue,
            'input_data': input_data,
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

        # 执行代码
        exec(code, exec_globals)

        # 尝试直接调用固定函数名
        if 'visualize_algorithm' in exec_globals and callable(exec_globals['visualize_algorithm']):
            result = exec_globals['visualize_algorithm'](input_data)
            if isinstance(result, OperationQueue):
                return result

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


        1. create_array(array, array_id=None, metadata="创建数组") -> str
        创建一个新数组并添加到操作队列

        2. swap_elements(indices, array_id, metadata=None) -> None
        交换数组中的两个元素

        3. highlight(indices, array_id, metadata=None) -> None
        高亮数组中的元素

        4. unhighlight(indices, array_id, metadata=None) -> None
        取消高亮数组中的元素

        7. create_root(value, node_id=None, metadata=None) -> str
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

### 必须遵循的规则
1. **不要定义OperationQueue类**，它已经存在于运行环境中
2. 每次高亮操作(highlight)必须有对应的取消高亮操作(unhighlight)
3. 对于数据结构的转换或结果展示，必须创建单独的数据结构(如"rotatedList")来展示结果
4. 必须保存所有节点/元素的ID以便正确引用

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
- 函数名必须为 visualize_algorithm，接收input_data作为参数，返回OperationQueue的实例
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
        
        ### 示例2：链表算法可视化
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
    head.id = queue.create_list(head.val, list_name=original_list, metadata="创建链表头节点")
    node_map[head] = head.id

    # 构建链表其余部分
    current = head
    for value in input_data[1:]:
        current.next = ListNode(value)
        current.next.id = queue.append_node(current.next.val, list_name=original_list,
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
        """

        human_message = """
        请将以下Python代码转换为使用OperationQueue生成可视化操作的版本:
        
        ```python
        {code}
        ```
        
        输入数据为: {input_data}
        
        问题描述为: {problem_description}
        
        OperationQueue类的信息:
        {op_queue_info}
        
        请严格按照要求生成visualize_algorithm函数，确保它返回OperationQueue对象。不要包含任何调用示例或打印语句。
        最重要的是，确保正确保存和跟踪所有生成的ID，以便后续操作能够正确引用。
        """

        return self.llm_factory.create_chat_prompt_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.8,  # 降低temperature以获得更确定的输出
            max_tokens=4000
        )
