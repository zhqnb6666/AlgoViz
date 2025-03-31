from typing import List
from operation_queue import OperationQueue

def bubble_sort(arr: List[int]) -> OperationQueue:

    queue = OperationQueue()
    array_id = queue.create_array(arr, metadata="创建待排序数组")
    
    arr_copy = arr.copy()
    n = len(arr_copy)
    
    for i in range(n):
        for j in range(0, n-i-1):
            queue.highlight([j, j+1], array_id, f"比较索引{j}和{j+1}的元素")
            if arr_copy[j] > arr_copy[j+1]:
                queue.swap_elements([j, j+1], array_id, f"交换索引{j}和{j+1}的元素")
                arr_copy[j], arr_copy[j+1] = arr_copy[j+1], arr_copy[j]
            queue.unhighlight([j, j+1], array_id)
    
    return queue

def selection_sort(arr: List[int]) -> OperationQueue:

    queue = OperationQueue()
    array_id = queue.create_array(arr, metadata="创建待排序数组")
    
    arr_copy = arr.copy()
    n = len(arr_copy)
    
    for i in range(n):
        min_idx = i
        queue.highlight([i], array_id, f"查找索引{i}之后的最小元素")
        
        for j in range(i+1, n):
            queue.highlight([j], array_id, f"检查索引{j}的元素")
            
            if arr_copy[j] < arr_copy[min_idx]:
                queue.unhighlight([min_idx], array_id)
                min_idx = j
                queue.highlight([min_idx], array_id, f"找到新的最小元素在索引{min_idx}")
            else:
                queue.unhighlight([j], array_id)
        
        if min_idx != i:
            queue.swap_elements([i, min_idx], array_id, f"交换索引{i}和{min_idx}的元素")
            arr_copy[i], arr_copy[min_idx] = arr_copy[min_idx], arr_copy[i]
        
        queue.unhighlight([i, min_idx], array_id)
    
    return queue

def insertion_sort(arr: List[int]) -> OperationQueue:
    """
    生成插入排序的操作队列
    
    参数:
        arr: 要排序的数组
        
    返回:
        操作队列
    """
    queue = OperationQueue()
    array_id = queue.create_array(arr, metadata="创建待排序数组")
    
    arr_copy = arr.copy()  # 创建副本以便跟踪
    n = len(arr_copy)
    
    # 第一个元素已经是有序的
    queue.highlight([0], array_id, "第一个元素已有序")
    queue.unhighlight([0], array_id)
    
    # 对数组剩余部分进行插入排序
    for i in range(1, n):
        # 高亮当前要插入的元素
        queue.highlight([i], array_id, f"准备插入第{i}个元素：{arr_copy[i]}")
        
        # 当前元素的值
        key = arr_copy[i]
        # 前一个位置的索引
        j = i - 1
        
        # 将当前元素插入到已排序序列的合适位置
        while j >= 0 and arr_copy[j] > key:
            # 高亮比较元素
            queue.highlight([j], array_id, f"比较{arr_copy[j]} > {key}")
            
            # 元素后移
            queue.swap_elements([j, j+1], array_id, f"将元素{arr_copy[j]}后移一位")
            arr_copy[j+1] = arr_copy[j]
            
            # 取消高亮
            queue.unhighlight([j], array_id)
            
            j -= 1
        
        # 插入元素
        if j + 1 != i:  # 只有实际发生了移动才更新
            arr_copy[j+1] = key
            queue.highlight([j+1], array_id, f"将{key}插入到位置{j+1}")
        
        # 取消高亮
        queue.unhighlight([i], array_id)
        if j + 1 != i:
            queue.unhighlight([j+1], array_id)
            
        # 显示当前已排序部分
        indices = list(range(i+1))
        queue.highlight(indices, array_id, f"前{i+1}个元素已排序")
        queue.unhighlight(indices, array_id)
    
    return queue

# 算法信息
ALGORITHM_INFO = {
    "bubble_sort": {
        "name": "冒泡排序",
        "description": "冒泡排序是一种简单的排序算法。它重复地遍历要排序的序列，一次比较两个元素，如果它们的顺序错误就把它们交换过来。",
        "time_complexity": "平均 O(n²)，最坏 O(n²)，最好 O(n)",
        "space_complexity": "O(1)",
        "stability": "稳定"
    },
    "selection_sort": {
        "name": "选择排序",
        "description": "选择排序是一种简单直观的排序算法。它的工作原理是每次从待排序的数据元素中选出最小（或最大）的一个元素，存放在序列的起始位置，直到全部待排序的数据元素排完。",
        "time_complexity": "O(n²)",
        "space_complexity": "O(1)",
        "stability": "不稳定"
    },
    "insertion_sort": {
        "name": "插入排序",
        "description": "插入排序是一种简单直观的排序算法。它的工作原理是通过构建有序序列，对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。",
        "time_complexity": "平均 O(n²)，最坏 O(n²)，最好 O(n)",
        "space_complexity": "O(1)",
        "stability": "稳定"
    }
} 