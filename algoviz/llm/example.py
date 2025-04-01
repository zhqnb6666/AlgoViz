"""
LLM工厂类使用示例
"""

from algoviz.llm.llm_factory import LLMFactory


def simple_prompt_example():
    """简单提示模板示例"""
    # 初始化LLM工厂
    factory = LLMFactory()
    
    # 创建简单提示链
    template = """
    你是一个算法可视化助手。请解释下面的算法：
    
    算法: {algorithm}
    
    请提供算法的简单解释，最好包含一个例子：
    """
    
    chain = factory.create_simple_prompt_chain(
        template=template,
        temperature=0.3,  # 降低随机性
        max_tokens=500
    )
    
    # 运行链并获取结果
    response = chain.invoke({"algorithm": "快速排序"})
    print("简单提示模板示例结果:")
    print(response)
    print("\n" + "-"*50 + "\n")


def chat_prompt_example():
    """聊天提示模板示例"""
    # 初始化LLM工厂
    factory = LLMFactory()
    
    # 系统消息
    system_message = """
    你是一个算法专家助手，专门帮助用户理解和实现各种算法。
    提供清晰简洁的解释，并在可能的情况下给出代码示例。
    """
    
    # 用户消息模板
    human_message = """
    我需要理解{algorithm}算法。请解释它的工作原理，时间复杂度，以及适用场景。
    如果可能，请提供一个Python实现示例。
    """
    
    # 创建聊天提示链
    chain = factory.create_chat_prompt_chain(
        system_message=system_message,
        human_message_template=human_message,
        temperature=0.2,  # 降低随机性
        model_name="gpt-4o"  # 明确指定模型
    )
    
    # 运行链并获取结果
    response = chain.invoke({"algorithm": "A*搜索"})
    print("聊天提示模板示例结果:")
    print(response)
    print("\n" + "-"*50 + "\n")


def advanced_chain_example():
    """高级链示例，使用转换函数"""
    # 初始化LLM工厂
    factory = LLMFactory()
    
    # 定义一个转换函数
    def preprocess_input(input_data):
        """预处理输入数据，添加更多上下文"""
        algorithm = input_data["algorithm"]
        return f"{algorithm} - 这是一个用户想要了解的算法。请提供详细且易于理解的解释。"
    
    # 系统消息
    system_message = """
    你是一个专门研究算法的教授，能够用简单的语言解释复杂的算法概念。
    """
    
    # 用户消息模板
    human_message = "{transformed_input}"
    
    # 创建高级链
    chain = factory.create_advanced_chain(
        system_message=system_message,
        human_message_template=human_message,
        transformation_function=preprocess_input,
        temperature=0.1
    )
    
    # 运行链并获取结果
    response = chain.invoke({"algorithm": "动态规划"})
    print("高级链示例结果:")
    print(response)


if __name__ == "__main__":
    print("LLM工厂类使用示例\n")

    try:
        simple_prompt_example()
        chat_prompt_example()
        advanced_chain_example()
    except Exception as e:
        print(f"运行示例时发生错误: {e}") 