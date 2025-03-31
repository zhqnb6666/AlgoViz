"""
AlgoViz - 算法可视化工具

这个包提供了一个用于生成算法可视化的工具，可以将算法步骤转换为JSON操作队列，
然后使用D3.js在网页中动态显示算法执行过程。
"""

from .operation_queue import OperationQueue
from .visualization_generator import VisualizationGenerator
from .algorithms import (
    bubble_sort,
    selection_sort,
    insertion_sort,
    ALGORITHM_INFO
)

__version__ = '0.1.0'
__author__ = '您的名字'

__all__ = [
    'OperationQueue',
    'VisualizationGenerator',
    'bubble_sort',
    'selection_sort',
    'insertion_sort',
    'ALGORITHM_INFO'
]
