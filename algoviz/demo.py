# algoviz/demo.py
"""
AlgoViz演示模块 - 展示如何使用input_processor和code_analyzer
"""

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
    
    print(f"输入数据: {result['input_data']}")
    
    # 分析代码并生成操作队列
    print("正在分析代码并生成操作队列...")
    queue = analyzer.analyze(
        result['code'],
        result['language'],
        result['input_data']
    )
    
    # 准备算法信息
    if result['intent'] == 'analyze_code':
        algorithm_info = {
            "name": f"{result['language'].capitalize()}代码分析",
            "description": "用户提供的代码分析"
        }
    else:
        algorithm_info = {
            "name": "问题求解",
            "description": result['problem_description']
        }
    
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
    将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。
    """
    
    process_query(user_query)