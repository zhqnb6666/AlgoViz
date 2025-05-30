# algoviz/code_analyzer.py
"""
代码分析模块 - 负责分析代码并生成操作队列
"""

import re
import ast
import builtins
import io
import sys
import textwrap
from typing import Dict, List, Any, Optional, Union, Tuple
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
        self.params_generator = self._create_params_generator()
        self.code_fixer = self._create_code_fixer()
        
        # 保存源代码和仪器化代码
        self.source_code = ""
        self.instrumented_code = ""

    def analyze(self, code: str, language: str, problem_description: str) -> OperationQueue:
        """
        分析代码并生成操作队列
        
        参数:
            code: 源代码
            language: 代码语言
            problem_description: 问题描述
            
        返回:
            OperationQueue 实例，包含可视化操作队列
        """
        # 如果不是 Python 代码，先转换为 Python
        if language.lower() != 'python':
            python_code = self._convert_to_python(code, language)
        else:
            python_code = code
            
        # 保存源代码
        self.source_code = python_code

        # 先生成带操作队列的代码
        instrumented_code = self._instrument_code(python_code, problem_description)
        print(instrumented_code.replace("\\n", "\n"))
        
        # 保存仪器化代码
        self.instrumented_code = instrumented_code
        
        # 添加高亮位置信息
        instrumented_code_with_row_positions = self._add_row_position_parameters(python_code, instrumented_code)
        
        # 保存修改后的仪器化代码
        self.instrumented_code = instrumented_code_with_row_positions
        
        # 根据instrumented_code生成参数
        input_params = self._generate_params(instrumented_code_with_row_positions, problem_description)
        print(f"根据代码自动生成的参数: {input_params}")
        
        # 最多尝试3次生成和执行代码
        max_attempts = 1
        attempt_count = 0
        
        while attempt_count < max_attempts:
            # 执行仪器化代码
            queue, success, error_message = self._execute_instrumented_code_with_error_capture(
                instrumented_code_with_row_positions, input_params
            )
            
            if success:
                # 执行成功，返回操作队列
                return queue
            else:
                # 执行失败，重新生成代码
                print(f"代码执行失败（第{attempt_count+1}次）: {error_message}")
                print("正在重新生成代码...")
                
                # 根据不同的尝试次数调整策略
                if attempt_count == 0:
                    # 第一次失败，尝试使用相同参数重新生成
                    instrumented_code = self._instrument_code(python_code, problem_description)
                    instrumented_code_with_row_positions = self._add_row_position_parameters(python_code, instrumented_code)
                else:
                    # 后续失败，尝试生成更简单的代码
                    simplified_problem = f"{problem_description} (简化版，优先保证代码能运行)"
                    instrumented_code = self._instrument_code(python_code, simplified_problem)
                    instrumented_code_with_row_positions = self._add_row_position_parameters(python_code, instrumented_code)
                
                attempt_count += 1
        
        # 达到最大尝试次数，返回空队列
        print(f"达到最大尝试次数({max_attempts})，无法生成可执行的仪器化代码。返回空队列。")
        return OperationQueue()

    def _generate_params(self, code: str, problem_description: str) -> Union[List[Any], Dict[str, Any]]:
        """
        根据代码和问题描述生成合适的参数
        
        参数:
            code: Python 代码（可以是原始代码或仪器化后的代码）
            problem_description: 问题描述
            
        返回:
            生成的输入参数，可以是列表或字典
        """
        # 调用参数生成器LLM
        result = self.params_generator.invoke({
            "code": code,
            "problem_description": problem_description,
            "is_instrumented": "visualize_algorithm" in code
        })
        
        try:
            # 尝试解析返回的JSON
            if isinstance(result, dict) and 'params' in result:
                return result['params']
            elif isinstance(result, dict) and 'input_data' in result:
                return result['input_data']
            
            # 尝试评估字符串表示的参数
            if isinstance(result, str):
                # 查找JSON格式的参数
                json_pattern = r'\{.*\}'
                list_pattern = r'\[.*\]'
                
                json_match = re.search(json_pattern, result, re.DOTALL)
                if json_match:
                    try:
                        import json
                        return json.loads(json_match.group(0))
                    except:
                        pass
                
                list_match = re.search(list_pattern, result, re.DOTALL)
                if list_match:
                    try:
                        return eval(list_match.group(0))
                    except:
                        pass

            # 如果上述方法都失败，返回默认参数
            return [5, 3, 8, 4, 7, 2, 6, 1]
        except Exception as e:
            print(f"参数生成失败: {e}")
            return [5, 3, 8, 4, 7, 2, 6, 1]

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

    def _instrument_code(self, code: str, problem_description: str) -> str:
        """
        生成带操作队列的仪器化代码
        
        参数:
            code: Python 代码
            input_params: 输入参数，可以是列表(向后兼容)或字典(多参数支持)或None(第一次生成仪器化代码时)
            problem_description: 问题描述
        返回:
            仪器化后的代码
        """
        # 为仪器化提供 OperationQueue 的信息
        op_queue_info = self._get_operation_queue_info()


        instrumented_code = self.code_instrumenter.invoke({
            "code": code,
            "op_queue_info": op_queue_info,
            "problem_description": problem_description
        })

        # 提取代码块（如果存在）
        code_match = re.search(r'```python\n([\s\S]*?)\n```', instrumented_code)
        if code_match:
            return code_match.group(1).strip()

        return instrumented_code.strip()

    def _execute_instrumented_code_with_error_capture(
        self, code: str, input_params: Union[List[Any], Dict[str, Any]]
    ) -> Tuple[OperationQueue, bool, Optional[str]]:
        """
        执行仪器化代码并捕获可能的错误
        
        参数:
            code: 仪器化后的 Python 代码
            input_params: 输入参数
            
        返回:
            包含以下内容的元组:
            - 操作队列（如果执行成功）或空队列（如果执行失败）
            - 成功标志（布尔值）
            - 错误信息（字符串，如果有错误）
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
        
        # 捕获标准输出和错误
        stdout_capture = io.StringIO()
        stderr_capture = io.StringIO()
        original_stdout = sys.stdout
        original_stderr = sys.stderr
        
        try:
            # 重定向输出以捕获详细错误信息
            sys.stdout = stdout_capture
            sys.stderr = stderr_capture
            
            # 执行代码
            code = textwrap.dedent(code)
            exec(code, exec_globals)
            
            # 尝试直接调用固定函数名
            if 'visualize_algorithm' in exec_globals and callable(exec_globals['visualize_algorithm']):
                try:
                    if isinstance(input_params, dict):
                        result = exec_globals['visualize_algorithm'](**input_params)
                    else:
                        result = exec_globals['visualize_algorithm'](input_params)

                    if isinstance(result, OperationQueue):
                        return result, True, None
                except Exception as e:
                    error_traceback = traceback.format_exc()
                    return OperationQueue(), False, f"执行visualize_algorithm函数时错误: {str(e)}\n{error_traceback}"

            # 备用方案：查找环境中的所有OperationQueue实例
            for var_name, var_value in exec_globals.items():
                if isinstance(var_value, OperationQueue) and var_name != '_execute_instrumented':
                    return var_value, True, None

            # 没有找到OperationQueue实例
            return OperationQueue(), False, "未找到有效的OperationQueue实例"
            
        except Exception as e:
            error_traceback = traceback.format_exc()
            return OperationQueue(), False, f"代码执行错误: {str(e)}\n{error_traceback}"
        finally:
            # 恢复标准输出和错误
            sys.stdout = original_stdout
            sys.stderr = original_stderr
            
            # 获取捕获的输出（可用于调试）
            stdout_output = stdout_capture.getvalue()
            stderr_output = stderr_capture.getvalue()
            
            if stderr_output:
                print("错误输出:", stderr_output)

    def _fix_code(self, code: str, error_message: str, input_params: Union[List[Any], Dict[str, Any]]) -> str:
        """
        使用LLM修复执行失败的代码
        
        参数:
            code: 需要修复的代码
            error_message: 执行时捕获的错误信息
            input_params: 输入参数
            
        返回:
            修复后的代码
        """
        fixed_code = self.code_fixer.invoke({
            "code": code,
            "error_message": error_message,
            "input_params": str(input_params)
        })
        
        # 提取代码块（如果存在）
        code_match = re.search(r'```python\n([\s\S]*?)\n```', fixed_code)
        if code_match:
            return code_match.group(1).strip()
            
        return fixed_code.strip()
    
    def _create_code_fixer(self):
        """创建代码修复器链"""
        system_message = """
        你是一个专业的代码修复专家，精通Python和算法可视化。你的任务是修复执行失败的仪器化代码。
        
        修复时，请遵循以下原则:
        1. 仔细分析错误信息，找出真正的错误原因
        2. 只修改与错误相关的部分，不要重写整个代码
        3. 保持算法的原始逻辑不变
        4. 确保所有可视化操作的正确性，特别是高亮和取消高亮的配对
        5. 确保修复后的代码能够正确处理提供的输入参数
        6. 代码的返回值必须是OperationQueue对象
        
        常见错误及修复策略:
        1. 未定义变量: 确保在使用前定义所有变量，特别检查循环变量和条件变量
        2. 索引错误: 检查数组访问是否越界，添加合适的边界检查
        3. 类型错误: 检查参数类型是否匹配函数要求，必要时进行类型转换
        4. 高亮/取消高亮不匹配: 确保每次高亮都有对应的取消高亮操作
        5. 参数不匹配: 检查函数调用的参数数量和顺序是否正确
        
        请仅返回修复后的完整代码，不包含解释或注释。
        """
        
        human_message = """
        请修复以下执行失败的代码:
        
        ```python
        {code}
        ```
        
        错误信息:
        {error_message}
        
        输入参数:
        {input_params}
        
        请返回修复后的完整代码。
        """
        
        return self.llm_factory.create_chat_prompt_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.2,
            max_tokens=4000
        )

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
        添加支持JSON序列化的变量到变量区
        
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
        39. create_graph(graph_id = "1", directed=False, metadata=None) -> None
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
3. 使用传入的OperationQueue实例来记录可视化操作，不要自己定义OperationQueue类
4. OperationQueue只负责记录可视化操作，不能替代实际的数据结构操作
5. 每当创建或修改数据结构时，必须同步使用OperationQueue记录这些变化
6. 尽量不要使用OperationQueue返回的值，而是自己保存
7. 你只需要使用queue = OperationQueue()即可，且不需要import OperationQueue
8. 参数值可以是列表、字典或其他基本类型，但不是对象（非常重要，比如你不能假设参数时ListNode对象）


### 变量区操作
重要：只有基本类型或者基本类型的字典、列表等才能算作变量
1. 声明新变量时，必须调用`queue.add_variable(变量名, 变量值)`将变量添加到变量区
2. 变量值更改时，必须调用`queue.update_variable(变量名, 新值)`更新变量区,不能单独更改变量列表或字典中的某个值，只能全部更改
3. 即使在循环中的临时变量（如i, j等迭代变量）也必须在每次循环迭代时更新
4. 当访问数组元素时（如arr[i]），在读取前高亮对应索引，读取后取消高亮



### 参数支持
1. 检查输入参数的格式，支持单个列表参数和多个命名参数两种情况
2. 对于多参数情况，visualize_algorithm函数应当定义多个参数而非单一input_data参数

### 必须遵循的规则
2. 每次高亮操作(highlight)应该有对应的取消高亮操作(unhighlight)，除非是最终结果
3. 没有swap_elements这个方法
4. 必须保存所有节点/元素的ID以便正确引用
5. 二维数组只支持方阵，对于行长度不等的二维数组，需要使用一维数组进行可视化
6. 请不要混淆图和树的创建，二者不能共存，如果需要展示图的最终结果可以通过高亮加入结果的边或节点来实现
7. 请不要混淆create_array和create_array2d，前者用于一维数组，后者用于二维数组
8. 如果使用queue创建了对应的数据结构，则当对应的数据结构变化时，不止要更新变量区，还要使用OperationQueue的方法更新对应的数据结构
9. 一定要确保queue方法中的参数是存在的而不是none

### ID管理机制
1. 为每个节点或元素分配一个id属性，并记录在映射表中
2. 每次创建新元素时，保存OperationQueue返回的ID
3. 所有可视化操作必须使用正确的ID而非元素值

### 格式要求
- 函数名必须为 visualize_algorithm，接收必要的参数，返回OperationQueue的实例
- 除OperationQueue外，如有必要可定义算法所需的辅助类(如ListNode、TreeNode等)
- 不包含任何调用示例代码或打印语句
- 确保每步操作都有有意义的metadata
        
        """
        human_message = """
        请将以下Python代码转换为使用OperationQueue生成可视化操作的版本:
        ```python
        {code}
        ```
    
        问题描述为: {problem_description}
        
        OperationQueue类的信息:
        {op_queue_info}
        
        请严格按照要求生成visualize_algorithm函数，确保它返回OperationQueue对象。不要包含任何调用示例或打印语句。
        最重要的是，确保正确保存和跟踪所有生成的ID，以便后续操作能够正确引用。
        
        特别注意：
        1. 如果输入参数是字典形式，表示多个参数，函数定义应相应处理多参数
        2. 对于多参数情况，visualize_algorithm应当接受多个命名参数而非单个列表
        3. 必须按照要求使用变量区操作，包括添加、更新变量，以及在访问数组元素时进行高亮
        4. 必须要创建对应的数据结构并进行正确的初始化
        """

        return self.llm_factory.create_chat_prompt_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.8,  # 降低temperature以获得更确定的输出
            max_tokens=4000
        )

    def _create_params_generator(self):
        """创建参数生成器链"""
        system_message = """
        你是一个专业的代码参数生成专家，负责为算法代码生成合适的测试数据。
        
        你的任务是分析代码和问题描述，然后生成最合适的测试参数。
        
        生成参数时，请遵循以下原则:
        1. 参数应该符合函数签名和参数类型
        2. 参数应该覆盖代码中的关键路径和边界情况
        3. 参数的大小和复杂度应该适中，便于可视化展示(通常是5-15个元素)
        4. 如果代码需要多个参数，应该为每个参数生成合适的值，并使用适当的参数名
        5. 如果提供的是已经仪器化的代码，请重点关注visualize_algorithm函数的参数

        
        你需要返回一个JSON格式的对象:
        
        如果是单一参数:
        {{
            "input_data": [元素1, 元素2, ...]
        }}
        
        如果是多个参数:
        {{
            "params": {{
                "参数名1": 参数值1,
                "参数名2": 参数值2,
                ...
            }}
        }}
        
        参数值可以是数组、字符串、数字或其他基本类型。
        """
        
        human_message = """
        请分析以下代码和问题描述，生成合适的测试参数:
        
        代码:
        ```python
        {code}
        ```
        
        问题描述:
        {problem_description}
        
        代码是否已仪器化: {is_instrumented}
        
        请返回满足要求的参数。根据算法和数据结构的特点生成能体现算法过程的关键测试数据。
        """
        
        # 不需要另外设置response_format参数，LLM工厂内部已经处理
        return self.llm_factory.create_json_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.4,
            max_tokens=2000
        )

    def _execute_instrumented_code(self, code: str, input_params: Union[List[Any], Dict[str, Any]]) -> OperationQueue:
        """
        执行仪器化代码并获取操作队列
        
        此方法仅用作向后兼容，新代码应使用_execute_instrumented_code_with_error_capture
        
        参数:
            code: 仪器化后的 Python 代码
            input_params: 输入参数，可以是列表(向后兼容)或字典(多参数支持)
            
        返回:
            操作队列
        """
        queue, _, _ = self._execute_instrumented_code_with_error_capture(code, input_params)
        return queue

    def _add_row_position_parameters(self, source_code: str, instrumented_code: str) -> str:
        """
        为仪器化代码中的OperationQueue方法调用添加row_position参数
        
        参数:
            source_code: 原始源代码
            instrumented_code: 仪器化后的代码
            
        返回:
            添加了row_position参数的仪器化代码
        """
        # 将源代码和仪器化代码按行分割
        source_lines = source_code.strip().split('\n')
        instrumented_lines = instrumented_code.strip().split('\n')
        
        # 存储修改后的仪器化代码行
        modified_lines = []
        
        # 预处理：建立关键步骤与对应key_step_line的映射
        key_step_lines_map = {}
        
        # 首先遍历仪器化代码，找出所有关键步骤及其对应的行号
        for i in range(len(instrumented_lines)):
            if re.search(r'queue\.\w+\(', instrumented_lines[i]):
                key_step, key_step_line = self._find_key_step(instrumented_lines, i)
                if key_step and key_step_line is not None:
                    if key_step not in key_step_lines_map:
                        key_step_lines_map[key_step] = []
                    key_step_lines_map[key_step].append(key_step_line)
        
        # 处理多行语句的状态
        in_multiline_call = False
        current_call_lines = []
        current_key_step = None
        current_row_position = None
        
        # 遍历仪器化代码的每一行
        i = 0
        while i < len(instrumented_lines):
            line = instrumented_lines[i]
            
            # 如果正在处理多行调用
            if in_multiline_call:
                current_call_lines.append(line)
                
                # 检查是否是调用结束
                if ')' in line and line.strip().count('(') <= line.strip().count(')'):
                    in_multiline_call = False
                    
                    # 合并多行调用并添加row_position参数
                    full_call = '\n'.join(current_call_lines)
                    if current_row_position is not None:
                        # 在最后一个右括号前添加row_position参数
                        last_paren_index = full_call.rindex(')')
                        modified_call = full_call[:last_paren_index]
                        if not modified_call.rstrip().endswith(','):
                            modified_call += ','
                        modified_call += f' row_position={current_row_position})'
                        
                        # 分割回多行
                        modified_call_lines = modified_call.split('\n')
                        modified_lines.extend(modified_call_lines[:-1])  # 除了最后一行
                        modified_lines.append(modified_call_lines[-1])   # 最后一行（包含row_position参数）
                    else:
                        # 如果没有找到row_position，直接添加原始调用
                        modified_lines.extend(current_call_lines)
                    
                    # 重置多行调用状态
                    current_call_lines = []
                    current_key_step = None
                    current_row_position = None
                else:
                    # 继续处理下一行
                    i += 1
                    continue
            
            # 检查当前行是否是OperationQueue方法调用的开始
            elif re.search(r'queue\.\w+\(', line):
                # 查找关键步骤
                key_step, key_step_line = self._find_key_step(instrumented_lines, i)
                
                if key_step and key_step_line is not None:
                    # 确定当前key_step_line是第几个关键步骤
                    if key_step in key_step_lines_map and key_step_line in key_step_lines_map[key_step]:
                        occurrence_number = key_step_lines_map[key_step].index(key_step_line) + 1
                        
                        # 计算这个关键步骤在源代码中的位置
                        row_position = self._find_row_position_in_source(source_lines, key_step, occurrence_number)
                        
                        # 检查是否是多行调用
                        if line.count('(') > line.count(')'):
                            in_multiline_call = True
                            current_call_lines = [line]
                            current_key_step = key_step
                            current_row_position = row_position
                            i += 1
                            continue
                        
                        # 如果找到了位置，添加row_position参数
                        elif row_position is not None:
                            # 检查行尾是否有右括号
                            if line.rstrip().endswith(')'):
                                # 在右括号前添加row_position参数
                                line = line.rstrip()[:-1]
                                if not line.rstrip().endswith(','):
                                    line += ','
                                line += f' row_position={row_position})'
            
            # 添加当前行到修改后的代码中
            modified_lines.append(line)
            i += 1
        
        # 将修改后的行重新组合为代码字符串
        return '\n'.join(modified_lines)
    
    def _find_key_step(self, code_lines: List[str], queue_call_index: int) -> Tuple[Optional[str], Optional[int]]:
        """
        查找OperationQueue调用对应的关键步骤
        
        参数:
            code_lines: 代码行列表
            queue_call_index: OperationQueue调用所在行的索引
            
        返回:
            (关键步骤代码, 关键步骤所在行索引)，如果没找到则返回(None, None)
        """
        # 先向上查找
        i = queue_call_index - 1
        while i >= 0:
            line = code_lines[i].strip()
            
            # 跳过注释行
            if line.startswith('#'):
                i -= 1
                continue
                
            # 跳过空行
            if not line:
                i -= 1
                continue
                
            # 跳过包含queue的仪器化代码行
            if 'queue.' in line:
                i -= 1
                break
            # 找到了有效的Python代码行
            return line, i
            
        # 如果向上没找到，尝试向下查找
        i = queue_call_index + 1
        while i < len(code_lines):
            line = code_lines[i].strip()
            
            # 跳过注释行
            if line.startswith('#'):
                i += 1
                continue
                
            # 跳过空行
            if not line:
                i += 1
                continue
                
            # 跳过包含queue的仪器化代码行
            if 'queue.' in line:
                i += 1
                continue
                
            # 找到了有效的Python代码行
            return line, i
            
        # 没有找到有效的关键步骤
        return None, None
    
    def _find_row_position_in_source(self, source_lines: List[str], key_step: str, occurrence_number: int) -> Optional[int]:
        """
        在源代码中查找关键步骤对应的行号
        
        参数:
            source_lines: 源代码行列表
            key_step: 关键步骤代码
            occurrence_number: 关键步骤在仪器化代码中的出现次数
            
        返回:
            关键步骤在源代码中的行号（从1开始），如果没找到则返回None
        """
        # 清理关键步骤，去除前后空白
        clean_key_step = key_step.strip()
        
        # 在源代码中直接查找关键步骤
        current_occurrence = 0
        for i, line in enumerate(source_lines):
            clean_line = line.strip()
            
            # 简单判断是否包含关键步骤
            if clean_key_step in clean_line:
                current_occurrence += 1
                
                # 如果是目标出现次数
                if current_occurrence == occurrence_number:
                    return i + 1  # 返回1-indexed行号
        
        # 如果没有找到完全匹配，尝试查找包含关键词的行
        keywords = clean_key_step.split()
        if keywords:
            main_keyword = max(keywords, key=len)  # 取最长的词作为关键词
            if len(main_keyword) > 2:  # 确保关键词足够长
                current_occurrence = 0
                for i, line in enumerate(source_lines):
                    if main_keyword in line:
                        current_occurrence += 1
                        if current_occurrence == occurrence_number:
                            return i + 1
        
        # 没有找到对应的行
        return None

    def get_source_code(self) -> str:
        """
        获取源代码
        
        返回:
            源代码字符串
        """
        return self.source_code
        
    def get_instrumented_code(self) -> str:
        """
        获取仪器化后的代码
        
        返回:
            仪器化后的代码字符串
        """
        return self.instrumented_code
