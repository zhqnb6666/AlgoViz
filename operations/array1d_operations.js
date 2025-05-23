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
    
    // 添加初始变量
    {
        operation: "add_variable",
        data: {
            name: "最大值",
            value: 9
        },
        metadata: "添加最大值变量"
    },
    
    {
        operation: "add_variable",
        data: {
            name: "最小值",
            value: 1
        },
        metadata: "添加最小值变量"
    },
    
    {
        operation: "add_variable",
        data: {
            name: "总和",
            value: 35
        },
        metadata: "添加总和变量"
    },
    
    {
        operation: "add_variable",
        data: {
            name: "平均值",
            value: 5
        },
        metadata: "添加平均值变量"
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
    
    // 更新相关变量
    {
        operation: "update_variable",
        data: {
            name: "最大值",
            value: 10
        },
        metadata: "更新最大值"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "总和",
            value: 43
        },
        metadata: "更新总和"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "平均值",
            value: 6.14
        },
        metadata: "更新平均值"
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
    
    // 更新相关变量
    {
        operation: "update_variable",
        data: {
            name: "最大值",
            value: 25
        },
        metadata: "更新最大值"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "总和",
            value: 87
        },
        metadata: "更新总和"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "平均值",
            value: 12.43
        },
        metadata: "更新平均值"
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
    
    // 更新相关变量
    {
        operation: "update_variable",
        data: {
            name: "最大值",
            value: 42
        },
        metadata: "更新最大值"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "总和",
            value: 129
        },
        metadata: "更新总和"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "平均值",
            value: 16.13
        },
        metadata: "更新平均值"
    },
    
    {
        operation: "add_variable",
        data: {
            name: "元素个数",
            value: 8
        },
        metadata: "添加元素个数变量"
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
    
    // 更新相关变量
    {
        operation: "update_variable",
        data: {
            name: "总和",
            value: 128
        },
        metadata: "更新总和"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "元素个数",
            value: 7
        },
        metadata: "更新元素个数"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "平均值",
            value: 18.29
        },
        metadata: "更新平均值"
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
    
    // 更新所有变量
    {
        operation: "update_variable",
        data: {
            name: "最大值",
            value: 40
        },
        metadata: "更新最大值"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "最小值",
            value: 5
        },
        metadata: "更新最小值"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "总和",
            value: 180
        },
        metadata: "更新总和"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "元素个数",
            value: 8
        },
        metadata: "更新元素个数"
    },
    
    {
        operation: "update_variable",
        data: {
            name: "平均值",
            value: 22.5
        },
        metadata: "更新平均值"
    },
    
    // 删除不再需要的变量
    {
        operation: "delete_variable",
        data: {
            name: "最小值"
        },
        metadata: "删除最小值变量"
    },
    
    // 在新数组上演示高亮
    {
        operation: "highlight",
        data: {
            indices: [2, 5],
            id: "demo_array",
            color: "#99cc99"
        },
        metadata: "高亮新数组中的元素"
    },
    
    // 添加临时变量
    {
        operation: "add_variable",
        data: {
            name: "选中元素和",
            value: 45
        },
        metadata: "添加选中元素和变量"
    },
    
    {
        operation: "unhighlight",
        data: {
            indices: [2, 5],
            id: "demo_array"
        },
        metadata: "取消高亮"
    },
    
    // 删除临时变量
    {
        operation: "delete_variable",
        data: {
            name: "选中元素和"
        },
        metadata: "删除临时变量"
    }
];

