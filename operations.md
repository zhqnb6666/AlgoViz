{
  "operation": "create_array",
  "data": {
    "array": [4, 2, 1, 3],
    "id": "arr1"
  },
  "metadata": One-dimensional array
}

{
  "operation": "swap_elements",
  "data": {
    "indices": [0, 1],
    "id": "arr1"
  },
}

{

​    "operation": "highlight",

​    "data": {

​      "indices": [0,1],

​      "id": "arr0"

​	   "color":"red"

​    },

​    "metadata": ""

  }

{

​    "operation": "unhighlight",

​    "data": {

​      "indices": [0,1],

​      "id": "arr0"

​    },

​    "metadata": ""

  }

# 树

{
    "operation": "create_root",
    "data": {
        "value": 10,
        "id": "root"
    },
    "metadata": "创建值为10的根节点"
}

{
    "operation": "add_child",
    "data": {
        "parent_id": "root",
        "value": 7,
        "id": "node1"
    },
    "metadata": "向根节点添加值为7的子节点"
}

{
    "operation": "remove_node",
    "data": {
        "id": "node1"
    },
    "metadata": "删除ID为node1的节点及其子树"
}

{
    "operation": "highlight_node",
    "data": {
        "id": "root"
    },
    "metadata": "高亮根节点"
}

{
    "operation": "unhighlight_node",
    "data": {
        "id": "root"
    },
    "metadata": "取消高亮根节点"
}

{
    "operation": "update_value",
    "data": {
        "id": "node1",
        "value": 15
    },
    "metadata": "将node1的值更新为15"
}

{
    "operation": "highlight_link",
    "data": {
        "source_id": "root",
        "target_id": "node1"
    },
    "metadata": "高亮从root到node1的连线"
}

{
    "operation": "unhighlight_link",
    "data": {
        "source_id": "root",
        "target_id": "node1"
    },
    "metadata": "取消高亮从root到node1的连线"
}

{
    "operation": "reparent_node",
    "data": {
        "node_id": "node1",
        "new_parent_id": "node2"
    },
    "metadata": "将node1的父节点重新指定为node2"
}

# 链表

{ "operation": "create_list", "data": { "value": 10, "id": "node0" }, "metadata": "创建值为10的链表头节点" } 

{ "operation": "append_node", "data": { "value": 7, "id": "node1" }, "metadata": "在链表尾部添加值为7的新节点" }

 { "operation": "prepend_node", "data": { "value": 5, "id": "node2" }, "metadata": "在链表头部添加值为5的新节点" }

 { "operation": "insert_after", "data": { "target_id": "node1", "value": 8, "id": "node3" }, "metadata": "在node1后插入值为8的新节点" } { "operation": "insert_before", "data": { "target_id": "node1", "value": 6, "id": "node4" }, "metadata": "在node1前插入值为6的新节点" } 

{ "operation": "remove_node", "data": { "id": "node1" }, "metadata": "删除ID为node1的节点" } 

{ "operation": "update_value", "data": { "id": "node1", "value": 15 }, "metadata": "将node1的值更新为15" } 

{ "operation": "highlight_node", "data": { "id": "node1" }, "metadata": "高亮node1节点" } 

{ "operation": "unhighlight_node", "data": { "id": "node1" }, "metadata": "取消高亮node1节点" }

 { "operation": "highlight_link", "data": { "source_id": "node0", "target_id": "node1" }, "metadata": "高亮从node0到node1的连接" } 

{ "operation": "unhighlight_link", "data": { "source_id": "node0", "target_id": "node1" }, "metadata": "取消高亮从node0到node1的连接" } 

{ "operation": "reverse_list", "data": {}, "metadata": "反转整个链表" } { "operation": "reverse_segment", "data": { "start_id": "node1", "end_id": "node3" }, "metadata": "反转从node1到node3的链表段" }

 { "operation": "swap_nodes", "data": { "id1": "node1", "id2": "node3" }, "metadata": "交换node1和node3节点" } 

{ "operation": "merge_lists", "data": { "list1_id": "node01", "list2_id": "node02", "new_list_id": "merged" }, "metadata": "合并两个链表" } 

{ "operation": "split_list", "data": { "list_id": "node0", "split_after_id": "node2", "new_list_id": "second_list" }, "metadata": "在node2之后拆分链表为两个链表" }

# 图

{ "operation": "create_graph", "data": { "id": "graph1", "directed": true }, "metadata": "创建一个新的有向图" } 

{ "operation": "add_node", "data": { "graph_id": "graph1", "id": "node1", "value": 10, "attributes": { "color": "blue", "position": { "x": 100, "y": 200 } } }, "metadata": "向图中添加带有属性的节点" }

 { "operation": "remove_node", "data": { "graph_id": "graph1", "id": "node1" }, "metadata": "从图中删除节点及其关联的所有边" } 

{ "operation": "update_node", "data": { "graph_id": "graph1", "id": "node1", "value": 15, "attributes": { "color": "red" } }, "metadata": "更新节点的值和属性" }

 { "operation": "add_edge", "data": { "graph_id": "graph1", "id": "edge1", "source_id": "node1", "target_id": "node2", "weight": 5, "attributes": { "color": "green", "style": "dashed" } }, "metadata": "添加两个节点之间的带权重边" } 

