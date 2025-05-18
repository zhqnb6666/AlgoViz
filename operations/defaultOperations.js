const defaultOperations = [
  {
    "operation": "add_variable",
    "data": {
      "name": "vertices",
      "value": 5
    },
    "metadata": "添加变量vertices，值为5"
  },
  {
    "operation": "create_array2d",
    "data": {
      "array": [
        [
          0,
          2,
          0,
          6,
          0
        ],
        [
          2,
          0,
          3,
          8,
          5
        ],
        [
          0,
          3,
          0,
          0,
          7
        ],
        [
          6,
          8,
          0,
          0,
          9
        ],
        [
          0,
          5,
          7,
          9,
          0
        ]
      ],
      "id": "adj_matrix"
    },
    "metadata": "Adjacency matrix of graph"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "graph",
      "value": [
        [
          0,
          2,
          0,
          6,
          0
        ],
        [
          2,
          0,
          3,
          8,
          5
        ],
        [
          0,
          3,
          0,
          0,
          7
        ],
        [
          6,
          8,
          0,
          0,
          9
        ],
        [
          0,
          5,
          7,
          9,
          0
        ]
      ]
    },
    "metadata": "更新变量graph的值为[[0, 2, 0, 6, 0], [2, 0, 3, 8, 5], [0, 3, 0, 0, 7], [6, 8, 0, 0, 9], [0, 5, 7, 9, 0]]"
  },
  {
    "operation": "create_graph",
    "data": {
      "id": "graph",
      "directed": false
    },
    "metadata": "Creating graph for Prim's MST"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph",
      "id": "node0",
      "value": 0,
      "attributes": {}
    },
    "metadata": "Adding node 0"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph",
      "id": "node1",
      "value": 1,
      "attributes": {}
    },
    "metadata": "Adding node 1"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph",
      "id": "node2",
      "value": 2,
      "attributes": {}
    },
    "metadata": "Adding node 2"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph",
      "id": "node3",
      "value": 3,
      "attributes": {}
    },
    "metadata": "Adding node 3"
  },
  {
    "operation": "add_node",
    "data": {
      "graph_id": "graph",
      "id": "node4",
      "value": 4,
      "attributes": {}
    },
    "metadata": "Adding node 4"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_index",
      "value": -1
    },
    "metadata": "添加变量min_index，值为-1"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_val",
      "value": Infinity
    },
    "metadata": "添加变量min_val，值为inf"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引0的元素"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_val",
      "value": 0
    },
    "metadata": "更新变量min_val的值为0"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_index",
      "value": 0
    },
    "metadata": "更新变量min_index的值为0"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引0的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引1的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引1的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引2的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引2的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引3的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引3的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引4的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引4的元素"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "u",
      "value": 0
    },
    "metadata": "添加变量u，值为0"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_set",
      "value": [
        true,
        false,
        false,
        false,
        false
      ]
    },
    "metadata": "更新变量mst_set的值为[True, False, False, False, False]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "key",
      "value": [
        0,
        2,
        Infinity,
        Infinity,
        Infinity
      ]
    },
    "metadata": "更新变量key的值为[0, 2, inf, inf, inf]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "parent",
      "value": [
        -1,
        0,
        null,
        null,
        null
      ]
    },
    "metadata": "更新变量parent的值为[-1, 0, None, None, None]"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge0-1",
      "source_id": null,
      "target_id": null,
      "weight": 2,
      "attributes": {}
    },
    "metadata": "Adding edge 0-1 with weight 2"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "key",
      "value": [
        0,
        2,
        Infinity,
        6,
        Infinity
      ]
    },
    "metadata": "更新变量key的值为[0, 2, inf, 6, inf]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "parent",
      "value": [
        -1,
        0,
        null,
        0,
        null
      ]
    },
    "metadata": "更新变量parent的值为[-1, 0, None, 0, None]"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge0-3",
      "source_id": null,
      "target_id": null,
      "weight": 6,
      "attributes": {}
    },
    "metadata": "Adding edge 0-3 with weight 6"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_index",
      "value": -1
    },
    "metadata": "添加变量min_index，值为-1"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_val",
      "value": Infinity
    },
    "metadata": "添加变量min_val，值为inf"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引0的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引0的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引1的元素"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_val",
      "value": 2
    },
    "metadata": "更新变量min_val的值为2"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_index",
      "value": 1
    },
    "metadata": "更新变量min_index的值为1"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引1的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引2的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引2的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引3的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引3的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引4的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引4的元素"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "u",
      "value": 1
    },
    "metadata": "添加变量u，值为1"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_set",
      "value": [
        true,
        true,
        false,
        false,
        false
      ]
    },
    "metadata": "更新变量mst_set的值为[True, True, False, False, False]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "key",
      "value": [
        0,
        2,
        3,
        6,
        Infinity
      ]
    },
    "metadata": "更新变量key的值为[0, 2, 3, 6, inf]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "parent",
      "value": [
        -1,
        0,
        1,
        0,
        null
      ]
    },
    "metadata": "更新变量parent的值为[-1, 0, 1, 0, None]"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge1-2",
      "source_id": null,
      "target_id": null,
      "weight": 3,
      "attributes": {}
    },
    "metadata": "Adding edge 1-2 with weight 3"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "key",
      "value": [
        0,
        2,
        3,
        6,
        5
      ]
    },
    "metadata": "更新变量key的值为[0, 2, 3, 6, 5]"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "parent",
      "value": [
        -1,
        0,
        1,
        0,
        1
      ]
    },
    "metadata": "更新变量parent的值为[-1, 0, 1, 0, 1]"
  },
  {
    "operation": "add_edge",
    "data": {
      "graph_id": "graph",
      "id": "edge1-4",
      "source_id": null,
      "target_id": null,
      "weight": 5,
      "attributes": {}
    },
    "metadata": "Adding edge 1-4 with weight 5"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_index",
      "value": -1
    },
    "metadata": "添加变量min_index，值为-1"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_val",
      "value": Infinity
    },
    "metadata": "添加变量min_val，值为inf"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引0的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引0的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引1的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引1的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引2的元素"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_val",
      "value": 3
    },
    "metadata": "更新变量min_val的值为3"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_index",
      "value": 2
    },
    "metadata": "更新变量min_index的值为2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引2的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引3的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引3的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引4的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引4的元素"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "u",
      "value": 2
    },
    "metadata": "添加变量u，值为2"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_set",
      "value": [
        true,
        true,
        true,
        false,
        false
      ]
    },
    "metadata": "更新变量mst_set的值为[True, True, True, False, False]"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_index",
      "value": -1
    },
    "metadata": "添加变量min_index，值为-1"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_val",
      "value": Infinity
    },
    "metadata": "添加变量min_val，值为inf"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引0的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引0的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引1的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引1的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引2的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引2的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引3的元素"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_val",
      "value": 6
    },
    "metadata": "更新变量min_val的值为6"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_index",
      "value": 3
    },
    "metadata": "更新变量min_index的值为3"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引3的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引4的元素"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_val",
      "value": 5
    },
    "metadata": "更新变量min_val的值为5"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_index",
      "value": 4
    },
    "metadata": "更新变量min_index的值为4"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引4的元素"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "u",
      "value": 4
    },
    "metadata": "添加变量u，值为4"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_set",
      "value": [
        true,
        true,
        true,
        false,
        true
      ]
    },
    "metadata": "更新变量mst_set的值为[True, True, True, False, True]"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_index",
      "value": -1
    },
    "metadata": "添加变量min_index，值为-1"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "min_val",
      "value": Infinity
    },
    "metadata": "添加变量min_val，值为inf"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引0的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引0的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引1的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引1的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引2的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引2的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引3的元素"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_val",
      "value": 6
    },
    "metadata": "更新变量min_val的值为6"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "min_index",
      "value": 3
    },
    "metadata": "更新变量min_index的值为3"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引3的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key",
      "color": "#FF9999"
    },
    "metadata": "高亮索引4的元素"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4
      ],
      "id": "key"
    },
    "metadata": "取消高亮索引4的元素"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "u",
      "value": 3
    },
    "metadata": "添加变量u，值为3"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "mst_set",
      "value": [
        true,
        true,
        true,
        true,
        true
      ]
    },
    "metadata": "更新变量mst_set的值为[True, True, True, True, True]"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": null
    },
    "metadata": "Edge 0-1 in MST"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": null
    },
    "metadata": "Edge 0-1 in MST"
  },
  {
    "operation": "highlight_link",
    "data": {
      "source_id": null,
      "target_id": null
    },
    "metadata": "Edge 0-1 in MST"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": null
    },
    "metadata": "Edge 1-2 in MST"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": null
    },
    "metadata": "Edge 1-2 in MST"
  },
  {
    "operation": "highlight_link",
    "data": {
      "source_id": null,
      "target_id": null
    },
    "metadata": "Edge 1-2 in MST"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": null
    },
    "metadata": "Edge 0-3 in MST"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": null
    },
    "metadata": "Edge 0-3 in MST"
  },
  {
    "operation": "highlight_link",
    "data": {
      "source_id": null,
      "target_id": null
    },
    "metadata": "Edge 0-3 in MST"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": null
    },
    "metadata": "Edge 1-4 in MST"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": null
    },
    "metadata": "Edge 1-4 in MST"
  },
  {
    "operation": "highlight_link",
    "data": {
      "source_id": null,
      "target_id": null
    },
    "metadata": "Edge 1-4 in MST"
  }
];