# algoviz/llm/llm_factory.py
"""
LLM Factory Module - 提供LLM模型工厂类，便于获取和使用不同的LLM模型
"""

import os
from typing import Dict, Any, Optional, List, Union, Callable

from langchain_core.prompts import PromptTemplate, ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser, JsonOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableSequence
from langchain_openai import ChatOpenAI

class LLMFactory:
    """
    LLM工厂类 - 用于创建、配置和管理Large Language Models
    支持不同模型的创建和调用，以及prompt工程
    """
    
    def __init__(self, api_key: Optional[str] = None, api_base: Optional[str] = None):
        """
        初始化LLM工厂
        
        参数:
            api_key: API密钥，如不提供则使用内置密钥或环境变量
            api_base: API基础URL，如不提供则使用内置URL或默认值
        """
        self.api_key = api_key or os.getenv("OPENAI_API_KEY") or "sk-8fKgTLvJw5ISuZW9P2DUxAk57vULVSRs0fPbcjFGjw3vsFh0"
        self.api_base = api_base or os.getenv("OPENAI_API_BASE") or "https://xiaoai.plus/v1"
    
    def get_llm(self, 
                model_name: str = "gpt-4o", 
                temperature: float = 0.7,
                max_tokens: int = 1000,
                **kwargs) -> ChatOpenAI:
        """
        获取LLM模型实例
        
        参数:
            model_name: 模型名称
            temperature: 温度参数
            max_tokens: 最大生成令牌数
            **kwargs: 其他模型参数
            
        返回:
            ChatOpenAI实例
        """
        model_kwargs = {
            "model": model_name,
            "temperature": temperature,
            "max_tokens": max_tokens,
            "openai_api_key": self.api_key,
        }

        if self.api_base:
            model_kwargs["openai_api_base"] = self.api_base

        model_kwargs.update(kwargs)
        
        return ChatOpenAI(**model_kwargs)
    
    def create_simple_prompt_chain(self, 
                                  template: str, 
                                  model_name: str = "gpt-4o",
                                  output_parser = None,
                                  **model_kwargs) -> RunnableSequence:
        """
        创建简单的提示模板链
        
        参数:
            template: 提示模板字符串
            model_name: 使用的模型名称
            output_parser: 输出解析器，默认为StrOutputParser
            **model_kwargs: 模型参数
            
        返回:
            RunnableSequence: 可执行的LangChain链
        """
        # 创建提示模板
        prompt = PromptTemplate.from_template(template)
        
        # 获取LLM模型
        llm = self.get_llm(model_name=model_name, **model_kwargs)
        
        # 创建输出解析器
        if output_parser is None:
            output_parser = StrOutputParser()
        
        # 构建并返回链
        return prompt | llm | output_parser
    
    def create_chat_prompt_chain(self,
                               system_message: str,
                               human_message_template: str,
                               model_name: str = "gpt-4o",
                               output_parser = None,
                               **model_kwargs) -> RunnableSequence:
        """
        创建聊天提示模板链
        
        参数:
            system_message: 系统消息
            human_message_template: 人类消息模板
            model_name: 使用的模型名称
            output_parser: 输出解析器，默认为StrOutputParser
            **model_kwargs: 模型参数
            
        返回:
            RunnableSequence: 可执行的LangChain链
        """
        # 创建聊天提示模板
        chat_prompt = ChatPromptTemplate.from_messages([
            ("system", system_message),
            ("human", human_message_template),
        ])
        
        # 获取LLM模型
        llm = self.get_llm(model_name=model_name, **model_kwargs)
        
        # 创建输出解析器
        if output_parser is None:
            output_parser = StrOutputParser()
        
        # 构建并返回链
        return chat_prompt | llm | output_parser
    
    def create_advanced_chain(self,
                            system_message: str,
                            human_message_template: str,
                            model_name: str = "gpt-4o",
                            transformation_function: Optional[Callable] = None,
                            output_parser = None,
                            **model_kwargs) -> RunnableSequence:
        """
        创建高级提示链，支持输入转换
        
        参数:
            system_message: 系统消息
            human_message_template: 人类消息模板
            model_name: 使用的模型名称
            transformation_function: 可选的输入转换函数
            output_parser: 输出解析器，默认为StrOutputParser
            **model_kwargs: 模型参数
            
        返回:
            RunnableSequence: 可执行的LangChain链
        """
        # 创建聊天提示模板
        chat_prompt = ChatPromptTemplate.from_messages([
            ("system", system_message),
            ("human", human_message_template),
        ])
        
        # 获取LLM模型
        llm = self.get_llm(model_name=model_name, **model_kwargs)
        
        # 创建输出解析器
        if output_parser is None:
            output_parser = StrOutputParser()
        
        # 如果提供了转换函数，则添加到链中
        if transformation_function:
            return (
                {"transformed_input": transformation_function, "original_input": RunnablePassthrough()}
                | chat_prompt
                | llm
                | output_parser
            )
        else:
            return chat_prompt | llm | output_parser
    
    def create_json_chain(self,
                        system_message: str,
                        human_message_template: str,
                        model_name: str = "gpt-4o",
                        pydantic_model = None,
                        **model_kwargs) -> RunnableSequence:
        """
        创建返回JSON的提示链
        
        参数:
            system_message: 系统消息
            human_message_template: 人类消息模板
            model_name: 使用的模型名称
            pydantic_model: 可选的Pydantic模型，用于验证JSON
            **model_kwargs: 模型参数
            
        返回:
            RunnableSequence: 可执行的LangChain链
        """
        # 创建聊天提示模板
        chat_prompt = ChatPromptTemplate.from_messages([
            ("system", system_message),
            ("human", human_message_template),
        ])
        
        # 获取LLM模型，设置响应格式为JSON
        if "model_kwargs" not in model_kwargs:
            model_kwargs["model_kwargs"] = {}
        model_kwargs["model_kwargs"]["response_format"] = {"type": "json_object"}
        llm = self.get_llm(model_name=model_name, **model_kwargs)
        
        # 创建JSON输出解析器
        if pydantic_model:
            from langchain.output_parsers import PydanticOutputParser
            output_parser = PydanticOutputParser(pydantic_model=pydantic_model)
        else:
            output_parser = JsonOutputParser()
        
        # 构建并返回链
        return chat_prompt | llm | output_parser