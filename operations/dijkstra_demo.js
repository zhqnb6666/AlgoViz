const defaultOperations = [
  {
    "operation": "create_graph",
    "data": {
      "id": "1",
      "directed": true
    },
    "metadata": "创建有向图"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "1",
      "id": "A",
      "value": "A",
      "attributes": {}
    },
    "metadata": "添加节点 A"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "1",
      "id": "B",
      "value": "B",
      "attributes": {}
    },
    "metadata": "添加节点 B"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "1",
      "id": "C",
      "value": "C",
      "attributes": {}
    },
    "metadata": "添加节点 C"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "1",
      "id": "D",
      "value": "D",
      "attributes": {}
    },
    "metadata": "添加节点 D"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "1",
      "id": "E",
      "value": "E",
      "attributes": {}
    },
    "metadata": "添加节点 E"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "1",
      "id": "F",
      "value": "F",
      "attributes": {}
    },
    "metadata": "添加节点 F"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "1",
      "id": "G",
      "value": "G",
      "attributes": {}
    },
    "metadata": "添加节点 G"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "A->B",
      "source_id": "A",
      "target_id": "B",
      "weight": 4,
      "attributes": {}
    },
    "metadata": "添加边 A->B 权重 4"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "A->C",
      "source_id": "A",
      "target_id": "C",
      "weight": 2,
      "attributes": {}
    },
    "metadata": "添加边 A->C 权重 2"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "B->C",
      "source_id": "B",
      "target_id": "C",
      "weight": 5,
      "attributes": {}
    },
    "metadata": "添加边 B->C 权重 5"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "B->D",
      "source_id": "B",
      "target_id": "D",
      "weight": 10,
      "attributes": {}
    },
    "metadata": "添加边 B->D 权重 10"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "C->E",
      "source_id": "C",
      "target_id": "E",
      "weight": 3,
      "attributes": {}
    },
    "metadata": "添加边 C->E 权重 3"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "E->D",
      "source_id": "E",
      "target_id": "D",
      "weight": 4,
      "attributes": {}
    },
    "metadata": "添加边 E->D 权重 4"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "E->F",
      "source_id": "E",
      "target_id": "F",
      "weight": 6,
      "attributes": {}
    },
    "metadata": "添加边 E->F 权重 6"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "D->F",
      "source_id": "D",
      "target_id": "F",
      "weight": 1,
      "attributes": {}
    },
    "metadata": "添加边 D->F 权重 1"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "F->G",
      "source_id": "F",
      "target_id": "G",
      "weight": 2,
      "attributes": {}
    },
    "metadata": "添加边 F->G 权重 2"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "C->G",
      "source_id": "C",
      "target_id": "G",
      "weight": 8,
      "attributes": {}
    },
    "metadata": "添加边 C->G 权重 8"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "1",
      "id": "B->G",
      "source_id": "B",
      "target_id": "G",
      "weight": 15,
      "attributes": {}
    },
    "metadata": "添加边 B->G 权重 15"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": Infinity,
        "D": Infinity,
        "F": Infinity,
        "G": Infinity,
        "B": Infinity,
        "E": Infinity,
        "A": Infinity
      }
    },
    "metadata": "添加变量distances，值为{'C': inf, 'D': inf, 'F': inf, 'G': inf, 'B': inf, 'E': inf, 'A': inf}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": Infinity,
        "D": Infinity,
        "F": Infinity,
        "G": Infinity,
        "B": Infinity,
        "E": Infinity,
        "A": 0
      }
    },
    "metadata": "更新变量distances的值为{'C': inf, 'D': inf, 'F': inf, 'G': inf, 'B': inf, 'E': inf, 'A': 0}"
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
    "metadata": "添加变量priority_queue，值为[(0, 'A')]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": []
    },
    "metadata": "更新变量priority_queue的值为[]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "A"
    },
    "metadata": "访问节点 A"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "A->B"
    },
    "metadata": "检查边 A->B"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": Infinity,
        "D": Infinity,
        "F": Infinity,
        "G": Infinity,
        "B": 4,
        "E": Infinity,
        "A": 0
      }
    },
    "metadata": "更新变量distances的值为{'C': inf, 'D': inf, 'F': inf, 'G': inf, 'B': 4, 'E': inf, 'A': 0}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          "B"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 'B')]"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "A->B"
    },
    "metadata": "检查完成边 A->B"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "A->C"
    },
    "metadata": "检查边 A->C"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": 2,
        "D": Infinity,
        "F": Infinity,
        "G": Infinity,
        "B": 4,
        "E": Infinity,
        "A": 0
      }
    },
    "metadata": "更新变量distances的值为{'C': 2, 'D': inf, 'F': inf, 'G': inf, 'B': 4, 'E': inf, 'A': 0}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          2,
          "C"
        ],
        [
          4,
          "B"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(2, 'C'), (4, 'B')]"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "A->C"
    },
    "metadata": "检查完成边 A->C"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "A"
    },
    "metadata": "完成节点 A 的访问"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          "B"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 'B')]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "C"
    },
    "metadata": "访问节点 C"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "C->E"
    },
    "metadata": "检查边 C->E"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": 2,
        "D": Infinity,
        "F": Infinity,
        "G": Infinity,
        "B": 4,
        "E": 5,
        "A": 0
      }
    },
    "metadata": "更新变量distances的值为{'C': 2, 'D': inf, 'F': inf, 'G': inf, 'B': 4, 'E': 5, 'A': 0}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          "B"
        ],
        [
          5,
          "E"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 'B'), (5, 'E')]"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "C->E"
    },
    "metadata": "检查完成边 C->E"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "C->G"
    },
    "metadata": "检查边 C->G"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": 2,
        "D": Infinity,
        "F": Infinity,
        "G": 10,
        "B": 4,
        "E": 5,
        "A": 0
      }
    },
    "metadata": "更新变量distances的值为{'C': 2, 'D': inf, 'F': inf, 'G': 10, 'B': 4, 'E': 5, 'A': 0}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          "B"
        ],
        [
          5,
          "E"
        ],
        [
          10,
          "G"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 'B'), (5, 'E'), (10, 'G')]"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "C->G"
    },
    "metadata": "检查完成边 C->G"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "C"
    },
    "metadata": "完成节点 C 的访问"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          5,
          "E"
        ],
        [
          10,
          "G"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(5, 'E'), (10, 'G')]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "B"
    },
    "metadata": "访问节点 B"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "B->C"
    },
    "metadata": "检查边 B->C"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "B->C"
    },
    "metadata": "检查完成边 B->C"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "B->D"
    },
    "metadata": "检查边 B->D"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": 2,
        "D": 14,
        "F": Infinity,
        "G": 10,
        "B": 4,
        "E": 5,
        "A": 0
      }
    },
    "metadata": "更新变量distances的值为{'C': 2, 'D': 14, 'F': inf, 'G': 10, 'B': 4, 'E': 5, 'A': 0}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          5,
          "E"
        ],
        [
          10,
          "G"
        ],
        [
          14,
          "D"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(5, 'E'), (10, 'G'), (14, 'D')]"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "B->D"
    },
    "metadata": "检查完成边 B->D"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "B->G"
    },
    "metadata": "检查边 B->G"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "B->G"
    },
    "metadata": "检查完成边 B->G"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "B"
    },
    "metadata": "完成节点 B 的访问"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          10,
          "G"
        ],
        [
          14,
          "D"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(10, 'G'), (14, 'D')]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "E"
    },
    "metadata": "访问节点 E"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "E->D"
    },
    "metadata": "检查边 E->D"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": 2,
        "D": 9,
        "F": Infinity,
        "G": 10,
        "B": 4,
        "E": 5,
        "A": 0
      }
    },
    "metadata": "更新变量distances的值为{'C': 2, 'D': 9, 'F': inf, 'G': 10, 'B': 4, 'E': 5, 'A': 0}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          9,
          "D"
        ],
        [
          14,
          "D"
        ],
        [
          10,
          "G"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(9, 'D'), (14, 'D'), (10, 'G')]"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "E->D"
    },
    "metadata": "检查完成边 E->D"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "E->F"
    },
    "metadata": "检查边 E->F"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": 2,
        "D": 9,
        "F": 11,
        "G": 10,
        "B": 4,
        "E": 5,
        "A": 0
      }
    },
    "metadata": "更新变量distances的值为{'C': 2, 'D': 9, 'F': 11, 'G': 10, 'B': 4, 'E': 5, 'A': 0}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          9,
          "D"
        ],
        [
          11,
          "F"
        ],
        [
          10,
          "G"
        ],
        [
          14,
          "D"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(9, 'D'), (11, 'F'), (10, 'G'), (14, 'D')]"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "E->F"
    },
    "metadata": "检查完成边 E->F"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "E"
    },
    "metadata": "完成节点 E 的访问"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          10,
          "G"
        ],
        [
          11,
          "F"
        ],
        [
          14,
          "D"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(10, 'G'), (11, 'F'), (14, 'D')]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "D"
    },
    "metadata": "访问节点 D"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "D->F"
    },
    "metadata": "检查边 D->F"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": 2,
        "D": 9,
        "F": 10,
        "G": 10,
        "B": 4,
        "E": 5,
        "A": 0
      }
    },
    "metadata": "更新变量distances的值为{'C': 2, 'D': 9, 'F': 10, 'G': 10, 'B': 4, 'E': 5, 'A': 0}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          10,
          "F"
        ],
        [
          10,
          "G"
        ],
        [
          14,
          "D"
        ],
        [
          11,
          "F"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(10, 'F'), (10, 'G'), (14, 'D'), (11, 'F')]"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "D->F"
    },
    "metadata": "检查完成边 D->F"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "D"
    },
    "metadata": "完成节点 D 的访问"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          10,
          "G"
        ],
        [
          11,
          "F"
        ],
        [
          14,
          "D"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(10, 'G'), (11, 'F'), (14, 'D')]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "F"
    },
    "metadata": "访问节点 F"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "1",
      "id": "F->G"
    },
    "metadata": "检查边 F->G"
  },
  {
    "operation": "unhighlight_edge",
    "data": {
      "graph_id": "1",
      "id": "F->G"
    },
    "metadata": "检查完成边 F->G"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "F"
    },
    "metadata": "完成节点 F 的访问"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          11,
          "F"
        ],
        [
          14,
          "D"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(11, 'F'), (14, 'D')]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "G"
    },
    "metadata": "访问节点 G"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "G"
    },
    "metadata": "完成节点 G 的访问"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          14,
          "D"
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(14, 'D')]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "F"
    },
    "metadata": "访问节点 F"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "F"
    },
    "metadata": "跳过节点 F"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": []
    },
    "metadata": "更新变量priority_queue的值为[]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "D"
    },
    "metadata": "访问节点 D"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "1",
      "id": "D"
    },
    "metadata": "跳过节点 D"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "distances",
      "value": {
        "C": 2,
        "D": 9,
        "F": 10,
        "G": 10,
        "B": 4,
        "E": 5,
        "A": 0
      }
    },
    "metadata": "最终距离结果"
  }
];