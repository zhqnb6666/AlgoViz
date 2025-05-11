const defaultOperations = [
  {
    "operation": "create_array",
    "data": {
      "array": [
        0,
        1,
        0,
        2,
        1,
        0,
        1,
        3,
        2,
        1,
        2,
        1
      ],
      "id": "heightArray"
    },
    "metadata": "创建柱子高度数组"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0,
        11
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "初始化双指针: left=0, right=11"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮左指针: left=0"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动左指针: left=1"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新左侧最大值: max(0, 1) = 1"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 0 (最大值 1 - 高度 1)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        11
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮右指针: right=11"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        10
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动右指针: right=10"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        10
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新右侧最大值: max(1, 2) = 2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        10
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        10
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 0 (最大值 2 - 高度 2)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        10
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮左指针: left=1"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动左指针: left=2"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新左侧最大值: max(1, 0) = 1"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 1 (最大值 1 - 高度 0)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮左指针: left=2"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动左指针: left=3"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新左侧最大值: max(1, 2) = 2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 0 (最大值 2 - 高度 2)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        10
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮右指针: right=10"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        9
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动右指针: right=9"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        9
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新右侧最大值: max(2, 1) = 2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        9
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        9
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 1 (最大值 2 - 高度 1)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        9
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        9
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮右指针: right=9"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        8
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动右指针: right=8"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        8
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新右侧最大值: max(2, 2) = 2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        8
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        8
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 0 (最大值 2 - 高度 2)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        8
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        8
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮右指针: right=8"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动右指针: right=7"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新右侧最大值: max(2, 3) = 3"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 0 (最大值 3 - 高度 3)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮左指针: left=3"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动左指针: left=4"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新左侧最大值: max(2, 1) = 2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 1 (最大值 2 - 高度 1)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮左指针: left=4"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        5
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动左指针: left=5"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        5
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新左侧最大值: max(2, 0) = 2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        5
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        5
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 2 (最大值 2 - 高度 0)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        5
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        5
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮左指针: left=5"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        6
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动左指针: left=6"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        6
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新左侧最大值: max(2, 1) = 2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        6
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        6
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 1 (最大值 2 - 高度 1)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        6
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        6
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮左指针: left=6"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "移动左指针: left=7"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "更新左侧最大值: max(2, 3) = 3"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮更新操作"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray",
      "color": "#FF9999"
    },
    "metadata": "计算接雨水量: 0 (最大值 3 - 高度 3)"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        7
      ],
      "id": "heightArray"
    },
    "metadata": "取消高亮接雨水量计算"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        6
      ],
      "id": "resultArray"
    },
    "metadata": "接雨水的总量: 6"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "resultArray",
      "color": "#FF9999"
    },
    "metadata": "高亮接雨水总量结果"
  }
];