#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
一维数组新操作演示脚本

展示如何使用OperationQueue生成一维数组新操作的示例JSON文件，
用于演示更新元素、批量更新元素、插入元素、删除元素和更新整个数组等操作
"""

from operation_queue import OperationQueue

def main():
    """生成一维数组新操作的演示JSON文件"""
    queue = OperationQueue()
    
    # 创建一个初始数组
    array_id = queue.create_array([3, 8, 2, 7, 1, 5, 9], 
                                metadata="创建一个示例数组")
    
    # 演示1：更新单个元素
    queue.highlight([2], array_id, color="#ffcc00", metadata="高亮索引2的元素")
    queue.update_element(2, 10, array_id, metadata="将索引2的元素值更新为10")
    queue.unhighlight([2], array_id, metadata="取消高亮")
    
    # 演示2：批量更新多个元素
    queue.highlight([0, 3, 5], array_id, color="#66ccff", metadata="高亮将要批量更新的元素")
    updates = [
        {"index": 0, "value": 15},
        {"index": 3, "value": 20},
        {"index": 5, "value": 25}
    ]
    queue.update_elements(updates, array_id, metadata="批量更新多个元素值")
    queue.unhighlight([0, 3, 5], array_id, metadata="取消高亮")
    
    # 演示3：在特定位置插入元素
    queue.highlight([2, 3, 4, 5, 6], array_id, color="#cccccc", metadata="高亮将受插入影响的元素")
    queue.insert_element(2, 42, array_id, metadata="在索引2的位置插入值42")
    queue.unhighlight([2, 3, 4, 5, 6, 7], array_id, metadata="取消高亮")
    
    # 演示4：删除特定元素
    queue.highlight([4], array_id, color="#ff6666", metadata="高亮要删除的元素")
    queue.remove_element(4, array_id, metadata="删除索引4位置的元素")
    
    # 演示5：更新整个数组
    queue.update_array([5, 10, 15, 20, 25, 30, 35, 40], array_id, metadata="更新整个数组为新的数据集")
    
    # 在新数组上演示高亮和交换操作
    queue.highlight([2, 5], array_id, color="#99cc99", metadata="高亮新数组中的元素")
    queue.swap_elements([2, 5], array_id, metadata="交换高亮的元素")
    queue.unhighlight([2, 5], array_id, metadata="取消高亮")
    
    # 保存到文件
    output_file = "array1d_operations_demo.json"
    queue.save_to_file(output_file)
    print(f"已生成演示文件: {output_file}")
    
    # 打印JSON内容
    print("\n生成的JSON内容预览:")
    print(queue.generate_json()[:500] + "...\n")
    print(f"总共生成了 {len(queue.queue)} 个操作步骤")

if __name__ == "__main__":
    main() 