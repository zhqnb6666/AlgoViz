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
    
    # 处理输入数据，支持多参数
    input_params = {}
    if isinstance(result['input_data'], list) and len(result['input_data']) > 0:
        # 如果是单参数情况，保持列表格式
        if 'param_names' not in result or not result['param_names']:
            input_params = result['input_data']
        else:
            # 如果有参数名，转换为字典格式
            param_names = result['param_names']
            if len(param_names) == 1:
                # 单参数且有名称，仍使用列表格式，但同时添加命名版本
                input_params = {param_names[0]: result['input_data']}
            else:
                # 多参数情况，需要拆分输入数据
                # 将输入数据与参数名对应
                if 'param_values' in result and isinstance(result['param_values'], list):
                    # 如果输入处理器已经分好参数值
                    for i, name in enumerate(param_names):
                        if i < len(result['param_values']):
                            input_params[name] = result['param_values'][i]
                else:
                    # 默认情况：尝试平均分配输入数据
                    data_per_param = len(result['input_data']) // len(param_names)
                    for i, name in enumerate(param_names):
                        start = i * data_per_param
                        end = start + data_per_param if i < len(param_names) - 1 else len(result['input_data'])
                        input_params[name] = result['input_data'][start:end]
    
    print(f"处理后的输入参数: {input_params}")
    
    # 分析代码并生成操作队列
    print("正在分析代码并生成操作队列...")
    queue = analyzer.analyze(
        result['code'],
        result['language'],
        result['problem_description'],
        input_params
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
    # 使用标准示例
    user_query = """
    演示一下图的dfs，图的结构要复杂一点

 
    """
    
    process_query(user_query)