{ "operation": "remove_edge", "data": { "graph_id": "graph1", "id": "edge1" }, "metadata": "从图中删除指定边" } 

{ "operation": "update_edge", "data": { "graph_id": "graph1", "id": "edge1", "weight": 8, "attributes": { "color": "blue" } }, "metadata": "更新边的权重和属性" }

 { "operation": "highlight_node", "data": { "graph_id": "graph1", "id": "node1" }, "metadata": "高亮显示节点" }

 { "operation": "unhighlight_node", "data": { "graph_id": "graph1", "id": "node1" }, "metadata": "取消节点高亮" } 

{ "operation": "highlight_edge", "data": { "graph_id": "graph1", "id": "edge1" }, "metadata": "高亮显示边" } 

{ "operation": "unhighlight_edge", "data": { "graph_id": "graph1", "id": "edge1" }, "metadata": "取消边高亮" } 

 { "operation": "get_neighbors", "data": { "graph_id": "graph1", "node_id": "node1" }, "metadata": "获取指定节点的所有相邻节点" } 

{ "operation": "merge_nodes", "data": { "graph_id": "graph1", "nodes": ["node1", "node2"], "new_node_id": "merged_node", "value": 25 }, "metadata": "合并多个节点为一个新节点" }

 { "operation": "contract_edge", "data": { "graph_id": "graph1", "edge_id": "edge1", "new_node_id": "contracted_node" }, "metadata": "收缩一条边，将其两端节点合并为一个新节点" }

# 二维数组

{

​    "operation": "create_array2d",

​    "data": {

​      "id": "matrix1",

​      "array": [

​        [1, 2, 3, 4],

​        [5, 6, 7, 8],

​        [9, 10, 11, 12]

​      ]

​    },

​    "metadata": "创建二维数组 matrix1"

  },

  {

​    "operation": "highlight2d",

​    "data": {

​      "id": "matrix1",

​      "positions": [

​        {"row": 0, "col": 0},

​        {"row": 0, "col": 1},

​        {"row": 0, "col": 2},

​        {"row": 0, "col": 3}

​      ],

​      "color": "#FFCCCC"

​    },

​    "metadata": "高亮第一行"

  },

  {

​    "operation": "unhighlight2d",

​    "data": {

​      "id": "matrix1",

​      "positions": [

​        {"row": 0, "col": 0},

​        {"row": 0, "col": 1},

​        {"row": 0, "col": 2},

​        {"row": 0, "col": 3}

​      ]

​    },

​    "metadata": "取消高亮第一行"

  },

  {

​    "operation": "highlight2d",

​    "data": {

​      "id": "matrix1",

​      "positions": [

​       {"row": 0, "col": 0},

​       {"row": 1, "col": 0},

​       {"row": 2, "col": 0}

​     ],

​      "color": "#CCFFCC"

​    },

​    "metadata": "高亮第一列"

  },

  {

​    "operation": "swap_elements2d",

​    "data": {

​      "id": "matrix1",

​      "pos1": {"row": 0, "col": 0},

​      "pos2": {"row": 2, "col": 2}

​    },

​    "metadata": "交换元素 (0,0) 和 (2,2)"

  },

  {

​    "operation": "unhighlight2d",

​    "data": {

​      "id": "matrix1",

​      "positions": [

​        {"row": 0, "col": 0},

​        {"row": 1, "col": 0},

​        {"row": 2, "col": 0}

​      ]

​    },

​    "metadata": "取消高亮第一列"

  },

  {

​    "operation": "swap_rows2d",

​    "data": {

​      "id": "matrix1",

​      "row1": 0,

​      "row2": 2

​    },

​    "metadata": "交换行 0 和行 2"

  },

  {

​    "operation": "swap_columns2d",

​    "data": {

​      "id": "matrix1",

​      "col1": 0,

​      "col2": 3

​    },

​    "metadata": "交换列 0 和列 3"

  },

  {

​    "operation": "update_element2d",

​    "data": {

​      "id": "matrix1",

​      "position": {"row": 1, "col": 1},

​      "value": 99

​    },

​    "metadata": "更新元素 (1,1) 为 99"

  },

  {

​    "operation": "add_row2d",

​    "data": {

​      "id": "matrix1",

​      "row": [1, 2, 3, 4],

​      "position": 1

​    },

​    "metadata": "在位置 1 添加一行"

  },

  {

​    "operation": "add_column2d",

​    "data": {

​      "id": "matrix1",

​      "column": [1, 2, 3, 4],

​      "position": 2

​    },

​    "metadata": "在位置 2 添加一列"

  },

  {

​    "operation": "remove_row2d",

​    "data": {

​      "id": "matrix1",

​      "position": 0

​    },

​    "metadata": "删除位置 0 的行"

  },

  {

​    "operation": "remove_column2d",

​    "data": {

​      "id": "matrix1",

​      "position": 2

​    },

​    "metadata": "删除位置 2 的列"

  }
