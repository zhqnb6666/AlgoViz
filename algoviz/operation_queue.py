import json
from typing import List, Dict, Any, Optional

class OperationQueue:
    """用于生成算法可视化的操作队列"""
    
    def __init__(self):
        """初始化操作队列"""
        self.queue = []
        self.array_id_counter = 0
        
    def get_next_array_id(self) -> str:
        """获取下一个数组ID"""
        array_id = f"arr{self.array_id_counter}"
        self.array_id_counter += 1
        return array_id

    def create_array(self, array: List[int], array_id: Optional[str] = None, metadata: str = "创建数组") -> str:
        """创建数组操作"""
        if array_id is None:
            array_id = self.get_next_array_id()
            
        self.add_operation(
            operation="create_array",
            data={"array": array.copy(), "id": array_id},
            metadata=metadata
        )
        return array_id

    def swap_elements(self, indices: List[int], array_id: str, metadata: Optional[str] = None) -> None:
        """交换元素操作"""
        if metadata is None:
            metadata = f"交换索引{indices[0]}和{indices[1]}的元素"
            
        self.add_operation(
            operation="swap_elements",
            data={"indices": indices, "id": array_id},
            metadata=metadata
        )

    def highlight(self, indices: List[int], array_id: str, metadata: Optional[str] = None) -> None:
        """高亮元素操作"""
        if metadata is None:
            metadata = f"高亮索引{', '.join(map(str, indices))}的元素"
            
        self.add_operation(
            operation="highlight",
            data={"indices": indices, "id": array_id},
            metadata=metadata
        )

    def unhighlight(self, indices: List[int], array_id: str, metadata: Optional[str] = None) -> None:
        """取消高亮元素操作"""
        if metadata is None:
            metadata = f"取消高亮索引{', '.join(map(str, indices))}的元素"
            
        self.add_operation(
            operation="unhighlight",
            data={"indices": indices, "id": array_id},
            metadata=metadata
        )

    def add_operation(self, operation: str, data: Dict[str, Any], metadata: Optional[str] = None) -> None:
        """将操作加入队列"""
        op = {"operation": operation, "data": data}
        if metadata:
            op["metadata"] = metadata
        self.queue.append(op)

    def get_queue(self) -> List[Dict[str, Any]]:
        """返回操作队列"""
        return self.queue

    def generate_json(self) -> str:
        """生成JSON格式的操作队列"""
        return json.dumps(self.queue, indent=4, ensure_ascii=False)

    def save_to_file(self, filename: str) -> None:
        """将操作队列保存到文件"""
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(self.generate_json())

    def clear(self) -> None:
        """清空操作队列"""
        self.queue = []
