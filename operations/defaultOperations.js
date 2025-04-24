// 一维数组新操作的演示
const defaultOperations = [
  // 创建一个初始数组
  {
      operation: "create_array",
      data: {
          array: [3, 8, 2, 7, 1, 5, 9],
          id: "demo_array"
      },
      metadata: "创建一个示例数组"
  },
  
  // 演示1：更新单个元素
  {
      operation: "highlight",
      data: {
          indices: [2],
          id: "demo_array",
          color: "#ffcc00"
      },
      metadata: "高亮索引2的元素"
  },
  {
      operation: "update_element",
      data: {
          index: 2,
          value: 10,
          id: "demo_array"
      },
      metadata: "将索引2的元素值更新为10"
  },
  {
      operation: "unhighlight",
      data: {
          indices: [2],
          id: "demo_array"
      },
      metadata: "取消高亮"
  },
  
  // 演示2：批量更新多个元素
  {
      operation: "highlight",
      data: {
          indices: [0, 3, 5],
          id: "demo_array",
          color: "#66ccff"
      },
      metadata: "高亮将要批量更新的元素"
  },
  {
      operation: "update_elements",
      data: {
          updates: [
              {index: 0, value: 15},
              {index: 3, value: 20},
              {index: 5, value: 25}
          ],
          id: "demo_array"
      },
      metadata: "批量更新多个元素值"
  },
  {
      operation: "unhighlight",
      data: {
          indices: [0, 3, 5],
          id: "demo_array"
      },
      metadata: "取消高亮"
  },
  
  // 演示3：在特定位置插入元素
  {
      operation: "highlight",
      data: {
          indices: [2, 3, 4, 5, 6],
          id: "demo_array",
          color: "#cccccc"
      },
      metadata: "高亮将受插入影响的元素"
  },
  {
      operation: "insert_element",
      data: {
          index: 2,
          value: 42,
          id: "demo_array"
      },
      metadata: "在索引2的位置插入值42"
  },
  {
      operation: "unhighlight",
      data: {
          indices: [2, 3, 4, 5, 6, 7],
          id: "demo_array"
      },
      metadata: "取消高亮"
  },
  
  // 演示4：删除特定元素
  {
      operation: "highlight",
      data: {
          indices: [4],
          id: "demo_array",
          color: "#ff6666"
      },
      metadata: "高亮要删除的元素"
  },
  {
      operation: "remove_element",
      data: {
          index: 4,
          id: "demo_array"
      },
      metadata: "删除索引4位置的元素"
  },
  
  // 演示5：更新整个数组
  {
      operation: "update_array",
      data: {
          array: [5, 10, 15, 20, 25, 30, 35, 40],
          id: "demo_array"
      },
      metadata: "更新整个数组为新的数据集"
  },
  
  // 在新数组上演示高亮和交换操作
  {
      operation: "highlight",
      data: {
          indices: [2, 5],
          id: "demo_array",
          color: "#99cc99"
      },
      metadata: "高亮新数组中的元素"
  },
  {
      operation: "swap_elements",
      data: {
          indices: [2, 5],
          id: "demo_array"
      },
      metadata: "交换高亮的元素"
  },
  {
      operation: "unhighlight",
      data: {
          indices: [2, 5],
          id: "demo_array"
      },
      metadata: "取消高亮"
  }
];

