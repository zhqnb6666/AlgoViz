const defaultOperations = [
        {"operation": "create_graph", "data": {"id": "graph1", "directed": true}, "metadata": "创建有向图"},
        {
            "operation": "add_node",
            "data": {
                "graph_id": "graph1",
                "id": "node1",
                "value": 10,
                "attributes": {"color": "blue", "position": {"x": 200, "y": 300}}
            },
            "metadata": "添加节点node1"
        },
        {
            "operation": "add_node",
            "data": {
                "graph_id": "graph1",
                "id": "node2",
                "value": 20,
                "attributes": {"color": "green", "position": {"x": 400, "y": 300}}
            },
            "metadata": "添加节点node2"
        },
        {
            "operation": "add_edge",
            "data": {
                "graph_id": "graph1",
                "id": "edge1",
                "source_id": "node1",
                "target_id": "node2",
                "weight": 5,
                "attributes": {"style": "dashed"}
            },
            "metadata": "添加边node1->node2"
        },
        {"operation": "highlight_graph_node", "data": {"graph_id": "graph1", "id": "node1"}, "metadata": "高亮node1"},
        {"operation": "unhighlight_graph_node", "data": {"graph_id": "graph1", "id": "node1"}, "metadata": "取消高亮node1"},
        {"operation": "highlight_edge", "data": {"graph_id": "graph1", "id": "edge1"}, "metadata": "高亮边edge1"},
        {"operation": "unhighlight_edge", "data": {"graph_id": "graph1", "id": "edge1"}, "metadata": "取消高亮边edge1"},
        {
            "operation": "update_node",
            "data": {"graph_id": "graph1", "id": "node1", "value": 15, "attributes": {"color": "red"}},
            "metadata": "更新节点node1"
        },
        {
            "operation": "update_edge",
            "data": {"graph_id": "graph1", "id": "edge1", "weight": 8, "attributes": {"color": "blue"}},
            "metadata": "更新边edge1"
        },
        {"operation": "remove_edge", "data": {"graph_id": "graph1", "id": "edge1"}, "metadata": "删除边edge1"},
        {"operation": "remove_node", "data": {"graph_id": "graph1", "id": "node2"}, "metadata": "删除节点node2"},

        {
            "operation": "add_node",
            "data": {
                "graph_id": "graph1",
                "id": "node2",
                "value": 20,
                "attributes": {"color": "green", "position": {"x": 400, "y": 300}}
            },
            "metadata": "添加节点node2"
        },
        {
            "operation": "add_edge",
            "data": {
                "graph_id": "graph1",
                "id": "edge10",
                "source_id": "node1",
                "target_id": "node2",
                "weight": 5,
                "attributes": {"style": "dashed"}
            },
            "metadata": "添加边node1->node2"
        },


        {
            "operation": "add_node",
            "data": {
                "graph_id": "graph1",
                "id": "node3",
                "value": 10,
                "attributes": {"color": "blue", "position": {"x": 100, "y": 500}}
            },
            "metadata": "添加节点node3"
        },
        {
            "operation": "add_node",
            "data": {
                "graph_id": "graph1",
                "id": "node4",
                "value": 20,
                "attributes": {"color": "green", "position": {"x": 600, "y": 400}}
            },
            "metadata": "添加节点node4"
        },
        {
            "operation": "add_edge",
            "data": {
                "graph_id": "graph1",
                "id": "edge2",
                "source_id": "node3",
                "target_id": "node4",
                "weight": 5,
                "attributes": {"style": "dashed"}
            },
            "metadata": "添加边node3->node4"
        },
        {
            "operation": "add_edge",
            "data": {
                "graph_id": "graph1",
                "id": "edge3",
                "source_id": "node1",
                "target_id": "node3",
                "weight": 5,
                "attributes": {"style": "dashed"}
            },
            "metadata": "添加边node1->node3"
        },
        {
            "operation": "get_neighbors",
            "data": {"graph_id": "graph1", "node_id": "node1"},
            "metadata": "获取节点node1的邻居"
        },
        {
            "operation": "contract_edge",
            "data": {"graph_id": "graph1", "edge_id": "edge10", "new_node_id": "contracted_node"},
            "metadata": "收缩边edge10"
        },
        {
            "operation": "merge_nodes",
            "data": {"graph_id": "graph1", "nodes": ["node3", "node4"], "new_node_id": "merged_node", "value": 25},
            "metadata": "合并节点node3和node4"
        },

    ];