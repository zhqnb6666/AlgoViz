const defaultOperations = [
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        2,
        3
      ],
      "id": "arr0"
    },
    "metadata": "创建数组 nums"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "添加变量nums，值为[1, 2, 3]",
    "position": 14
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "result",
      "value": []
    },
    "metadata": "添加变量result，值为[]",
    "position": 14
  },
  {
    "operation": "create_array2d",
    "data": {
      "array": [],
      "id": "arr2d0"
    },
    "metadata": "创建二维数组 result",
    "position": 15
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 0
    },
    "metadata": "添加变量start，值为0",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 0
    },
    "metadata": "更新变量i的值为0",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0,
        0
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "更新变量nums的值为[1, 2, 3]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0,
        0
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 1
    },
    "metadata": "添加变量start，值为1",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 1
    },
    "metadata": "更新变量i的值为1",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "更新变量nums的值为[1, 2, 3]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 2
    },
    "metadata": "添加变量start，值为2",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "更新变量nums的值为[1, 2, 3]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 3
    },
    "metadata": "添加变量start，值为3",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "result",
      "value": [
        [
          1,
          2,
          3
        ]
      ]
    },
    "metadata": "更新变量result的值为[[1, 2, 3]]",
    "position": 5
  },
  {
    "operation": "add_row2d",
    "data": {
      "row": [
        1,
        2,
        3
      ],
      "position": 0,
      "id": "arr2d0",
      "row_id": "arr2d0_row0"
    },
    "metadata": "添加新的排列结果",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "更新变量nums的值为[1, 2, 3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "更新变量nums的值为[1, 2, 3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        3,
        2
      ]
    },
    "metadata": "更新变量nums的值为[1, 3, 2]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 2
    },
    "metadata": "添加变量start，值为2",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        3,
        2
      ]
    },
    "metadata": "更新变量nums的值为[1, 3, 2]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 3
    },
    "metadata": "添加变量start，值为3",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "result",
      "value": [
        [
          1,
          2,
          3
        ],
        [
          1,
          3,
          2
        ]
      ]
    },
    "metadata": "更新变量result的值为[[1, 2, 3], [1, 3, 2]]",
    "position": 5
  },
  {
    "operation": "add_row2d",
    "data": {
      "row": [
        1,
        3,
        2
      ],
      "position": 1,
      "id": "arr2d0",
      "row_id": "arr2d0_row1"
    },
    "metadata": "添加新的排列结果",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        3,
        2
      ]
    },
    "metadata": "更新变量nums的值为[1, 3, 2]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "更新变量nums的值为[1, 2, 3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0,
        0
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "更新变量nums的值为[1, 2, 3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0,
        0
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 1
    },
    "metadata": "更新变量i的值为1",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0,
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        2,
        1,
        3
      ]
    },
    "metadata": "更新变量nums的值为[2, 1, 3]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0,
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 1
    },
    "metadata": "添加变量start，值为1",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 1
    },
    "metadata": "更新变量i的值为1",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        2,
        1,
        3
      ]
    },
    "metadata": "更新变量nums的值为[2, 1, 3]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 2
    },
    "metadata": "添加变量start，值为2",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        2,
        1,
        3
      ]
    },
    "metadata": "更新变量nums的值为[2, 1, 3]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 3
    },
    "metadata": "添加变量start，值为3",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "result",
      "value": [
        [
          1,
          2,
          3
        ],
        [
          1,
          3,
          2
        ],
        [
          2,
          1,
          3
        ]
      ]
    },
    "metadata": "更新变量result的值为[[1, 2, 3], [1, 3, 2], [2, 1, 3]]",
    "position": 5
  },
  {
    "operation": "add_row2d",
    "data": {
      "row": [
        2,
        1,
        3
      ],
      "position": 2,
      "id": "arr2d0",
      "row_id": "arr2d0_row2"
    },
    "metadata": "添加新的排列结果",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        2,
        1,
        3
      ]
    },
    "metadata": "更新变量nums的值为[2, 1, 3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        2,
        1,
        3
      ]
    },
    "metadata": "更新变量nums的值为[2, 1, 3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        2,
        3,
        1
      ]
    },
    "metadata": "更新变量nums的值为[2, 3, 1]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 2
    },
    "metadata": "添加变量start，值为2",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        2,
        3,
        1
      ]
    },
    "metadata": "更新变量nums的值为[2, 3, 1]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 3
    },
    "metadata": "添加变量start，值为3",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "result",
      "value": [
        [
          1,
          2,
          3
        ],
        [
          1,
          3,
          2
        ],
        [
          2,
          1,
          3
        ],
        [
          2,
          3,
          1
        ]
      ]
    },
    "metadata": "更新变量result的值为[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1]]",
    "position": 5
  },
  {
    "operation": "add_row2d",
    "data": {
      "row": [
        2,
        3,
        1
      ],
      "position": 3,
      "id": "arr2d0",
      "row_id": "arr2d0_row3"
    },
    "metadata": "添加新的排列结果",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        2,
        3,
        1
      ]
    },
    "metadata": "更新变量nums的值为[2, 3, 1]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        2,
        1,
        3
      ]
    },
    "metadata": "更新变量nums的值为[2, 1, 3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0,
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "更新变量nums的值为[1, 2, 3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0,
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        3,
        2,
        1
      ]
    },
    "metadata": "更新变量nums的值为[3, 2, 1]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 1
    },
    "metadata": "添加变量start，值为1",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 1
    },
    "metadata": "更新变量i的值为1",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        3,
        2,
        1
      ]
    },
    "metadata": "更新变量nums的值为[3, 2, 1]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 2
    },
    "metadata": "添加变量start，值为2",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        3,
        2,
        1
      ]
    },
    "metadata": "更新变量nums的值为[3, 2, 1]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 3
    },
    "metadata": "添加变量start，值为3",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "result",
      "value": [
        [
          1,
          2,
          3
        ],
        [
          1,
          3,
          2
        ],
        [
          2,
          1,
          3
        ],
        [
          2,
          3,
          1
        ],
        [
          3,
          2,
          1
        ]
      ]
    },
    "metadata": "更新变量result的值为[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 2, 1]]",
    "position": 5
  },
  {
    "operation": "add_row2d",
    "data": {
      "row": [
        3,
        2,
        1
      ],
      "position": 4,
      "id": "arr2d0",
      "row_id": "arr2d0_row4"
    },
    "metadata": "添加新的排列结果",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        3,
        2,
        1
      ]
    },
    "metadata": "更新变量nums的值为[3, 2, 1]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        3,
        2,
        1
      ]
    },
    "metadata": "更新变量nums的值为[3, 2, 1]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        3,
        1,
        2
      ]
    },
    "metadata": "更新变量nums的值为[3, 1, 2]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 2
    },
    "metadata": "添加变量start，值为2",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "i",
      "value": 2
    },
    "metadata": "更新变量i的值为2",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 8
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        3,
        1,
        2
      ]
    },
    "metadata": "更新变量nums的值为[3, 1, 2]",
    "position": 8
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "start",
      "value": 3
    },
    "metadata": "添加变量start，值为3",
    "position": 3
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "end",
      "value": 3
    },
    "metadata": "添加变量end，值为3",
    "position": 4
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "result",
      "value": [
        [
          1,
          2,
          3
        ],
        [
          1,
          3,
          2
        ],
        [
          2,
          1,
          3
        ],
        [
          2,
          3,
          1
        ],
        [
          3,
          2,
          1
        ],
        [
          3,
          1,
          2
        ]
      ]
    },
    "metadata": "更新变量result的值为[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 2, 1], [3, 1, 2]]",
    "position": 5
  },
  {
    "operation": "add_row2d",
    "data": {
      "row": [
        3,
        1,
        2
      ],
      "position": 5,
      "id": "arr2d0",
      "row_id": "arr2d0_row5"
    },
    "metadata": "添加新的排列结果",
    "position": 6
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        3,
        1,
        2
      ]
    },
    "metadata": "更新变量nums的值为[3, 1, 2]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        3,
        2,
        1
      ]
    },
    "metadata": "更新变量nums的值为[3, 2, 1]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0,
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "高亮待交换的元素",
    "position": 10
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "nums",
      "value": [
        1,
        2,
        3
      ]
    },
    "metadata": "更新变量nums的值为[1, 2, 3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0,
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮"
  }
];