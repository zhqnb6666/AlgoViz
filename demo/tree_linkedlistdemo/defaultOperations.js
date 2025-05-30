const defaultOperations = [
  {
    "operation": "create_root",
    "data": {
      "value": 1,
      "id": "node0"
    },
    "metadata": "创建值为1的根节点"
  },
  {
    "operation": "add_child",
    "data": {
      "parent_id": "node0",
      "value": 2,
      "id": "node1"
    },
    "metadata": "向节点node0添加值为2的子节点",
    "position": 10
  },
  {
    "operation": "add_child",
    "data": {
      "parent_id": "node1",
      "value": 3,
      "id": "node2"
    },
    "metadata": "向节点node1添加值为3的子节点",
    "position": 10
  },
  {
    "operation": "add_child",
    "data": {
      "parent_id": "node1",
      "value": 4,
      "id": "node3"
    },
    "metadata": "向节点node1添加值为4的子节点",
    "position": 10
  },
  {
    "operation": "add_child",
    "data": {
      "parent_id": "node0",
      "value": 5,
      "id": "node4"
    },
    "metadata": "向节点node0添加值为5的子节点",
    "position": 10
  },
  {
    "operation": "add_child",
    "data": {
      "parent_id": "node4",
      "value": 6,
      "id": "node5"
    },
    "metadata": "向节点node4添加值为6的子节点",
    "position": 10
  },
  {
    "operation": "create_array",
    "data": {
      "array": [
        1
      ],
      "id": "arr0"
    },
    "metadata": "初始化栈"
  },
  {
    "operation": "add_variable",
    "data": {
      "name": "prev",
      "value": null
    },
    "metadata": "初始化前驱节点",
    "position": 16
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "访问节点 1"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "prev",
      "value": 1
    },
    "metadata": "更新前驱节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "stack",
      "value": [
        5,
        2
      ]
    },
    "metadata": "更新栈内容",
    "position": 31
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮索引2的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "访问节点 2"
  },
  {
    "operation": "highlight_tree_node",
    "data": {
      "id": "node0"
    },
    "metadata": "高亮节点node0"
  },
  {
    "operation": "unhighlight_tree_node",
    "data": {
      "id": "node0"
    },
    "metadata": "取消高亮节点node0"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "prev",
      "value": 2
    },
    "metadata": "更新前驱节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "stack",
      "value": [
        5,
        4,
        3
      ]
    },
    "metadata": "更新栈内容",
    "position": 31
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        3
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮索引3的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        2
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "访问节点 3"
  },
  {
    "operation": "highlight_tree_node",
    "data": {
      "id": "node1"
    },
    "metadata": "高亮节点node1"
  },
  {
    "operation": "unhighlight_tree_node",
    "data": {
      "id": "node1"
    },
    "metadata": "取消高亮节点node1"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "prev",
      "value": 3
    },
    "metadata": "更新前驱节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "stack",
      "value": [
        5,
        4
      ]
    },
    "metadata": "更新栈内容",
    "position": 31
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        2
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮索引2的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        1
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "访问节点 4"
  },
  {
    "operation": "highlight_tree_node",
    "data": {
      "id": "node2"
    },
    "metadata": "高亮节点node2"
  },
  {
    "operation": "unhighlight_tree_node",
    "data": {
      "id": "node2"
    },
    "metadata": "取消高亮节点node2"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "prev",
      "value": 4
    },
    "metadata": "更新前驱节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "stack",
      "value": [
        5
      ]
    },
    "metadata": "更新栈内容",
    "position": 31
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮索引1的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "访问节点 5"
  },
  {
    "operation": "highlight_tree_node",
    "data": {
      "id": "node3"
    },
    "metadata": "高亮节点node3"
  },
  {
    "operation": "unhighlight_tree_node",
    "data": {
      "id": "node3"
    },
    "metadata": "取消高亮节点node3"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "prev",
      "value": 5
    },
    "metadata": "更新前驱节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "stack",
      "value": [
        6
      ]
    },
    "metadata": "更新栈内容",
    "position": 31
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        1
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮索引1的元素"
  },
  {
    "operation": "highlight",
    "data": {
      "indices": [
        0
      ],
      "id": "arr0",
      "color": "#FF9999"
    },
    "metadata": "访问节点 6"
  },
  {
    "operation": "highlight_tree_node",
    "data": {
      "id": "node4"
    },
    "metadata": "高亮节点node4"
  },
  {
    "operation": "unhighlight_tree_node",
    "data": {
      "id": "node4"
    },
    "metadata": "取消高亮节点node4"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "prev",
      "value": 6
    },
    "metadata": "更新前驱节点"
  },
  {
    "operation": "update_variable",
    "data": {
      "name": "stack",
      "value": []
    },
    "metadata": "更新栈内容",
    "position": 31
  },
  {
    "operation": "unhighlight",
    "data": {
      "indices": [
        0
      ],
      "id": "arr0"
    },
    "metadata": "取消高亮索引0的元素"
  },
  {
    "operation": "create_list",
    "data": {
      "value": 1,
      "id": "node6",
      "list_name": "linkedList"
    },
    "metadata": "创建链表表示展开后的树",
    "position": 9
  },
  {
    "operation": "append_node",
    "data": {
      "value": 2,
      "id": "node7",
      "list_name": "linkedList"
    },
    "metadata": "在链表中追加节点 2",
    "position": 35
  },
  {
    "operation": "append_node",
    "data": {
      "value": 3,
      "id": "node8",
      "list_name": "linkedList"
    },
    "metadata": "在链表中追加节点 3",
    "position": 35
  },
  {
    "operation": "append_node",
    "data": {
      "value": 4,
      "id": "node9",
      "list_name": "linkedList"
    },
    "metadata": "在链表中追加节点 4",
    "position": 35
  },
  {
    "operation": "append_node",
    "data": {
      "value": 5,
      "id": "node10",
      "list_name": "linkedList"
    },
    "metadata": "在链表中追加节点 5",
    "position": 35
  },
  {
    "operation": "append_node",
    "data": {
      "value": 6,
      "id": "node11",
      "list_name": "linkedList"
    },
    "metadata": "在链表中追加节点 6",
    "position": 35
  }
];