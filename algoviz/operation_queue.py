import json
from typing import List, Dict, Any, Optional

class OperationQueue:
    """用于生成算法可视化的操作队列"""
    
    def __init__(self):
        """初始化操作队列"""
        self.queue = []
        self.array_id_counter = 0
        self.node_id_counter = 0
        
    def get_next_array_id(self) -> str:
        """获取下一个数组ID"""
        array_id = f"arr{self.array_id_counter}"
        self.array_id_counter += 1
        return array_id

    def get_next_node_id(self) -> str:
        """获取下一个节点ID"""
        node_id = f"node{self.node_id_counter}"
        self.node_id_counter += 1
        return node_id

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

    # 树操作相关方法
    def create_root(self, value: Any, node_id: Optional[str] = None, metadata: Optional[str] = None) -> str:
        """创建树的根节点"""
        if node_id is None:
            node_id = self.get_next_node_id()
            
        if metadata is None:
            metadata = f"创建值为{value}的根节点"
            
        self.add_operation(
            operation="create_root",
            data={"value": value, "id": node_id},
            metadata=metadata
        )
        return node_id
        
    def add_child(self, parent_id: str, value: Any, node_id: Optional[str] = None, metadata: Optional[str] = None) -> str:
        """添加子节点"""
        if node_id is None:
            node_id = self.get_next_node_id()
            
        if metadata is None:
            metadata = f"向节点{parent_id}添加值为{value}的子节点"
            
        self.add_operation(
            operation="add_child",
            data={"parent_id": parent_id, "value": value, "id": node_id},
            metadata=metadata
        )
        return node_id
        
    def remove_node(self, node_id: str, metadata: Optional[str] = None) -> None:
        """删除节点及其子树"""
        if metadata is None:
            metadata = f"删除ID为{node_id}的节点及其子树"
            
        self.add_operation(
            operation="remove_node",
            data={"id": node_id},
            metadata=metadata
        )
        
    def highlight_node(self, node_id: str, metadata: Optional[str] = None) -> None:
        """高亮节点"""
        if metadata is None:
            metadata = f"高亮节点{node_id}"
            
        self.add_operation(
            operation="highlight_node",
            data={"id": node_id},
            metadata=metadata
        )
        
    def unhighlight_node(self, node_id: str, metadata: Optional[str] = None) -> None:
        """取消高亮节点"""
        if metadata is None:
            metadata = f"取消高亮节点{node_id}"
            
        self.add_operation(
            operation="unhighlight_node",
            data={"id": node_id},
            metadata=metadata
        )
        
    def update_value(self, node_id: str, value: Any, metadata: Optional[str] = None) -> None:
        """更新节点值"""
        if metadata is None:
            metadata = f"将{node_id}的值更新为{value}"
            
        self.add_operation(
            operation="update_value",
            data={"id": node_id, "value": value},
            metadata=metadata
        )
        
    def highlight_link(self, source_id: str, target_id: str, metadata: Optional[str] = None) -> None:
        """高亮连线"""
        if metadata is None:
            metadata = f"高亮从{source_id}到{target_id}的连线"
            
        self.add_operation(
            operation="highlight_link",
            data={"source_id": source_id, "target_id": target_id},
            metadata=metadata
        )
        
    def unhighlight_link(self, source_id: str, target_id: str, metadata: Optional[str] = None) -> None:
        """取消高亮连线"""
        if metadata is None:
            metadata = f"取消高亮从{source_id}到{target_id}的连线"
            
        self.add_operation(
            operation="unhighlight_link",
            data={"source_id": source_id, "target_id": target_id},
            metadata=metadata
        )
        
    def reparent_node(self, node_id: str, new_parent_id: str, metadata: Optional[str] = None) -> None:
        """重新指定节点的父节点"""
        if metadata is None:
            metadata = f"将{node_id}的父节点重新指定为{new_parent_id}"
            
        self.add_operation(
            operation="reparent_node",
            data={"node_id": node_id, "new_parent_id": new_parent_id},
            metadata=metadata
        )
    
    # 链表操作相关方法
    def create_list(self, value: Any, node_id: Optional[str] = None, list_name: str = "linkedList", clear_visual: bool = False, metadata: Optional[str] = None) -> str:
        """创建链表的头节点"""
        if node_id is None:
            node_id = self.get_next_node_id()
            
        if metadata is None:
            metadata = f"创建值为{value}的链表头节点"
            
        self.add_operation(
            operation="create_list",
            data={
                "value": value, 
                "id": node_id, 
                "list_name": list_name
            },
            metadata=metadata
        )
        return node_id
    
    def append_node(self, value: Any, list_name: str = "linkedList", node_id: Optional[str] = None, metadata: Optional[str] = None) -> str:
        """在链表尾部添加节点"""
        if node_id is None:
            node_id = self.get_next_node_id()
            
        if metadata is None:
            metadata = f"在链表{list_name}尾部添加值为{value}的新节点"
            
        self.add_operation(
            operation="append_node",
            data={
                "value": value, 
                "id": node_id, 
                "list_name": list_name
            },
            metadata=metadata
        )
        return node_id
    
    def prepend_node(self, value: Any, list_name: str = "linkedList", node_id: Optional[str] = None, metadata: Optional[str] = None) -> str:
        """在链表头部添加节点"""
        if node_id is None:
            node_id = self.get_next_node_id()
            
        if metadata is None:
            metadata = f"在链表{list_name}头部添加值为{value}的新节点"
            
        self.add_operation(
            operation="prepend_node",
            data={
                "value": value, 
                "id": node_id, 
                "list_name": list_name
            },
            metadata=metadata
        )
        return node_id
    
    def insert_after(self, target_id: str, value: Any, list_name: str = "linkedList", node_id: Optional[str] = None, metadata: Optional[str] = None) -> str:
        """在指定节点后插入新节点"""
        if node_id is None:
            node_id = self.get_next_node_id()
            
        if metadata is None:
            metadata = f"在节点{target_id}后插入值为{value}的新节点"
            
        self.add_operation(
            operation="insert_after",
            data={
                "target_id": target_id,
                "value": value, 
                "id": node_id, 
                "list_name": list_name
            },
            metadata=metadata
        )
        return node_id
    
    def insert_before(self, target_id: str, value: Any, list_name: str = "linkedList", node_id: Optional[str] = None, metadata: Optional[str] = None) -> str:
        """在指定节点前插入新节点"""
        if node_id is None:
            node_id = self.get_next_node_id()
            
        if metadata is None:
            metadata = f"在节点{target_id}前插入值为{value}的新节点"
            
        self.add_operation(
            operation="insert_before",
            data={
                "target_id": target_id,
                "value": value, 
                "id": node_id, 
                "list_name": list_name
            },
            metadata=metadata
        )
        return node_id
    
    def remove_list_node(self, node_id: str, list_name: str = "linkedList", metadata: Optional[str] = None) -> None:
        """删除链表中的节点"""
        if metadata is None:
            metadata = f"删除ID为{node_id}的节点"
            
        self.add_operation(
            operation="remove_node",
            data={
                "id": node_id,
                "list_name": list_name
            },
            metadata=metadata
        )
    
    def reverse_list(self, list_name: str = "linkedList", metadata: Optional[str] = None) -> None:
        """反转链表"""
        if metadata is None:
            metadata = f"反转链表{list_name}"
            
        self.add_operation(
            operation="reverse_list",
            data={
                "list_name": list_name
            },
            metadata=metadata
        )
    
    def reverse_segment(self, start_id: str, end_id: str, list_name: str = "linkedList", metadata: Optional[str] = None) -> None:
        """反转链表段"""
        if metadata is None:
            metadata = f"反转从{start_id}到{end_id}的链表段"
            
        self.add_operation(
            operation="reverse_segment",
            data={
                "start_id": start_id,
                "end_id": end_id,
                "list_name": list_name
            },
            metadata=metadata
        )
    
    def swap_nodes(self, id1: str, id2: str, metadata: Optional[str] = None) -> None:
        """交换两个节点的值"""
        if metadata is None:
            metadata = f"交换{id1}和{id2}节点的值"
            
        self.add_operation(
            operation="swap_nodes",
            data={
                "id1": id1,
                "id2": id2
            },
            metadata=metadata
        )
    
    def merge_lists(self, list1_name: str, list2_name: str, new_list_id: str = "merged", metadata: Optional[str] = None) -> None:
        """合并两个链表"""
        if metadata is None:
            metadata = f"合并链表{list1_name}和{list2_name}到新链表{new_list_id}"
            
        self.add_operation(
            operation="merge_lists",
            data={
                "list1_name": list1_name,
                "list2_name": list2_name,
                "new_list_id": new_list_id
            },
            metadata=metadata
        )
    
    def split_list(self, list_name: str, split_after_id: str, new_list_id: str = "splitList", metadata: Optional[str] = None) -> None:
        """拆分链表"""
        if metadata is None:
            metadata = f"在节点{split_after_id}之后拆分链表{list_name}"
            
        self.add_operation(
            operation="split_list",
            data={
                "list_name": list_name,
                "split_after_id": split_after_id,
                "new_list_id": new_list_id
            },
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
