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
    
    def analyze(self, code: str, language: str, input_data: List[Any]) -> OperationQueue:
        """
        分析代码并生成操作队列
        
        参数:
            code: 源代码
            language: 代码语言
            input_data: 输入数据
            
        返回:
            OperationQueue 实例，包含可视化操作队列
        """
        # 如果不是 Python 代码，先转换为 Python
        if language.lower() != 'python':
            python_code = self._convert_to_python(code, language)
        else:
            python_code = code
        
        # 生成带操作队列的代码
        instrumented_code = self._instrument_code(python_code, input_data)
        
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
    
    def _instrument_code(self, code: str, input_data: List[Any]) -> str:
        """
        生成带操作队列的仪器化代码
        
        参数:
            code: Python 代码
            input_data: 输入数据
            
        返回:
            仪器化后的代码
        """
        # 为仪器化提供 OperationQueue 的信息
        op_queue_info = self._get_operation_queue_info()
        
        instrumented_code = self.code_instrumenter.invoke({
            "code": code,
            "input_data": str(input_data),
            "op_queue_info": op_queue_info
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
        try:
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
            
        except Exception as e:
            print(f"执行仪器化代码时出错：{str(e)}")
            traceback.print_exc()
            
            # 执行失败，使用备选方法生成队列
            return self._generate_fallback_queue(input_data)
    
    def _generate_fallback_queue(self, input_data: List[Any]) -> OperationQueue:
        """
        生成备选操作队列（简单的可视化）
        
        参数:
            input_data: 输入数据
            
        返回:
            操作队列
        """
        queue = OperationQueue()
        
        # 创建数组
        array_id = queue.create_array(input_data, metadata="输入数据")
        
        # 为每个元素添加简单的高亮/取消高亮操作
        for i in range(len(input_data)):
            queue.highlight([i], array_id, f"查看元素 {input_data[i]}")
            queue.unhighlight([i], array_id)
        
        # 如果有两个或更多元素，添加一个交换操作
        if len(input_data) >= 2:
            queue.highlight([0, 1], array_id, "比较前两个元素")
            if input_data[0] > input_data[1]:
                queue.swap_elements([0, 1], array_id, "交换不按顺序的元素")
            queue.unhighlight([0, 1], array_id)
        
        return queue
    
    def _get_operation_queue_info(self) -> str:
        """
        获取 OperationQueue 类的函数信息
        
        返回:
            OperationQueue 类函数的说明字符串
        """
        return """
        OperationQueue 类提供以下方法：
        
        1. create_array(array, array_id=None, metadata="创建数组") -> str
           - 创建一个新数组并添加到操作队列
           - 参数:
             * array: 数组内容，通常是整数列表
             * array_id: 可选的数组标识符，如果不提供则自动生成
             * metadata: 操作的描述信息
           - 返回: 数组标识符 (array_id)
        
        2. swap_elements(indices, array_id, metadata=None) -> None
           - 交换数组中的两个元素
           - 参数:
             * indices: 两个元素的索引列表，例如 [0, 1]
             * array_id: 数组标识符
             * metadata: 可选的操作描述
        
        3. highlight(indices, array_id, metadata=None) -> None
           - 高亮数组中的元素
           - 参数:
             * indices: 要高亮的元素索引列表，例如 [0, 1, 2]
             * array_id: 数组标识符
             * metadata: 可选的操作描述
        
        4. unhighlight(indices, array_id, metadata=None) -> None
           - 取消高亮数组中的元素
           - 参数:
             * indices: 要取消高亮的元素索引列表
             * array_id: 数组标识符
             * metadata: 可选的操作描述
        
        5. get_queue() -> List
           - 获取完整的操作队列
           
        6. generate_json() -> str
           - 生成JSON格式的操作队列
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
        
        在转换过程中:
        1. 保持原始算法的主要逻辑不变
        2. 在关键步骤（如比较、交换、选择元素等）添加可视化操作
        3. 使用OperationQueue类提供的方法创建可视化操作
        4. 确保为传入的输入数据创建初始数组可视化
        5. 确保算法在执行过程中正确地修改输入数据的副本，而不是原始输入
        
        严格遵循以下格式要求：
        - 你的函数必须命名为 visualize_algorithm
        - 函数参数必须保持为 input_data
        - 不要在函数内部重新定义OperationQueue类
        - 必须返回OperationQueue的实例，不要打印它
        - 不要包含任何调用示例代码
        - 不要包含markdown代码块标记
        
        例如:
        ```
        def visualize_algorithm(input_data):
            queue = OperationQueue()
            # 你的代码...
            return queue
        ```
        """
        
        human_message = """
        请将以下Python代码转换为使用OperationQueue生成可视化操作的版本:
        
        ```python
        {code}
        ```
        
        输入数据为: {input_data}
        
        OperationQueue类的信息:
        {op_queue_info}
        
        请严格按照要求生成visualize_algorithm函数，确保它返回OperationQueue对象。不要包含任何调用示例或打印语句。
        """
        
        return self.llm_factory.create_chat_prompt_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.2,  # 降低temperature以获得更确定的输出
            max_tokens=3000
        )