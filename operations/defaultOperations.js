const defaultOperations = [
  {
    "operation": "create_list",
    "data": {
      "value": 1,
      "id": "node0",
      "list_name": "linkedList"
    },
    "metadata": "创建链表头节点"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 2,
      "id": "node1",
      "list_name": "linkedList"
    },
    "metadata": "添加节点: 2"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 3,
      "id": "node2",
      "list_name": "linkedList"
    },
    "metadata": "添加节点: 3"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 4,
      "id": "node3",
      "list_name": "linkedList"
    },
    "metadata": "添加节点: 4"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 5,
      "id": "node4",
      "list_name": "linkedList"
    },
    "metadata": "添加节点: 5"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node0"
    },
    "metadata": "开始计算链表长度"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node1"
    },
    "metadata": "计数: 2"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node2"
    },
    "metadata": "计数: 3"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node3"
    },
    "metadata": "计数: 4"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node4"
    },
    "metadata": "计数: 5"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "id": "node4"
    },
    "metadata": "链表长度为: 5"
  },
  {
    "operation": "highlight_link",
    "data": {
      "source_id": "node4",
      "target_id": "node0"
    },
    "metadata": "形成循环链表"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node0"
    },
    "metadata": "计算新头位置: 从头向后走 3 步"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node0"
    },
    "metadata": "移动到新尾节点"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node1"
    },
    "metadata": "移动到新尾节点"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node3"
    },
    "metadata": "找到新的头节点"
  },
  {
    "operation": "unhighlight_link",
    "data": {
      "source_id": "node2",
      "target_id": "node3"
    },
    "metadata": "断开循环形成新链表"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node0"
    },
    "metadata": "原始链表的头节点"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node3"
    },
    "metadata": "旋转后的链表头节点"
  }
];