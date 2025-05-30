const defaultOperations = [
  {
    "operation": "create_graph",
    "data": {
      "id": "graph",
      "directed": false
    },
    "metadata": "创建无向图"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge_0",
      "source_id": "A",
      "target_id": "B",
      "weight": 1,
      "attributes": {}
    },
    "metadata": "添加边 A-B 权重 1"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge_1",
      "source_id": "A",
      "target_id": "C",
      "weight": 4,
      "attributes": {}
    },
    "metadata": "添加边 A-C 权重 4"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge_2",
      "source_id": "B",
      "target_id": "C",
      "weight": 2,
      "attributes": {}
    },
    "metadata": "添加边 B-C 权重 2"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge_3",
      "source_id": "B",
      "target_id": "D",
      "weight": 5,
      "attributes": {}
    },
    "metadata": "添加边 B-D 权重 5"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge_4",
      "source_id": "C",
      "target_id": "D",
      "weight": 1,
      "attributes": {}
    },
    "metadata": "添加边 C-D 权重 1"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge_5",
      "source_id": "D",
      "target_id": "E",
      "weight": 3,
      "attributes": {}
    },
    "metadata": "添加边 D-E 权重 3"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "distances",
      "value": {
        "A": Infinity,
        "B": Infinity,
        "C": Infinity,
        "D": Infinity,
        "E": Infinity
      }
    },
    "metadata": "初始化距离字典",
    "position": 16
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "A": 0,
        "B": Infinity,
        "C": Infinity,
        "D": Infinity,
        "E": Infinity
      }
    },
    "metadata": "设置起始点 A 距离为 0",
    "position": 17
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          0,
          "A"
        ]
      ]
    },
    "metadata": "初始化优先队列",
    "position": 18
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": []
    },
    "metadata": "弹出顶点 A 及其距离 0",
    "position": 21
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "B"
    },
    "metadata": "检查顶点 B",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 1
    },
    "metadata": "计算新距离 1",
    "position": 28
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "A": 0,
        "B": 1,
        "C": Infinity,
        "D": Infinity,
        "E": Infinity
      }
    },
    "metadata": "更新顶点 B 的距离为 1",
    "position": 32
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          1,
          "B"
        ]
      ]
    },
    "metadata": "将顶点 B 及距离 1 加入队列",
    "position": 33
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "B"
    },
    "metadata": "完成顶点 B 检查"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "C"
    },
    "metadata": "检查顶点 C",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 4
    },
    "metadata": "计算新距离 4",
    "position": 28
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "A": 0,
        "B": 1,
        "C": 4,
        "D": Infinity,
        "E": Infinity
      }
    },
    "metadata": "更新顶点 C 的距离为 4",
    "position": 32
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          1,
          "B"
        ],
        [
          4,
          "C"
        ]
      ]
    },
    "metadata": "将顶点 C 及距离 4 加入队列",
    "position": 33
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "C"
    },
    "metadata": "完成顶点 C 检查"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          "C"
        ]
      ]
    },
    "metadata": "弹出顶点 B 及其距离 1",
    "position": 21
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "A"
    },
    "metadata": "检查顶点 A",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 2
    },
    "metadata": "计算新距离 2",
    "position": 28
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "A"
    },
    "metadata": "完成顶点 A 检查"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "C"
    },
    "metadata": "检查顶点 C",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 3
    },
    "metadata": "计算新距离 3",
    "position": 28
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "A": 0,
        "B": 1,
        "C": 3,
        "D": Infinity,
        "E": Infinity
      }
    },
    "metadata": "更新顶点 C 的距离为 3",
    "position": 32
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          3,
          "C"
        ],
        [
          4,
          "C"
        ]
      ]
    },
    "metadata": "将顶点 C 及距离 3 加入队列",
    "position": 33
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "C"
    },
    "metadata": "完成顶点 C 检查"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "D"
    },
    "metadata": "检查顶点 D",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 6
    },
    "metadata": "计算新距离 6",
    "position": 28
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "A": 0,
        "B": 1,
        "C": 3,
        "D": 6,
        "E": Infinity
      }
    },
    "metadata": "更新顶点 D 的距离为 6",
    "position": 32
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          3,
          "C"
        ],
        [
          4,
          "C"
        ],
        [
          6,
          "D"
        ]
      ]
    },
    "metadata": "将顶点 D 及距离 6 加入队列",
    "position": 33
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "D"
    },
    "metadata": "完成顶点 D 检查"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          "C"
        ],
        [
          6,
          "D"
        ]
      ]
    },
    "metadata": "弹出顶点 C 及其距离 3",
    "position": 21
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "A"
    },
    "metadata": "检查顶点 A",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 7
    },
    "metadata": "计算新距离 7",
    "position": 28
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "A"
    },
    "metadata": "完成顶点 A 检查"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "B"
    },
    "metadata": "检查顶点 B",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 5
    },
    "metadata": "计算新距离 5",
    "position": 28
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "B"
    },
    "metadata": "完成顶点 B 检查"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "D"
    },
    "metadata": "检查顶点 D",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 4
    },
    "metadata": "计算新距离 4",
    "position": 28
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "A": 0,
        "B": 1,
        "C": 3,
        "D": 4,
        "E": Infinity
      }
    },
    "metadata": "更新顶点 D 的距离为 4",
    "position": 32
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          "C"
        ],
        [
          6,
          "D"
        ],
        [
          4,
          "D"
        ]
      ]
    },
    "metadata": "将顶点 D 及距离 4 加入队列",
    "position": 33
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "D"
    },
    "metadata": "完成顶点 D 检查"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          "D"
        ],
        [
          6,
          "D"
        ]
      ]
    },
    "metadata": "弹出顶点 C 及其距离 4",
    "position": 21
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          6,
          "D"
        ]
      ]
    },
    "metadata": "弹出顶点 D 及其距离 4",
    "position": 21
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "B"
    },
    "metadata": "检查顶点 B",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 9
    },
    "metadata": "计算新距离 9",
    "position": 28
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "B"
    },
    "metadata": "完成顶点 B 检查"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "C"
    },
    "metadata": "检查顶点 C",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 5
    },
    "metadata": "计算新距离 5",
    "position": 28
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "C"
    },
    "metadata": "完成顶点 C 检查"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "E"
    },
    "metadata": "检查顶点 E",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 7
    },
    "metadata": "计算新距离 7",
    "position": 28
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "A": 0,
        "B": 1,
        "C": 3,
        "D": 4,
        "E": 7
      }
    },
    "metadata": "更新顶点 E 的距离为 7",
    "position": 32
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          6,
          "D"
        ],
        [
          7,
          "E"
        ]
      ]
    },
    "metadata": "将顶点 E 及距离 7 加入队列",
    "position": 33
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "E"
    },
    "metadata": "完成顶点 E 检查"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          7,
          "E"
        ]
      ]
    },
    "metadata": "弹出顶点 D 及其距离 6",
    "position": 21
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": []
    },
    "metadata": "弹出顶点 E 及其距离 7",
    "position": 21
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "D"
    },
    "metadata": "检查顶点 D",
    "position": 27
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distance",
      "value": 10
    },
    "metadata": "计算新距离 10",
    "position": 28
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph",
      "id": "D"
    },
    "metadata": "完成顶点 D 检查"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "result_distances",
      "value": {
        "A": 0,
        "B": 1,
        "C": 3,
        "D": 4,
        "E": 7
      }
    },
    "metadata": "保存最终距离结果"
  }
];