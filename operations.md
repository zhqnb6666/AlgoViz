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

