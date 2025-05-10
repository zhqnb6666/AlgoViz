const defaultOperations = [
  {
    "operation": "create_array",
    "data": {
      "array": [
        1,
        0,
        -1,
        0,
        -2,
        2
      ],
      "id": "numsArray"
    },
    "metadata": "创建初始数组"
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        -2,
        -1,
        0,
        0,
        1,
        2
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "数组排序完成"
  },
  {
    "operation": "create_array2d",
    "data": {
      "array": [],
      "id": "resultQuadruplets"
    },
    "metadata": "创建结果二维数组"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "固定第一个数字: nums[0] = -2"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "固定第二个数字: nums[1] = -1"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "初始化双指针"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "检查双指针位置: left=2, right=5"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "总和小于目标，移动左指针: nums[2] = 0"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3,
        5
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成当前双指针检查"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "检查双指针位置: left=3, right=5"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "总和小于目标，移动左指针: nums[3] = 0"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4,
        5
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成当前双指针检查"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "检查双指针位置: left=4, right=5"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0,
        1,
        4,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "找到目标四元组: -2, -1, 1, 2"
  },
  {
    "operation": "add_row2d",
    "data": {
      "row": [
        -2,
        -1,
        1,
        2
      ],
      "position": 0,
      "id": "resultQuadruplets"
    },
    "metadata": "添加新的四元组到结果数组"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        5,
        4
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成当前双指针检查"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成第二个数字固定: nums[1]"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "固定第二个数字: nums[2] = 0"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "初始化双指针"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "检查双指针位置: left=3, right=5"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0,
        2,
        3,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "找到目标四元组: -2, 0, 0, 2"
  },
  {
    "operation": "add_row2d",
    "data": {
      "row": [
        -2,
        0,
        0,
        2
      ],
      "position": 1,
      "id": "resultQuadruplets"
    },
    "metadata": "添加新的四元组到结果数组"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4,
        4
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成当前双指针检查"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成第二个数字固定: nums[2]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成第一个数字固定: nums[0]"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "固定第一个数字: nums[1] = -1"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "固定第二个数字: nums[2] = 0"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "初始化双指针"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "检查双指针位置: left=3, right=5"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        5
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "总和大于目标，移动右指针: nums[5] = 2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3,
        4
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成当前双指针检查"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3,
        4
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "检查双指针位置: left=3, right=4"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1,
        2,
        3,
        4
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "找到目标四元组: -1, 0, 0, 1"
  },
  {
    "operation": "add_row2d",
    "data": {
      "row": [
        -1,
        0,
        0,
        1
      ],
      "position": 2,
      "id": "resultQuadruplets"
    },
    "metadata": "添加新的四元组到结果数组"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4,
        3
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成当前双指针检查"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成第二个数字固定: nums[2]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成第一个数字固定: nums[1]"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "固定第一个数字: nums[2] = 0"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        3
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "固定第二个数字: nums[3] = 0"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "初始化双指针"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        4,
        5
      ],
      "id": "sortedNumsArray",
      "color": "#FF9999"
    },
    "metadata": "检查双指针位置: left=4, right=5"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        5
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "总和大于目标，移动右指针: nums[5] = 2"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        4,
        4
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成当前双指针检查"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成第二个数字固定: nums[3]"
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "sortedNumsArray"
    },
    "metadata": "完成第一个数字固定: nums[2]"
  }
];