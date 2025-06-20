# algoviz/demo.py
"""
AlgoViz演示模块 - 展示如何使用input_processor和code_analyzer
"""
import json
import os

from input_processor import InputProcessor
from code_analyzer import CodeAnalyzer

def process_query(user_input: str):

    # 初始化模块
    processor = InputProcessor()
    analyzer = CodeAnalyzer()
    
    print("正在处理用户输入...")
    
    # 处理用户输入
    result = processor.process_input(user_input)
    
    print(f"已检测到意图: {result['intent']}")
    
    if result['intent'] == 'analyze_code':
        print(f"已提取{result['language']}代码，长度: {len(result['code'])}")
    else:
        print("已生成问题解决代码")
        print(result['problem_description'])
    
    # 分析代码并生成操作队列
    print("正在分析代码并生成操作队列...")
    queue = analyzer.analyze(
        result['code'],
        result['language'],
        result['problem_description']
    )
    
    print(result)

    # 生成可视化
    print("正在生成可视化...")
    # 将操作队列写入JS文件
    operations_file = "../operations/defaultOperations.js"
    os.makedirs(os.path.dirname(operations_file), exist_ok=True)
    with open(operations_file, 'w', encoding='utf-8') as f:
        f.write(f"const defaultOperations = {json.dumps(queue.get_queue(), indent=2, ensure_ascii=False)};")
    
    # 将源代码写入codeContent.js文件
    code_content_file = "../js/codeContent.js"
    os.makedirs(os.path.dirname(code_content_file), exist_ok=True)
    with open(code_content_file, 'w', encoding='utf-8') as f:
        source_code = analyzer.get_source_code()
        f.write(f"const codeContent = `{source_code}`;")



if __name__ == "__main__":
    # 使用标准示例
    user_query = """
   演示一下dijikstra算法
    """
    
    process_query(user_query)
