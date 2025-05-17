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
        self.code_instrumenter = self._create_code_instrumenter()

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

        # 执行代码
        exec(code, exec_globals)

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

        3. highlight(indices, array_id, metadata=None) -> None
        高亮数组中的元素

        4. unhighlight(indices, array_id, metadata=None) -> None
        取消高亮数组中的元素

        # 二维数组操作
        5. create_array2d(array, array_id=None, metadata="创建二维数组") -> str
        创建一个新的二维数组
              
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

        # 变量区操作
        16. add_variable(name, value, metadata=None) -> None
        添加变量到变量区
        
        17. update_variable(name, value, metadata=None) -> None
        更新变量区中的变量值
        
        18. delete_variable(name, metadata=None) -> None
        从变量区删除变量

        # 树操作
        19. create_root(value, node_id=None, metadata=None) -> str
        创建树的根节点

        20. add_child(parent_id, value, node_id=None, metadata=None) -> str
        向指定父节点添加子节点
        
        21. remove_node(node_id, metadata=None) -> None
        删除树节点

        22. highlight_node(node_id, metadata=None) -> None
        高亮树节点

        23. unhighlight_node(node_id, metadata=None) -> None
        取消高亮树节点

        24. update_value(node_id, value, metadata=None) -> None
        更新节点的值

        25. highlight_link(source_id, target_id, metadata=None) -> None
        高亮两个节点间的边

        26. unhighlight_link(source_id, target_id, metadata=None) -> None
        取消高亮两个节点间的边

        27. reparent_node(node_id, new_parent_id, metadata=None) -> None
        改变某个节点的父节点

        # 链表操作
        28. create_list(value, node_id=None, list_name , metadata=None) -> str
        创建链表头节点

        返回: 节点 ID

        29. append_node(value, list_name="linkedList", node_id=None, metadata=None) -> str
        在链表尾部添加节点

        30. prepend_node(value, list_name="linkedList", node_id=None, metadata=None) -> str
        在链表头部添加节点

        31. insert_after(target_id, value, list_name="linkedList", node_id=None, metadata=None) -> str
        32. insert_before(target_id, value, list_name="linkedList", node_id=None, metadata=None) -> str
        在指定节点前/后插入节点

        33. remove_list_node(node_id, list_name="linkedList", metadata=None) -> None
        删除链表中的某个节点

        34. reverse_list(list_name="linkedList", metadata=None) -> None
        整体反转链表

        35. reverse_segment(start_id, end_id, list_name="linkedList", metadata=None) -> None
        反转链表中一段区间

        36. swap_nodes(id1, id2, metadata=None) -> None
        交换链表中两个节点的值

        37. merge_lists(list1_name, list2_name, new_list_id="merged", metadata=None) -> None
        合并两个链表为新链表

        38. split_list(list_name, split_after_id, new_list_id="splitList", metadata=None) -> None
        拆分链表为两段
        
        # 图操作
        39. create_graph(graph_id, directed=False, metadata=None) -> None
        创建图结构
    
        40. add_node(graph_id, node_id, value, metadata=None) -> None
        添加图节点
    
        41. add_edge(graph_id, edge_id, source_id, target_id, weight, metadata=None) -> None
        添加带权重的边
        
        42. remove_edge(graph_id, edge_id, metadata=None) -> None
        删除边
        
        43. remove_graph_node(graph_id, node_id, metadata=None) -> None
        删除图节点
        
        44. contract_edge(graph_id, edge_id, new_node_id, metadata=None) -> None
        收缩边
        
        45. highlight_edge(graph_id, edge_id, metadata=None) -> None
        高亮边
        
        46. unhighlight_edge(graph_id, edge_id, metadata=None) -> None
        取消高亮边
        
        47. highlight_graph_node(graph_id, node_id, metadata=None) -> None
        高亮图节点
        
        48. unhighlight_graph_node(graph_id, node_id, metadata=None) -> None
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

### 变量区操作
1. 声明新变量时，必须调用`queue.add_variable(变量名, 变量值)`将变量添加到变量区
2. 变量值更改时，必须调用`queue.update_variable(变量名, 新值)`更新变量区
3. 即使在循环中的临时变量（如i, j等迭代变量）也必须在每次循环迭代时更新
4. 当访问数组元素时（如arr[i]），在读取前高亮对应索引，读取后取消高亮
5. 示例：
   ```python
   # 原代码
   i = 0
   while i < len(arr):
       if arr[i] > max_val:
           max_val = arr[i]
       i += 1
   
   # 仪器化代码
   i = 0
   queue.add_variable("i", i)
   max_val = float('-inf')
   queue.add_variable("max_val", max_val)
   while i < len(arr):
       queue.highlight([i], array_id)
       if arr[i] > max_val:
           max_val = arr[i]
           queue.update_variable("max_val", max_val)
       queue.unhighlight([i], array_id)
       i += 1
       queue.update_variable("i", i)
   ```

### 多参数支持
1. 检查输入参数的格式，支持单个列表参数和多个命名参数两种情况
2. 对于多参数情况，visualize_algorithm函数应当定义多个参数而非单一input_data参数
3. 例如：对于两个链表相加的问题，应该定义为 def visualize_algorithm(l1, l2) 而非 def visualize_algorithm(input_data)
4. 确保正确处理每个参数，为每个数据结构创建适当的可视化

### 必须遵循的规则
1. **不要定义OperationQueue类**，它已经存在于运行环境中
2. 每次高亮操作(highlight)必须有对应的取消高亮操作(unhighlight)
3. 没有swap_elements这个方法
4. 必须保存所有节点/元素的ID以便正确引用
5. 二维数组只支持方阵，对于行长度不等的二维数组，需要使用一维数组进行可视化

### ID管理机制
1. 为每个节点或元素分配一个id属性，并记录在映射表中
2. 每次创建新元素时，保存OperationQueue返回的ID
3. 所有可视化操作必须使用正确的ID而非元素值

### 格式要求
- 函数名必须为 visualize_algorithm，接收必要的参数，返回OperationQueue的实例
- 除OperationQueue外，如有必要可定义算法所需的辅助类(如ListNode、TreeNode等)
- 不包含任何调用示例代码或打印语句
- 不包含任何markdown代码块标记

### 代码质量要求
- 确保生成的代码可以直接执行，不会产生运行时错误
- 添加必要的注释以解释可视化逻辑
- 确保每步操作都有有意义的metadata
        
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
        3. 必须按照要求使用变量区操作，包括添加、更新变量，以及在访问数组元素时进行高亮
        """

        return self.llm_factory.create_chat_prompt_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.8,  # 降低temperature以获得更确定的输出
            max_tokens=4000
        )
