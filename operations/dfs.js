const defaultOperations = [
  {
    "operation": "create_graph",
    "data": {
      "id": "main_graph",
      "directed": false
    },
    "metadata": "创建无向图"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_1",
      "value": 1,
      "attributes": {}
    },
    "metadata": "添加节点 1"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_2",
      "value": 2,
      "attributes": {}
    },
    "metadata": "添加节点 2"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_3",
      "value": 3,
      "attributes": {}
    },
    "metadata": "添加节点 3"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_4",
      "value": 4,
      "attributes": {}
    },
    "metadata": "添加节点 4"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_5",
      "value": 5,
      "attributes": {}
    },
    "metadata": "添加节点 5"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_2",
      "source_id": "node_1",
      "target_id": "node_2",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "添加无权重边 1 - 2"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_3",
      "source_id": "node_1",
      "target_id": "node_3",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "添加无权重边 1 - 3"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_2_4",
      "source_id": "node_2",
      "target_id": "node_4",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "添加无权重边 2 - 4"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_3_4",
      "source_id": "node_3",
      "target_id": "node_4",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "添加无权重边 3 - 4"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_4_5",
      "source_id": "node_4",
      "target_id": "node_5",
      "weight": 0,
      "attributes": {}
    },
    "metadata": "添加无权重边 4 - 5"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_1"
    },
    "metadata": "开始DFS遍历，起点为 1"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_1"
    },
    "metadata": "访问节点 1"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1
      ],
      "id": "visitedNodes"
    },
    "metadata": "更新已访问节点集合"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1
      ],
      "id": "traversalOrder"
    },
    "metadata": "更新遍历顺序"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_2"
    },
    "metadata": "遍历边 1 -> 2"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_2"
    },
    "metadata": "访问节点 2"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2
      ],
      "id": "visitedNodes"
    },
    "metadata": "更新已访问节点集合"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2
      ],
      "id": "traversalOrder"
    },
    "metadata": "更新遍历顺序"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_2"
    },
    "metadata": "遍历边 2 -> 1"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_2"
    },
    "metadata": "返回边 2 -> 1"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_2_4"
    },
    "metadata": "遍历边 2 -> 4"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_4"
    },
    "metadata": "访问节点 4"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2,
        4
      ],
      "id": "visitedNodes"
    },
    "metadata": "更新已访问节点集合"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2,
        4
      ],
      "id": "traversalOrder"
    },
    "metadata": "更新遍历顺序"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_2_4"
    },
    "metadata": "遍历边 4 -> 2"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_2_4"
    },
    "metadata": "返回边 4 -> 2"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_3_4"
    },
    "metadata": "遍历边 4 -> 3"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_3"
    },
    "metadata": "访问节点 3"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2,
        3,
        4
      ],
      "id": "visitedNodes"
    },
    "metadata": "更新已访问节点集合"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2,
        4,
        3
      ],
      "id": "traversalOrder"
    },
    "metadata": "更新遍历顺序"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_3"
    },
    "metadata": "遍历边 3 -> 1"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_3"
    },
    "metadata": "返回边 3 -> 1"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_3_4"
    },
    "metadata": "遍历边 3 -> 4"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_3_4"
    },
    "metadata": "返回边 3 -> 4"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_3"
    },
    "metadata": "完成处理节点 3"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_3_4"
    },
    "metadata": "返回边 4 -> 3"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_4_5"
    },
    "metadata": "遍历边 4 -> 5"
  },
  {
    "operation": "highlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_5"
    },
    "metadata": "访问节点 5"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2,
        3,
        4,
        5
      ],
      "id": "visitedNodes"
    },
    "metadata": "更新已访问节点集合"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2,
        4,
        3,
        5
      ],
      "id": "traversalOrder"
    },
    "metadata": "更新遍历顺序"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_4_5"
    },
    "metadata": "遍历边 5 -> 4"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_4_5"
    },
    "metadata": "返回边 5 -> 4"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_5"
    },
    "metadata": "完成处理节点 5"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_4_5"
    },
    "metadata": "返回边 4 -> 5"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_4"
    },
    "metadata": "完成处理节点 4"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_2_4"
    },
    "metadata": "返回边 2 -> 4"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_2"
    },
    "metadata": "完成处理节点 2"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_2"
    },
    "metadata": "返回边 1 -> 2"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_3"
    },
    "metadata": "遍历边 1 -> 3"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "main_graph",
      "id": "edge_1_3"
    },
    "metadata": "返回边 1 -> 3"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "graph_id": "main_graph",
      "id": "node_1"
    },
    "metadata": "完成处理节点 1"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2,
        4,
        3,
        5
      ],
      "id": "finalTraversalOrder"
    },
    "metadata": "DFS最终遍历顺序"
  }
];