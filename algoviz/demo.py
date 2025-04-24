# algoviz/demo.py
"""
AlgoViz演示模块 - 展示如何使用input_processor和code_analyzer
"""
import json
import os

from input_processor import InputProcessor
from code_analyzer import CodeAnalyzer
from visualization_generator import VisualizationGenerator

def process_query(user_input: str):
    """
    处理用户查询并生成可视化
    
    参数:
        user_input: 用户输入
        
    返回:
        生成的HTML文件路径
    """
    # 初始化模块
    processor = InputProcessor()
    analyzer = CodeAnalyzer()
    visualizer = VisualizationGenerator(title="算法可视化")
    
    print("正在处理用户输入...")
    
    # 处理用户输入
    result = processor.process_input(user_input)
    
    print(f"已检测到意图: {result['intent']}")
    
    if result['intent'] == 'analyze_code':
        print(f"已提取{result['language']}代码，长度: {len(result['code'])}")
    else:
        print("已生成问题解决代码")
        print(result['problem_description'])
    
    print(f"输入数据: {result['input_data']}")
    
    # 分析代码并生成操作队列
    print("正在分析代码并生成操作队列...")
    queue = analyzer.analyze(
        result['code'],
        result['language'],
        result['problem_description'],
        result['input_data']
    )
    
    print(result)

    # 生成可视化
    print("正在生成可视化...")
    # 将操作队列写入JS文件
    operations_file = "../operations/defaultOperations.js"
    os.makedirs(os.path.dirname(operations_file), exist_ok=True)
    with open(operations_file, 'w', encoding='utf-8') as f:
        f.write(f"const defaultOperations = {json.dumps(queue.get_queue(), indent=2, ensure_ascii=False)};")

if __name__ == "__main__":
    # 示例用法
    user_query = """
实现dfs算法，输入图结构如下：
- 节点：A(0), B(1), C(2), D(3)
- 边：A→B(4), A→C(2), B→D(3), C→B(1), C→D(5)
起点是A，可视化最短路径查找过程

# 对应的输入数据结构为：
input_data = {
    'nodes': [
        {'id': 0, 'value': 'A', 'attributes': {'position': {'x': 200, 'y': 300}}},
        {'id': 1, 'value': 'B', 'attributes': {'position': {'x': 400, 'y': 300}}},
        {'id': 2, 'value': 'C', 'attributes': {'position': {'x': 200, 'y': 500}}},
        {'id': 3, 'value': 'D', 'attributes': {'position': {'x': 400, 'y': 500}}}
    ],
    'edges': [
        {'id': 0, 'from': 0, 'to': 1, 'weight': 4},
        {'id': 1, 'from': 0, 'to': 2, 'weight': 2},
        {'id': 2, 'from': 1, 'to': 3, 'weight': 3},
        {'id': 3, 'from': 2, 'to': 1, 'weight': 1},
        {'id': 4, 'from': 2, 'to': 3, 'weight': 5}
    ],
    'start_node': 0  # 起点节点ID
}
   """
    
process_query(user_query)