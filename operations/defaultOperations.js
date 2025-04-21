const defaultOperations = [
  {
    "operation": "create_array2d",
    "data": {
      "array": [
        [
          1,
          2
        ],
        [
          2,
          3
        ],
        [
          4,
          5
        ]
      ],
      "id": "nums1"
    },
    "metadata": "创建二维数组nums1"
  },
  {
    "operation": "create_array2d",
    "data": {
      "array": [
        [
          1,
          4
        ],
        [
          3,
          2
        ],
        [
          4,
          1
        ]
      ],
      "id": "nums2"
    },
    "metadata": "创建二维数组nums2"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        }
      ],
      "id": "nums1",
      "color": "#FF9999"
    },
    "metadata": "处理 nums1 中的元素: id=1, val=2"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        }
      ],
      "id": "nums1"
    },
    "metadata": "取消高亮位置(0,0), (0,1)的元素"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        }
      ],
      "id": "nums1",
      "color": "#FF9999"
    },
    "metadata": "处理 nums1 中的元素: id=2, val=3"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        }
      ],
      "id": "nums1"
    },
    "metadata": "取消高亮位置(1,0), (1,1)的元素"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        }
      ],
      "id": "nums1",
      "color": "#FF9999"
    },
    "metadata": "处理 nums1 中的元素: id=4, val=5"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        }
      ],
      "id": "nums1"
    },
    "metadata": "取消高亮位置(2,0), (2,1)的元素"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        }
      ],
      "id": "nums2",
      "color": "#FF9999"
    },
    "metadata": "处理 nums2 中的元素: id=1, val=4"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        }
      ],
      "id": "nums2"
    },
    "metadata": "取消高亮位置(0,0), (0,1)的元素"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        }
      ],
      "id": "nums2",
      "color": "#FF9999"
    },
    "metadata": "处理 nums2 中的元素: id=3, val=2"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        }
      ],
      "id": "nums2"
    },
    "metadata": "取消高亮位置(1,0), (1,1)的元素"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        }
      ],
      "id": "nums2",
      "color": "#FF9999"
    },
    "metadata": "处理 nums2 中的元素: id=4, val=1"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        }
      ],
      "id": "nums2"
    },
    "metadata": "取消高亮位置(2,0), (2,1)的元素"
  },
  {
    "operation": "create_array2d",
    "data": {
      "array": [
        [
          1,
          6
        ],
        [
          2,
          3
        ],
        [
          3,
          2
        ],
        [
          4,
          6
        ]
      ],
      "id": "result"
    },
    "metadata": "创建结果二维数组"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        }
      ],
      "id": "result",
      "color": "#FF9999"
    },
    "metadata": "结果中元素: id=1, val=6"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 0,
          "col": 0
        },
        {
          "row": 0,
          "col": 1
        }
      ],
      "id": "result"
    },
    "metadata": "取消高亮位置(0,0), (0,1)的元素"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        }
      ],
      "id": "result",
      "color": "#FF9999"
    },
    "metadata": "结果中元素: id=2, val=3"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 1,
          "col": 0
        },
        {
          "row": 1,
          "col": 1
        }
      ],
      "id": "result"
    },
    "metadata": "取消高亮位置(1,0), (1,1)的元素"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        }
      ],
      "id": "result",
      "color": "#FF9999"
    },
    "metadata": "结果中元素: id=3, val=2"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 2,
          "col": 0
        },
        {
          "row": 2,
          "col": 1
        }
      ],
      "id": "result"
    },
    "metadata": "取消高亮位置(2,0), (2,1)的元素"
  },
  {
    "operation": "highlight2d",
    "data": {
      "positions": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        }
      ],
      "id": "result",
      "color": "#FF9999"
    },
    "metadata": "结果中元素: id=4, val=6"
  },
  {
    "operation": "unhighlight2d",
    "data": {
      "positions": [
        {
          "row": 3,
          "col": 0
        },
        {
          "row": 3,
          "col": 1
        }
      ],
      "id": "result"
    },
    "metadata": "取消高亮位置(3,0), (3,1)的元素"
  }
];