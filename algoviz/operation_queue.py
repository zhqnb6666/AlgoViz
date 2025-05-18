import copy
import json
from typing import List, Dict, Any, Optional, Tuple


class OperationQueue:
    """用于生成算法可视化的操作队列"""
    
    def __init__(self):
        """初始化操作队列"""
        self.queue = []
        self.array_id_counter = 0
        self.node_id_counter = 0
        self.array2d_id_counter = 0
        
    def get_next_array2d_id(self) -> str:
        """获取下一个二维数组ID"""
        array2d_id = f"arr2d{self.array2d_id_counter}"
        self.array2d_id_counter += 1
        return array2d_id

    def create_array2d(self, array: List[List[int]], array_id: Optional[str] = None,
                       metadata: str = "创建二维数组") -> str:
        """创建二维数组操作"""
        if array_id is None:
            array_id = self.get_next_array2d_id()

        self.add_operation(
            operation="create_array2d",
            data={"array": [row.copy() for row in array], "id": array_id},
            metadata=metadata
        )
        return array_id

    def highlight2d(self, positions: List[Tuple[int, int]], array_id: str, color: str = "#FF9999",
                    metadata: Optional[str] = None) -> None:
        """高亮二维数组中的元素

        Args:
            positions: 要高亮的位置列表，每个位置是一个(行,列)元组
            array_id: 数组ID
            color: 高亮颜色
            metadata: 操作描述
        """
        if metadata is None:
            positions_str = ", ".join([f"({row},{col})" for row, col in positions])
            metadata = f"高亮位置{positions_str}的元素"

        # 转换为内部格式
        positions_dict = [{"row": row, "col": col} for row, col in positions]

        self.add_operation(
            operation="highlight2d",
            data={"positions": positions_dict, "id": array_id, "color": color},
            metadata=metadata
        )

    def unhighlight2d(self, positions: List[Tuple[int, int]], array_id: str, metadata: Optional[str] = None) -> None:
        """取消高亮二维数组中的元素

        Args:
            positions: 要取消高亮的位置列表，每个位置是一个(行,列)元组
            array_id: 数组ID
            metadata: 操作描述
        """
        if metadata is None:
            positions_str = ", ".join([f"({row},{col})" for row, col in positions])
            metadata = f"取消高亮位置{positions_str}的元素"

        # 转换为内部格式
        positions_dict = [{"row": row, "col": col} for row, col in positions]

        self.add_operation(
            operation="unhighlight2d",
            data={"positions": positions_dict, "id": array_id},
            metadata=metadata
        )

    def swap_rows2d(self, row1: int, row2: int, array_id: str, metadata: Optional[str] = None) -> None:
        """交换二维数组中的两行"""
        if metadata is None:
            metadata = f"交换第{row1}行和第{row2}行"

        self.add_operation(
            operation="swap_rows2d",
            data={"row1": row1, "row2": row2, "id": array_id},
            metadata=metadata
        )

    def swap_columns2d(self, col1: int, col2: int, array_id: str, metadata: Optional[str] = None) -> None:
        """交换二维数组中的两列"""
        if metadata is None:
            metadata = f"交换第{col1}列和第{col2}列"

        self.add_operation(
            operation="swap_columns2d",
            data={"col1": col1, "col2": col2, "id": array_id},
            metadata=metadata
        )

    def update_element2d(self, row: int, col: int, value: int, array_id: str, metadata: Optional[str] = None) -> None:
        """更新二维数组中的元素值"""
        if metadata is None:
            metadata = f"更新位置({row},{col})的元素值为{value}"

        position = {"row": row, "col": col}

        self.add_operation(
            operation="update_element2d",
            data={"position": position, "value": value, "id": array_id},
            metadata=metadata
        )

    def add_row2d(self, row: List[int], position: int, array_id: str, metadata: Optional[str] = None) -> None:
        """在二维数组中添加一行"""
        if metadata is None:
            metadata = f"在位置{position}添加新行"

        self.add_operation(
            operation="add_row2d",
            data={"row": row.copy(), "position": position, "id": array_id},
            metadata=metadata
        )

    def add_column2d(self, column: List[int], position: int, array_id: str, metadata: Optional[str] = None) -> None:
        """在二维数组中添加一列"""
        if metadata is None:
            metadata = f"在位置{position}添加新列"

        self.add_operation(
            operation="add_column2d",
            data={"column": column.copy(), "position": position, "id": array_id},
            metadata=metadata
        )

    def remove_row2d(self, position: int, array_id: str, metadata: Optional[str] = None) -> None:
        """删除二维数组中的一行"""
        if metadata is None:
            metadata = f"删除第{position}行"

        self.add_operation(
            operation="remove_row2d",
            data={"position": position, "id": array_id},
            metadata=metadata
        )

    def remove_column2d(self, position: int, array_id: str, metadata: Optional[str] = None) -> None:
        """删除二维数组中的一列"""
        if metadata is None:
            metadata = f"删除第{position}列"

        self.add_operation(
            operation="remove_column2d",
            data={"position": position, "id": array_id},
            metadata=metadata
        )
        
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


    def highlight(self, indices: List[int], array_id: str, color: str = "#FF9999",
                  metadata: Optional[str] = None) -> None:
        """高亮元素操作"""
        if metadata is None:
            metadata = f"高亮索引{', '.join(map(str, indices))}的元素"

        self.add_operation(
            operation="highlight",
            data={"indices": indices, "id": array_id, "color": color},
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

    def update_element(self, index: int, value: int, array_id: str, metadata: Optional[str] = None) -> None:
        """更新数组元素操作"""
        if metadata is None:
            metadata = f"更新索引{index}的元素值为{value}"
            
        self.add_operation(
            operation="update_element",
            data={"index": index, "value": value, "id": array_id},
            metadata=metadata
        )
    
    def update_elements(self, updates: List[Dict[str, int]], array_id: str, metadata: Optional[str] = None) -> None:
        """批量更新数组元素操作
        
        Args:
            updates: 更新列表，每个元素是一个字典，包含index和value两个键
            array_id: 数组ID
            metadata: 操作描述
        """
        if metadata is None:
            indices = [update["index"] for update in updates]
            metadata = f"批量更新索引{', '.join(map(str, indices))}的元素"
            
        self.add_operation(
            operation="update_elements",
            data={"updates": updates, "id": array_id},
            metadata=metadata
        )
    
    def update_array(self, array: List[int], array_id: str, metadata: Optional[str] = None) -> None:
        """更新整个数组操作"""
        if metadata is None:
            metadata = f"更新整个数组"
            
        self.add_operation(
            operation="update_array",
            data={"array": array.copy(), "id": array_id},
            metadata=metadata
        )
    
    def insert_element(self, index: int, value: int, array_id: str, metadata: Optional[str] = None) -> None:
        """在数组中插入元素操作"""
        if metadata is None:
            metadata = f"在索引{index}位置插入值{value}"
            
        self.add_operation(
            operation="insert_element",
            data={"index": index, "value": value, "id": array_id},
            metadata=metadata
        )
    
    def remove_element(self, index: int, array_id: str, metadata: Optional[str] = None) -> None:
        """从数组中删除元素操作"""
        if metadata is None:
            metadata = f"删除索引{index}位置的元素"
            
        self.add_operation(
            operation="remove_element",
            data={"index": index, "id": array_id},
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

    #图操作
    def create_graph(self, graph_id: str = "1", directed: bool = False, metadata: Optional[str] = None) -> None:
        """创建图操作"""
        if metadata is None:
            direction = "有向图" if directed else "无向图"
            metadata = f"创建{direction} {graph_id}"

        self.add_operation(
            operation="create_graph",
            data={
                "id": graph_id,
                "directed": directed
            },
            metadata=metadata
        )

    def add_node(self, graph_id: str, node_id: str, value: Any,
                  metadata: Optional[str] = None) -> None:
        """添加图节点操作"""
        if metadata is None:
            metadata = f"在图{graph_id}添加节点{node_id}"

        self.add_operation(
            operation="add_node",
            data={
                "graph_id": graph_id,
                "id": node_id,
                "value": value,
                "attributes": {}

            },
            metadata=metadata
        )

    def remove_graph_node(self, graph_id: str, node_id: str, metadata: Optional[str] = None) -> None:
        """删除图节点操作（重载现有方法）"""
        if metadata is None:
            metadata = f"从图{graph_id}删除节点{node_id}"

        self.add_operation(
            operation="remove_node",
            data={
                "graph_id": graph_id,
                "id": node_id
            },
            metadata=metadata
        )

    def update_node(self, graph_id: str, node_id: str, value: Any,
                    metadata: Optional[str] = None) -> None:
        """更新图节点操作"""
        if metadata is None:
            metadata = f"更新图{graph_id}的节点{node_id}"

        self.add_operation(
            operation="update_node",
            data={
                "graph_id": graph_id,
                "id": node_id,
                "value": value,
                "attributes": {}
            },
            metadata=metadata
        )

    def add_edge(self, graph_id: str, edge_id: str, source_id: str, target_id: str,
                 weight: float, metadata: Optional[str] = None) -> None:
        """添加边操作"""
        if metadata is None:
            metadata = f"在图{graph_id}添加边{source_id}→{target_id}"

        self.add_operation(
            operation="add_edge",
            data={
                "graph_id": graph_id,
                "id": edge_id,
                "source_id": source_id,
                "target_id": target_id,
                "weight": weight,
                "attributes": {}
            },
            metadata=metadata
        )

    def remove_edge(self, graph_id: str, edge_id: str, metadata: Optional[str] = None) -> None:
        """删除边操作"""
        if metadata is None:
            metadata = f"从图{graph_id}删除边{edge_id}"

        self.add_operation(
            operation="remove_edge",
            data={
                "graph_id": graph_id,
                "id": edge_id
            },
            metadata=metadata
        )

    def update_edge(self, graph_id: str, edge_id: str, weight: float,
                    metadata: Optional[str] = None) -> None:
        """更新边操作"""
        if metadata is None:
            metadata = f"更新图{graph_id}的边{edge_id}"

        self.add_operation(
            operation="update_edge",
            data={
                "graph_id": graph_id,
                "id": edge_id,
                "weight": weight,
                "attributes": {}
            },
            metadata=metadata
        )

    def highlight_graph_node(self, graph_id: str, node_id: str, metadata: Optional[str] = None) -> None:
        """高亮图节点操作（重载现有方法）"""
        if metadata is None:
            metadata = f"高亮图{graph_id}的节点{node_id}"

        self.add_operation(
            operation="highlight_graph_node",
            data={
                "graph_id": graph_id,
                "id": node_id
            },
            metadata=metadata
        )

    def unhighlight_graph_node(self, graph_id: str, node_id: str, metadata: Optional[str] = None) -> None:
        """取消高亮图节点操作（重载现有方法）"""
        if metadata is None:
            metadata = f"取消高亮图{graph_id}的节点{node_id}"

        self.add_operation(
            operation="unhighlight_graph_node",
            data={
                "graph_id": graph_id,
                "id": node_id
            },
            metadata=metadata
        )

    def highlight_edge(self, graph_id: str, edge_id: str, metadata: Optional[str] = None) -> None:
        """高亮边操作"""
        if metadata is None:
            metadata = f"高亮图{graph_id}的边{edge_id}"

        self.add_operation(
            operation="highlight_edge",
            data={
                "graph_id": graph_id,
                "id": edge_id
            },
            metadata=metadata
        )

    def unhighlight_edge(self, graph_id: str, edge_id: str, metadata: Optional[str] = None) -> None:
        """取消高亮边操作"""
        if metadata is None:
            metadata = f"取消高亮图{graph_id}的边{edge_id}"

        self.add_operation(
            operation="unhighlight_edge",
            data={
                "graph_id": graph_id,
                "id": edge_id
            },
            metadata=metadata
        )


    def contract_edge(self, graph_id: str, edge_id: str, new_node_id: str,
                      metadata: Optional[str] = None) -> None:
        """收缩边操作"""
        if metadata is None:
            metadata = f"收缩图{graph_id}的边{edge_id}为节点{new_node_id}"

        self.add_operation(
            operation="contract_edge",
            data={
                "graph_id": graph_id,
                "edge_id": edge_id,
                "new_node_id": new_node_id
            },
            metadata=metadata
        )

    # 需要修改现有方法签名以支持重载
    def get_neighbors(self, graph_id: str, node_id: str, metadata: Optional[str] = None) -> None:
        """获取相邻节点操作"""
        if metadata is None:
            metadata = f"获取图{graph_id}中节点{node_id}的邻居"

        self.add_operation(
            operation="get_neighbors",
            data={
                "graph_id": graph_id,
                "node_id": node_id
            },
            metadata=metadata
        )

    # 变量区操作
    def add_variable(self, name: str, value: Any, metadata: Optional[str] = None) -> None:
        """添加变量到变量区"""
        copied_value = copy.deepcopy(value)
        if metadata is None:
            metadata = f"添加变量{name}，值为{copied_value}"
            
        self.add_operation(
            operation="add_variable",
            data={
                "name": name,
                "value": copied_value
            },
            metadata=metadata
        )

    def update_variable(self, name: str, value: Any, metadata: Optional[str] = None) -> None:
        copied_value = copy.deepcopy(value)
        if metadata is None:
            metadata = f"更新变量{name}的值为{copied_value}"

        self.add_operation(
            operation="update_variable",
            data={
                "name": name,
                "value": copied_value
            },
            metadata=metadata
        )
        
    def delete_variable(self, name: str, metadata: Optional[str] = None) -> None:
        """从变量区删除变量"""
        if metadata is None:
            metadata = f"删除变量{name}"
            
        self.add_operation(
            operation="delete_variable",
            data={
                "name": name
            },
            metadata=metadata
        )
