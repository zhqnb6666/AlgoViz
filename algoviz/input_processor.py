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
            - problem_description: 问题描述 (仅当 intent 为 'solve_problem' 时)
        """
        result = self.processor_chain.invoke({"input": user_input})
        
        # 设置默认值（如果LLM未提供）
        result.setdefault('intent', 'analyze_code')
        result.setdefault('code', '')
        result.setdefault('language', 'python')
        result.setdefault('problem_description', '')
        
        return result
    
    def _create_processor_chain(self):
        """创建一站式处理链"""
        system_message = """
        你是一个专业的代码分析和生成助手，负责处理用户的输入并提取或生成相关信息。
        
        你的任务是:
        1. 确定用户意图是分析现有代码还是解决问题
        2. 从用户输入中提取代码，或为问题生成代码
        3. 识别代码语言
        4. 从问题描述中提取关键信息作为problem_description
        
        返回一个包含以下字段的JSON对象:
        - intent: 'analyze_code' 或 'solve_problem'
        - code: 提取的或生成的代码
        - language: 代码语言 (如 'python', 'java', 'c++' 等)
        - problem_description: 问题描述
        
        代码生成准则:
        1. 代码应该是完整且可立即运行的
        2. 包含必要的注释来解释算法思路
        3. 代码应该是高效的，关注时间和空间复杂度
        4. 代码结构应便于可视化，考虑以下因素:
           - 使用清晰的变量命名，避免过于复杂的嵌套结构
           - 在关键操作点（比较、交换、选择等）使用独立语句而非复合表达式
           - 对于树、链表等数据结构，使用标准的节点类定义
           - 为递归或复杂过程添加清晰的中间步骤
           - 避免使用难以可视化的Python特性（如列表推导式、一行式条件表达式等）
        """
        
        human_message = """
        请处理以下用户输入，提取或生成所需的代码:
        
        {input}
        """
        
        return self.llm_factory.create_json_chain(
            system_message=system_message,
            human_message_template=human_message,
            temperature=0.4,
            max_tokens=3000
        )