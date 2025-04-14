const defaultOperations = [
  {
    "operation": "create_list",
    "data": {
      "value": 1,
      "id": "node0",
      "list_name": "list_0"
    },
    "metadata": "创建链表: list_0 头节点"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 4,
      "id": "node1",
      "list_name": "list_0"
    },
    "metadata": "添加节点: 4"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 5,
      "id": "node2",
      "list_name": "list_0"
    },
    "metadata": "添加节点: 5"
  },
  {
    "operation": "create_list",
    "data": {
      "value": 1,
      "id": "node3",
      "list_name": "list_1"
    },
    "metadata": "创建链表: list_1 头节点"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 3,
      "id": "node4",
      "list_name": "list_1"
    },
    "metadata": "添加节点: 3"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 4,
      "id": "node5",
      "list_name": "list_1"
    },
    "metadata": "添加节点: 4"
  },
  {
    "operation": "create_list",
    "data": {
      "value": 2,
      "id": "node6",
      "list_name": "list_2"
    },
    "metadata": "创建链表: list_2 头节点"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 6,
      "id": "node7",
      "list_name": "list_2"
    },
    "metadata": "添加节点: 6"
  },
  {
    "operation": "create_list",
    "data": {
      "value": 0,
      "id": "node8",
      "list_name": "mergedList"
    },
    "metadata": "创建合并链表的虚拟头节点"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node0"
    },
    "metadata": "将节点: 1 推入堆"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node3"
    },
    "metadata": "将节点: 1 推入堆"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node6"
    },
    "metadata": "将节点: 2 推入堆"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node0"
    },
    "metadata": "弹出堆顶节点: 1"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 1,
      "id": "node9",
      "list_name": "mergedList"
    },
    "metadata": "合并节点: 1"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node1"
    },
    "metadata": "将下一个节点: 4 推入堆"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "id": "node0"
    },
    "metadata": "处理完成节点: 1"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node3"
    },
    "metadata": "弹出堆顶节点: 1"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 1,
      "id": "node10",
      "list_name": "mergedList"
    },
    "metadata": "合并节点: 1"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node4"
    },
    "metadata": "将下一个节点: 3 推入堆"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "id": "node3"
    },
    "metadata": "处理完成节点: 1"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node6"
    },
    "metadata": "弹出堆顶节点: 2"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 2,
      "id": "node11",
      "list_name": "mergedList"
    },
    "metadata": "合并节点: 2"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node7"
    },
    "metadata": "将下一个节点: 6 推入堆"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "id": "node6"
    },
    "metadata": "处理完成节点: 2"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node4"
    },
    "metadata": "弹出堆顶节点: 3"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 3,
      "id": "node12",
      "list_name": "mergedList"
    },
    "metadata": "合并节点: 3"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node5"
    },
    "metadata": "将下一个节点: 4 推入堆"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "id": "node4"
    },
    "metadata": "处理完成节点: 3"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node1"
    },
    "metadata": "弹出堆顶节点: 4"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 4,
      "id": "node13",
      "list_name": "mergedList"
    },
    "metadata": "合并节点: 4"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node2"
    },
    "metadata": "将下一个节点: 5 推入堆"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "id": "node1"
    },
    "metadata": "处理完成节点: 4"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node5"
    },
    "metadata": "弹出堆顶节点: 4"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 4,
      "id": "node14",
      "list_name": "mergedList"
    },
    "metadata": "合并节点: 4"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "id": "node5"
    },
    "metadata": "处理完成节点: 4"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node2"
    },
    "metadata": "弹出堆顶节点: 5"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 5,
      "id": "node15",
      "list_name": "mergedList"
    },
    "metadata": "合并节点: 5"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "id": "node2"
    },
    "metadata": "处理完成节点: 5"
  },
  {
    "operation": "highlight_node",
    "data": {
      "id": "node7"
    },
    "metadata": "弹出堆顶节点: 6"
  },
  {
    "operation": "append_node",
    "data": {
      "value": 6,
      "id": "node16",
      "list_name": "mergedList"
    },
    "metadata": "合并节点: 6"
  },
  {
    "operation": "unhighlight_node",
    "data": {
      "id": "node7"
    },
    "metadata": "处理完成节点: 6"
  }
];