// 默认操作队列
const defaultOperations = [
  {
      operation: "add_variable",
      data: {
          name: "算法",
          value: "冒泡排序"
      },
      metadata: "初始化冒泡排序演示",
      position: 0
  },
  {
      operation: "create_array",
      data: {
          id: "arr",
          array: [5, 3, 8, 4, 2]
      },
      metadata: "创建待排序数组 [5, 3, 8, 4, 2]",
      position: 1
  },
  {
      operation: "add_variable",
      data: {
          name: "n",
          value: 5
      },
      metadata: "获取数组长度 n = 5",
      position: 2
  },
  // 外层循环 i=0
  {
      operation: "add_variable",
      data: {
          name: "i",
          value: 0
      },
      metadata: "开始外层循环，i = 0",
      position: 5
  },
  // 内层循环 j=0
  {
      operation: "add_variable",
      data: {
          name: "j",
          value: 0
      },
      metadata: "开始内层循环，j = 0",
      position: 7
  },
  {
      operation: "highlight",
      data: {
          id: "arr",
          indices: [0, 1],
          color: "#ff9900"
      },
      metadata: "比较元素 arr[0]=5 和 arr[1]=3",
      position: 9
  },
  {
      operation: "add_variable",
      data: {
          name: "比较",
          value: "5 > 3 ? 是"
      },
      metadata: "5 > 3，需要交换",
      position: 9
  },
  {
      operation: "add_variable",
      data: {
          name: "temp",
          value: 5
      },
      metadata: "temp = arr[0] = 5",
      position: 11
  },
  {
      operation: "update_element",
      data: {
          id: "arr",
          index: 0,
          value: 3
      },
      metadata: "arr[0] = arr[1] = 3",
      position: 12
  },
  {
      operation: "update_element",
      data: {
          id: "arr",
          index: 1,
          value: 5
      },
      metadata: "arr[1] = temp = 5",
      position: 13
  },
  {
      operation: "unhighlight",
      data: {
          id: "arr",
          indices: [0, 1]
      },
      metadata: "完成比较和交换",
      position: 13
  },
  // j=1
  {
      operation: "update_variable",
      data: {
          name: "j",
          value: 1
      },
      metadata: "内层循环，j = 1",
      position: 7
  },
  {
      operation: "highlight",
      data: {
          id: "arr",
          indices: [1, 2],
          color: "#ff9900"
      },
      metadata: "比较元素 arr[1]=5 和 arr[2]=8",
      position: 9
  },
  {
      operation: "add_variable",
      data: {
          name: "比较",
          value: "5 > 8 ? 否"
      },
      metadata: "5 < 8，不需要交换",
      position: 9
  },
  {
      operation: "unhighlight",
      data: {
          id: "arr",
          indices: [1, 2]
      },
      metadata: "完成比较",
      position: 9
  },
  // 继续演示几个步骤...
  {
      operation: "update_variable",
      data: {
          name: "j",
          value: 2
      },
      metadata: "内层循环，j = 2",
      position: 7
  },
  {
      operation: "highlight",
      data: {
          id: "arr",
          indices: [2, 3],
          color: "#ff9900"
      },
      metadata: "比较元素 arr[2]=8 和 arr[3]=4",
      position: 9
  },
  {
      operation: "add_variable",
      data: {
          name: "比较",
          value: "8 > 4 ? 是"
      },
      metadata: "8 > 4，需要交换",
      position: 9
  },
  {
      operation: "update_variable",
      data: {
          name: "temp",
          value: 8
      },
      metadata: "temp = arr[2] = 8",
      position: 11
  },
  {
      operation: "update_element",
      data: {
          id: "arr",
          index: 2,
          value: 4
      },
      metadata: "arr[2] = arr[3] = 4",
      position: 12
  },
  {
      operation: "update_element",
      data: {
          id: "arr",
          index: 3,
          value: 8
      },
      metadata: "arr[3] = temp = 8",
      position: 13
  },
  {
      operation: "unhighlight",
      data: {
          id: "arr",
          indices: [2, 3]
      },
      metadata: "完成比较和交换",
      position: 13
  },
  // 最后一轮比较
  {
      operation: "update_variable",
      data: {
          name: "j",
          value: 3
      },
      metadata: "内层循环，j = 3",
      position: 7
  },
  {
      operation: "highlight",
      data: {
          id: "arr",
          indices: [3, 4],
          color: "#ff9900"
      },
      metadata: "比较元素 arr[3]=8 和 arr[4]=2",
      position: 9
  },
  {
      operation: "add_variable",
      data: {
          name: "比较",
          value: "8 > 2 ? 是"
      },
      metadata: "8 > 2，需要交换",
      position: 9
  },
  {
      operation: "update_variable",
      data: {
          name: "temp",
          value: 8
      },
      metadata: "temp = arr[3] = 8",
      position: 11
  },
  {
      operation: "update_element",
      data: {
          id: "arr",
          index: 3,
          value: 2
      },
      metadata: "arr[3] = arr[4] = 2",
      position: 12
  },
  {
      operation: "update_element",
      data: {
          id: "arr",
          index: 4,
          value: 8
      },
      metadata: "arr[4] = temp = 8",
      position: 13
  },
  {
      operation: "unhighlight",
      data: {
          id: "arr",
          indices: [3, 4]
      },
      metadata: "完成比较和交换",
      position: 13
  },
  // 完成第一轮排序
  {
      operation: "highlight",
      data: {
          id: "arr",
          indices: [4],
          color: "#00ff00"
      },
      metadata: "第一轮排序完成，最大元素 8 已移至末尾",
      position: 5
  },
  {
      operation: "add_variable",
      data: {
          name: "结果",
          value: "完成一轮冒泡排序"
      },
      metadata: "完成第一轮冒泡排序，最大元素已移至末尾",
      position: 17
  },
  {
      operation: "add_variable",
      data: {
          name: "当前数组",
          value: "[3, 4, 2, 5, 8]"
      },
      metadata: "当前数组状态: [3, 4, 2, 5, 8]",
      position: 17
  }
];
