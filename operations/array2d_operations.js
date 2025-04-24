const defaultOperations =[
    {
        "operation": "create_array2d",
        "data": {
            "id": "matrix1",
            "array": [
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12]
            ]
        },
        "metadata": "创建二维数组 matrix1"
    },
    {
        "operation": "highlight2d",
        "data": {
            "id": "matrix1",
            "positions": [
                {"row": 0, "col": 0},
                {"row": 0, "col": 1},
                {"row": 0, "col": 2},
                {"row": 0, "col": 3}
            ],
            "color": "#FFCCCC"
        },
        "metadata": "高亮第一行"
    },
    {
        "operation": "unhighlight2d",
        "data": {
            "id": "matrix1",
            "positions": [
                {"row": 0, "col": 0},
                {"row": 0, "col": 1},
                {"row": 0, "col": 2},
                {"row": 0, "col": 3}
            ]
        },
        "metadata": "取消高亮第一行"
    },
    {
        "operation": "highlight2d",
        "data": {
            "id": "matrix1",
            "positions": [
              {"row": 0, "col": 0},
              {"row": 1, "col": 0},
              {"row": 2, "col": 0}
          ],
            "color": "#CCFFCC"
        },
        "metadata": "高亮第一列"
    },
    {
        "operation": "swap_elements2d",
        "data": {
            "id": "matrix1",
            "pos1": {"row": 0, "col": 0},
            "pos2": {"row": 2, "col": 2}
        },
        "metadata": "交换元素 (0,0) 和 (2,2)"
    },
    {
        "operation": "unhighlight2d",
        "data": {
            "id": "matrix1",
            "positions": [
                {"row": 0, "col": 0},
                {"row": 1, "col": 0},
                {"row": 2, "col": 0}
            ]
        },
        "metadata": "取消高亮第一列"
    },
    {
        "operation": "swap_rows2d",
        "data": {
            "id": "matrix1",
            "row1": 0,
            "row2": 2
        },
        "metadata": "交换行 0 和行 2"
    },
    {
        "operation": "swap_columns2d",
        "data": {
            "id": "matrix1",
            "col1": 0,
            "col2": 3
        },
        "metadata": "交换列 0 和列 3"
    },
    {
        "operation": "update_element2d",
        "data": {
            "id": "matrix1",
            "position": {"row": 1, "col": 1},
            "value": 99
        },
        "metadata": "更新元素 (1,1) 为 99"
    },
    {
        "operation": "add_row2d",
        "data": {
            "id": "matrix1",
            "row": [1, 2, 3, 4],
            "position": 1
        },
        "metadata": "在位置 1 添加一行"
    },
    {
        "operation": "add_column2d",
        "data": {
            "id": "matrix1",
            "column": [1, 2, 3, 4],
            "position": 2
        },
        "metadata": "在位置 2 添加一列"
    },
    {
        "operation": "remove_row2d",
        "data": {
            "id": "matrix1",
            "position": 0
        },
        "metadata": "删除位置 0 的行"
    },
    {
        "operation": "remove_column2d",
        "data": {
            "id": "matrix1",
            "position": 2
        },
        "metadata": "删除位置 2 的列"
    }
];

