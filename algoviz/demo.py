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

def process_multi_param_example():
    """处理多参数示例，如两个链表相加的情况"""
    # 初始化模块
    analyzer = CodeAnalyzer()
    
    # 两数相加算法代码
    code = """
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1, l2):
    dummy_head = ListNode(0)
    current = dummy_head
    carry = 0
    
    while l1 or l2:
        x = l1.val if l1 else 0
        y = l2.val if l2 else 0
        sum_val = x + y + carry
        
        carry = sum_val // 10
        current.next = ListNode(sum_val % 10)
        current = current.next
        
        if l1:
            l1 = l1.next
        if l2:
            l2 = l2.next
    
    if carry > 0:
        current.next = ListNode(carry)
    
    return dummy_head.next
    """
    
    # 创建两个链表的测试数据
    l1_values = [2, 4, 3]  # 代表数字 342
    l2_values = [5, 6, 4]  # 代表数字 465
    
    # 创建多参数字典
    input_params = {
        "l1": l1_values,
        "l2": l2_values
    }
    
    problem_description = "给你两个非空的链表，表示两个非负的整数。它们每位数字都是按照逆序的方式存储的，并且每个节点只能存储一位数字。请你将两个数相加，并以相同形式返回一个表示和的链表。"
    
    print("正在处理多参数示例：两数相加算法...")
    print(f"参数1 (l1): {l1_values}")
    print(f"参数2 (l2): {l2_values}")
    
    # 分析代码并生成操作队列
    queue = analyzer.analyze(
        code,
        "python",
        problem_description,
        input_params
    )
    
    # 将操作队列写入JS文件
    operations_file = "../operations/multiParamOperations.js"
    os.makedirs(os.path.dirname(operations_file), exist_ok=True)
    with open(operations_file, 'w', encoding='utf-8') as f:
        f.write(f"const defaultOperations = {json.dumps(queue.get_queue(), indent=2, ensure_ascii=False)};")
    
    print("多参数示例处理完成，操作队列已写入文件")

if __name__ == "__main__":
    # 使用标准示例
    user_query = """
    给你一个由 n 个整数组成的数组 nums ，和一个目标值 target 。请你找出并返回满足下述全部条件且不重复的四元组 [nums[a], nums[b], nums[c], nums[d]] （若两个四元组元素一一对应，则认为两个四元组重复）：

0 <= a, b, c, d < n
a、b、c 和 d 互不相同
nums[a] + nums[b] + nums[c] + nums[d] == target
你可以按 任意顺序 返回答案 。
    """
    
    process_query(user_query)
    
    # 使用多参数示例
    # process_multi_param_example()