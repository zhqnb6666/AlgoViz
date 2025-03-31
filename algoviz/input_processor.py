# algoviz/input_processor.py
"""
输入处理模块 - 负责解析用户输入，提取或生成代码和输入数据
"""

from typing import Dict, Any, List
from llm.llm_factory import LLMFactory

class InputProcessor:
    """
    输入处理器类 - 负责将用户输入转化为代码和输入数据
    """
    
    def __init__(self):
        """初始化输入处理器"""
        self.llm_factory = LLMFactory()
        
        # 创建一站式处理链
        self.processor_chain = self._create_processor_chain()
    
    def process_input(self, user_input: str) -> Dict[str, Any]:
        """
        处理用户输入，提取或生成代码和输入数据
        
        参数:
            user_input: 用户输入文本
            
        返回:
            包含处理结果的字典:
            - intent: 'analyze_code' 或 'solve_problem'
            - code: 提取的代码或生成的解决方案代码
            - language: 代码语言 (如 'python', 'java', 'c++' 等)
            - input_data: 提取的或生成的输入数据
            - problem_description: 问题描述 (仅当 intent 为 'solve_problem' 时)
        """
        result = self.processor_chain.invoke({"input": user_input})
        
        # 确保输入数据是列表形式
        if not isinstance(result.get('input_data', []), list):
            try:
                # 如果输入数据是字符串表示的列表，尝试转换
                input_data_str = result.get('input_data', '[]')
                result['input_data'] = eval(input_data_str) if isinstance(input_data_str, str) else []
            except:
                # 转换失败则使用默认数据
                result['input_data'] = [5, 3, 8, 4, 7, 2, 6, 1]
        
        # 设置默认值（如果LLM未提供）
        result.setdefault('intent', 'analyze_code')
        result.setdefault('code', '')
        result.setdefault('language', 'python')
        result.setdefault('input_data', [5, 3, 8, 4, 7, 2, 6, 1])
        result.setdefault('problem_description', None)
        
        return result
    
    def _create_processor_chain(self):
        """创建一站式处理链"""
        system_message = """
        你是一个专业的代码分析和生成助手，负责处理用户的输入并提取或生成相关信息。
        
        你的任务是:
        1. 确定用户意图是分析现有代码还是解决问题
        2. 从用户输入中提取代码，或为问题生成代码
        3. 识别代码语言
        4. 从用户输入中提取输入数据，或为代码生成适合的测试数据
        
        返回一个包含以下字段的JSON对象:
        - intent: 'analyze_code' 或 'solve_problem'
        - code: 提取的或生成的代码
        - language: 代码语言 (如 'python', 'java', 'c++' 等)
        - input_data: 提取的或生成的输入数据，应为数组形式，如 [5,3,8,4,2]
        - problem_description: 问题描述 (仅当 intent 为 'solve_problem' 时)
        
        输入数据生成准则:
        1. 数据应该是有代表性的，能测试算法的各种情况
        2. 数据应该简洁，通常为5-10个元素的整数数组
        3. 数据应该包含一些边界情况，但不要过于复杂
        4. 数据应适合可视化展示
        
        代码生成准则:
        1. 代码应该是完整且可立即运行的
        2. 包含必要的注释来解释算法思路
        3. 代码应该是高效的，关注时间和空间复杂度
        """
        
        human_message = """
        请处理以下用户输入，提取或生成所需的代码和数据:
        
        {input}
        """
        
        return self.llm_factory.create_json_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.4,
            max_tokens=2000
        )