const defaultOperations = [
  {
    "operation": "add_variable",
    "data": {
      "name": "vertices",
      "value": 6
    },
    "metadata": "添加变量vertices，值为6"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [],
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": []
      }
    },
    "metadata": "添加变量graph，值为{0: [], 1: [], 2: [], 3: [], 4: [], 5: []}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          [
            1,
            4
          ]
        ],
        "1": [
          [
            0,
            4
          ]
        ],
        "2": [],
        "3": [],
        "4": [],
        "5": []
      }
    },
    "metadata": "更新变量graph的值为{0: [(1, 4)], 1: [(0, 4)], 2: [], 3: [], 4: [], 5: []}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          [
            1,
            4
          ],
          [
            2,
            3
          ]
        ],
        "1": [
          [
            0,
            4
          ]
        ],
        "2": [
          [
            0,
            3
          ]
        ],
        "3": [],
        "4": [],
        "5": []
      }
    },
    "metadata": "更新变量graph的值为{0: [(1, 4), (2, 3)], 1: [(0, 4)], 2: [(0, 3)], 3: [], 4: [], 5: []}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          [
            1,
            4
          ],
          [
            2,
            3
          ]
        ],
        "1": [
          [
            0,
            4
          ],
          [
            2,
            1
          ]
        ],
        "2": [
          [
            0,
            3
          ],
          [
            1,
            1
          ]
        ],
        "3": [],
        "4": [],
        "5": []
      }
    },
    "metadata": "更新变量graph的值为{0: [(1, 4), (2, 3)], 1: [(0, 4), (2, 1)], 2: [(0, 3), (1, 1)], 3: [], 4: [], 5: []}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          [
            1,
            4
          ],
          [
            2,
            3
          ]
        ],
        "1": [
          [
            0,
            4
          ],
          [
            2,
            1
          ],
          [
            3,
            2
          ]
        ],
        "2": [
          [
            0,
            3
          ],
          [
            1,
            1
          ]
        ],
        "3": [
          [
            1,
            2
          ]
        ],
        "4": [],
        "5": []
      }
    },
    "metadata": "更新变量graph的值为{0: [(1, 4), (2, 3)], 1: [(0, 4), (2, 1), (3, 2)], 2: [(0, 3), (1, 1)], 3: [(1, 2)], 4: [], 5: []}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          [
            1,
            4
          ],
          [
            2,
            3
          ]
        ],
        "1": [
          [
            0,
            4
          ],
          [
            2,
            1
          ],
          [
            3,
            2
          ]
        ],
        "2": [
          [
            0,
            3
          ],
          [
            1,
            1
          ],
          [
            3,
            4
          ]
        ],
        "3": [
          [
            1,
            2
          ],
          [
            2,
            4
          ]
        ],
        "4": [],
        "5": []
      }
    },
    "metadata": "更新变量graph的值为{0: [(1, 4), (2, 3)], 1: [(0, 4), (2, 1), (3, 2)], 2: [(0, 3), (1, 1), (3, 4)], 3: [(1, 2), (2, 4)], 4: [], 5: []}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          [
            1,
            4
          ],
          [
            2,
            3
          ]
        ],
        "1": [
          [
            0,
            4
          ],
          [
            2,
            1
          ],
          [
            3,
            2
          ]
        ],
        "2": [
          [
            0,
            3
          ],
          [
            1,
            1
          ],
          [
            3,
            4
          ]
        ],
        "3": [
          [
            1,
            2
          ],
          [
            2,
            4
          ],
          [
            4,
            2
          ]
        ],
        "4": [
          [
            3,
            2
          ]
        ],
        "5": []
      }
    },
    "metadata": "更新变量graph的值为{0: [(1, 4), (2, 3)], 1: [(0, 4), (2, 1), (3, 2)], 2: [(0, 3), (1, 1), (3, 4)], 3: [(1, 2), (2, 4), (4, 2)], 4: [(3, 2)], 5: []}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          [
            1,
            4
          ],
          [
            2,
            3
          ]
        ],
        "1": [
          [
            0,
            4
          ],
          [
            2,
            1
          ],
          [
            3,
            2
          ]
        ],
        "2": [
          [
            0,
            3
          ],
          [
            1,
            1
          ],
          [
            3,
            4
          ]
        ],
        "3": [
          [
            1,
            2
          ],
          [
            2,
            4
          ],
          [
            4,
            2
          ]
        ],
        "4": [
          [
            3,
            2
          ],
          [
            5,
            6
          ]
        ],
        "5": [
          [
            4,
            6
          ]
        ]
      }
    },
    "metadata": "更新变量graph的值为{0: [(1, 4), (2, 3)], 1: [(0, 4), (2, 1), (3, 2)], 2: [(0, 3), (1, 1), (3, 4)], 3: [(1, 2), (2, 4), (4, 2)], 4: [(3, 2), (5, 6)], 5: [(4, 6)]}"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": {
        "0": [
          [
            1,
            4
          ],
          [
            2,
            3
          ]
        ],
        "1": [
          [
            0,
            4
          ],
          [
            2,
            1
          ],
          [
            3,
            2
          ]
        ],
        "2": [
          [
            0,
            3
          ],
          [
            1,
            1
          ],
          [
            3,
            4
          ]
        ],
        "3": [
          [
            1,
            2
          ],
          [
            2,
            4
          ],
          [
            4,
            2
          ],
          [
            5,
            8
          ]
        ],
        "4": [
          [
            3,
            2
          ],
          [
            5,
            6
          ]
        ],
        "5": [
          [
            4,
            6
          ],
          [
            3,
            8
          ]
        ]
      }
    },
    "metadata": "更新变量graph的值为{0: [(1, 4), (2, 3)], 1: [(0, 4), (2, 1), (3, 2)], 2: [(0, 3), (1, 1), (3, 4)], 3: [(1, 2), (2, 4), (4, 2), (5, 8)], 4: [(3, 2), (5, 6)], 5: [(4, 6), (3, 8)]}"
  },
  {
    "operation": "create_graph",
    "data": {
      "id": "graph0",
      "directed": false
    },
    "metadata": "创建图"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_0",
      "value": 0,
      "attributes": {}
    },
    "metadata": "添加节点"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_1",
      "value": 1,
      "attributes": {}
    },
    "metadata": "添加节点"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_2",
      "value": 2,
      "attributes": {}
    },
    "metadata": "添加节点"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_3",
      "value": 3,
      "attributes": {}
    },
    "metadata": "添加节点"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_4",
      "value": 4,
      "attributes": {}
    },
    "metadata": "添加节点"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_5",
      "value": 5,
      "attributes": {}
    },
    "metadata": "添加节点"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_0_1",
      "source_id": "node_0",
      "target_id": "node_1",
      "weight": 4,
      "attributes": {}
    },
    "metadata": "添加边"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_0_2",
      "source_id": "node_0",
      "target_id": "node_2",
      "weight": 3,
      "attributes": {}
    },
    "metadata": "添加边"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_1_2",
      "source_id": "node_1",
      "target_id": "node_2",
      "weight": 1,
      "attributes": {}
    },
    "metadata": "添加边"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_1_3",
      "source_id": "node_1",
      "target_id": "node_3",
      "weight": 2,
      "attributes": {}
    },
    "metadata": "添加边"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_2_3",
      "source_id": "node_2",
      "target_id": "node_3",
      "weight": 4,
      "attributes": {}
    },
    "metadata": "添加边"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_3_4",
      "source_id": "node_3",
      "target_id": "node_4",
      "weight": 2,
      "attributes": {}
    },
    "metadata": "添加边"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_3_5",
      "source_id": "node_3",
      "target_id": "node_5",
      "weight": 8,
      "attributes": {}
    },
    "metadata": "添加边"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_4_5",
      "source_id": "node_4",
      "target_id": "node_5",
      "weight": 6,
      "attributes": {}
    },
    "metadata": "添加边"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          0,
          0
        ]
      ]
    },
    "metadata": "添加变量priority_queue，值为[(0, 0)]"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "visited",
      "value": [
        false,
        false,
        false,
        false,
        false,
        false
      ]
    },
    "metadata": "添加变量visited，值为[False, False, False, False, False, False]"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "mst_weight",
      "value": 0
    },
    "metadata": "添加变量mst_weight，值为0"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "mst_edges",
      "value": []
    },
    "metadata": "添加变量mst_edges，值为[]"
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
      "graph_id": "graph0",
      "id": "node_0"
    },
    "metadata": "访问节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        false,
        false,
        false,
        false,
        false
      ]
    },
    "metadata": "更新变量visited的值为[True, False, False, False, False, False]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_weight",
      "value": 0
    },
    "metadata": "更新变量mst_weight的值为0"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          1
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 1)]"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_0_1"
    },
    "metadata": "访问边"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          3,
          2
        ],
        [
          4,
          1
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(3, 2), (4, 1)]"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_0_2"
    },
    "metadata": "访问边"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_0"
    },
    "metadata": "取消高亮节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          1
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 1)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_2"
    },
    "metadata": "访问节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        false,
        true,
        false,
        false,
        false
      ]
    },
    "metadata": "更新变量visited的值为[True, False, True, False, False, False]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_weight",
      "value": 3
    },
    "metadata": "更新变量mst_weight的值为3"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_edges",
      "value": [
        [
          2,
          3
        ]
      ]
    },
    "metadata": "更新变量mst_edges的值为[(2, 3)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_2"
    },
    "metadata": "将节点添加到MST"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          1,
          1
        ],
        [
          4,
          1
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(1, 1), (4, 1)]"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_1_2"
    },
    "metadata": "访问边"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          1,
          1
        ],
        [
          4,
          1
        ],
        [
          4,
          3
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(1, 1), (4, 1), (4, 3)]"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_2_3"
    },
    "metadata": "访问边"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_2"
    },
    "metadata": "取消高亮节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          1
        ],
        [
          4,
          3
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 1), (4, 3)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_1"
    },
    "metadata": "访问节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        false,
        false,
        false
      ]
    },
    "metadata": "更新变量visited的值为[True, True, True, False, False, False]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_weight",
      "value": 4
    },
    "metadata": "更新变量mst_weight的值为4"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_edges",
      "value": [
        [
          2,
          3
        ],
        [
          1,
          1
        ]
      ]
    },
    "metadata": "更新变量mst_edges的值为[(2, 3), (1, 1)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_1"
    },
    "metadata": "将节点添加到MST"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          2,
          3
        ],
        [
          4,
          3
        ],
        [
          4,
          1
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(2, 3), (4, 3), (4, 1)]"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_1_3"
    },
    "metadata": "访问边"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_1"
    },
    "metadata": "取消高亮节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          1
        ],
        [
          4,
          3
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 1), (4, 3)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_3"
    },
    "metadata": "访问节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        false,
        false
      ]
    },
    "metadata": "更新变量visited的值为[True, True, True, True, False, False]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_weight",
      "value": 6
    },
    "metadata": "更新变量mst_weight的值为6"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_edges",
      "value": [
        [
          2,
          3
        ],
        [
          1,
          1
        ],
        [
          3,
          2
        ]
      ]
    },
    "metadata": "更新变量mst_edges的值为[(2, 3), (1, 1), (3, 2)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_3"
    },
    "metadata": "将节点添加到MST"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          2,
          4
        ],
        [
          4,
          3
        ],
        [
          4,
          1
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(2, 4), (4, 3), (4, 1)]"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_3_4"
    },
    "metadata": "访问边"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          2,
          4
        ],
        [
          4,
          3
        ],
        [
          4,
          1
        ],
        [
          8,
          5
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(2, 4), (4, 3), (4, 1), (8, 5)]"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_3_5"
    },
    "metadata": "访问边"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_3"
    },
    "metadata": "取消高亮节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          1
        ],
        [
          4,
          3
        ],
        [
          8,
          5
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 1), (4, 3), (8, 5)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_4"
    },
    "metadata": "访问节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        true,
        false
      ]
    },
    "metadata": "更新变量visited的值为[True, True, True, True, True, False]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_weight",
      "value": 8
    },
    "metadata": "更新变量mst_weight的值为8"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_edges",
      "value": [
        [
          2,
          3
        ],
        [
          1,
          1
        ],
        [
          3,
          2
        ],
        [
          4,
          2
        ]
      ]
    },
    "metadata": "更新变量mst_edges的值为[(2, 3), (1, 1), (3, 2), (4, 2)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_4"
    },
    "metadata": "将节点添加到MST"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          1
        ],
        [
          4,
          3
        ],
        [
          8,
          5
        ],
        [
          6,
          5
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 1), (4, 3), (8, 5), (6, 5)]"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_4_5"
    },
    "metadata": "访问边"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_4"
    },
    "metadata": "取消高亮节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          4,
          3
        ],
        [
          6,
          5
        ],
        [
          8,
          5
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(4, 3), (6, 5), (8, 5)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_1"
    },
    "metadata": "访问节点"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_1"
    },
    "metadata": "取消高亮节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          6,
          5
        ],
        [
          8,
          5
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(6, 5), (8, 5)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_3"
    },
    "metadata": "访问节点"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_3"
    },
    "metadata": "取消高亮节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "priority_queue",
      "value": [
        [
          8,
          5
        ]
      ]
    },
    "metadata": "更新变量priority_queue的值为[(8, 5)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_5"
    },
    "metadata": "访问节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "visited",
      "value": [
        true,
        true,
        true,
        true,
        true,
        true
      ]
    },
    "metadata": "更新变量visited的值为[True, True, True, True, True, True]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_weight",
      "value": 14
    },
    "metadata": "更新变量mst_weight的值为14"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_edges",
      "value": [
        [
          2,
          3
        ],
        [
          1,
          1
        ],
        [
          3,
          2
        ],
        [
          4,
          2
        ],
        [
          5,
          6
        ]
      ]
    },
    "metadata": "更新变量mst_edges的值为[(2, 3), (1, 1), (3, 2), (4, 2), (5, 6)]"
  },
  {
    "operation": "highlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_5"
    },
    "metadata": "将节点添加到MST"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_5"
    },
    "metadata": "取消高亮节点"
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
      "graph_id": "graph0",
      "id": "node_5"
    },
    "metadata": "访问节点"
  },
  {
    "operation": "unhighlight_graph_node",
    "data": {
      "graph_id": "graph0",
      "id": "node_5"
    },
    "metadata": "取消高亮节点"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_2_3"
    },
    "metadata": "边属于MST"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_1_2"
    },
    "metadata": "边属于MST"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_1_3"
    },
    "metadata": "边属于MST"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_3_4"
    },
    "metadata": "边属于MST"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_3_5"
    },
    "metadata": "边属于MST"
  },
  {
    "operation": "highlight_edge",
    "data": {
      "graph_id": "graph0",
      "id": "edge_4_5"
    },
    "metadata": "边属于MST"
  }
];