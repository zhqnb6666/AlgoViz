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
    给你两个 二维 整数数组 nums1 和 nums2.

nums1[i] = [idi, vali] 表示编号为 idi 的数字对应的值等于 vali 。
nums2[i] = [idi, vali] 表示编号为 idi 的数字对应的值等于 vali 。
每个数组都包含 互不相同 的 id ，并按 id 以 递增 顺序排列。

请你将两个数组合并为一个按 id 以递增顺序排列的数组，并符合下述条件：

只有在两个数组中至少出现过一次的 id 才能包含在结果数组内。
每个 id 在结果数组中 只能出现一次 ，并且其对应的值等于两个数组中该 id 所对应的值求和。如果某个数组中不存在该 id ，则假定其对应的值等于 0 。
返回结果数组。返回的数组需要按 id 以递增顺序排列。
示例 1：

输入：nums1 = [[1,2],[2,3],[4,5]], nums2 = [[1,4],[3,2],[4,1]]
输出：[[1,6],[2,3],[3,2],[4,6]]
解释：结果数组中包含以下元素：
- id = 1 ，对应的值等于 2 + 4 = 6 。
- id = 2 ，对应的值等于 3 。
- id = 3 ，对应的值等于 2 。
- id = 4 ，对应的值等于5 + 1 = 6 。
    """
    
    process_query(user_query)