const defaultOperations =[
     // 数组操作
     {
         "operation": "create_array",
         "data": {
             "id": "arr1",
             "array": [5, 3, 8, 1, 9, 6, 2]
         },
         "metadata": "创建数组 [5, 3, 8, 1, 9, 6, 2]"
     },
     {
         "operation": "highlight",
         "data": {
             "id": "arr1",
             "indices": [0, 2, 4],
             "color": "#FF9999"
         },
         "metadata": "高亮数组元素 0, 2, 4 (值 5, 8, 9)"
     },
     {
         "operation": "swap_elements",
         "data": {
             "id": "arr1",
             "indices": [1, 5]
         },
         "metadata": "交换数组元素位置 1 和 5 (值 3 和 6)"
     },
     {
         "operation": "unhighlight",
         "data": {
             "id": "arr1",
             "indices": [2]
         },
         "metadata": "取消高亮数组元素 2 (值 8)"
     },

     // 链表操作 - 第一个链表
     {
         "operation": "create_list",
         "data": {
             "value": 10,
             "id": "node0",
             "clear_visual": true,
             "list_name": "linkedList"
         },
         "metadata": "创建值为10的链表头节点"
     },
     {
         "operation": "append_node",
         "data": {
             "value": 7,
             "id": "node1",
             "list_name": "linkedList"
         },
         "metadata": "在链表尾部添加值为7的新节点"
     },
     {
         "operation": "highlight_link",
         "data": {
             "source_id": "node0",
             "target_id": "node1"
         },
         "metadata": "高亮从node0到node1的连接"
     },
     {
         "operation": "unhighlight_link",
         "data": {
             "source_id": "node0",
             "target_id": "node1"
         },
         "metadata": "取消高亮从node0到node1的连接"
     },
     {
         "operation": "prepend_node",
         "data": {
             "value": 5,
             "id": "node2",
             "list_name": "linkedList"
         },
         "metadata": "在链表头部添加值为5的新节点"
     },
     {
         "operation": "highlight_node",
         "data": {
             "id": "node1"
         },
         "metadata": "高亮node1节点"
     },
     {
         "operation": "insert_after",
         "data": {
             "target_id": "node1",
             "value": 8,
             "id": "node3",
             "list_name": "linkedList"
         },
         "metadata": "在node1后插入值为8的新节点"
     },
     {
         "operation": "unhighlight_node",
         "data": {
             "id": "node1"
         },
         "metadata": "取消高亮node1节点"
     },
     {
         "operation": "highlight_node",
         "data": {
             "id": "node1"
         },
         "metadata": "高亮node1节点"
     },
     {
         "operation": "insert_before",
         "data": {
             "target_id": "node1",
             "value": 6,
             "id": "node4",
             "list_name": "linkedList"
         },
         "metadata": "在node1前插入值为6的新节点"
     },
     {
         "operation": "unhighlight_node",
         "data": {
             "id": "node1"
         },
         "metadata": "取消高亮node1节点"
     },
     {
         "operation": "highlight_node",
         "data": {
             "id": "node1"
         },
         "metadata": "高亮node1节点"
     },
     {
         "operation": "remove_node",
         "data": {
             "id": "node1",
             "list_name": "linkedList"
         },
         "metadata": "删除ID为node1的节点"
     },
     {
         "operation": "update_value",
         "data": {
             "id": "node4",
             "value": 15
         },
         "metadata": "将node4的值更新为15"
     },
     {
         "operation": "reverse_list",
         "data": {
             "list_name": "linkedList"
         },
         "metadata": "反转第一个链表"
     },

     // 创建第二个链表
     {
         "operation": "create_list",
         "data": {
             "value": 20,
             "id": "node01",
             "list_name": "secondLinkedList"
         },
         "metadata": "创建第二个链表，值为20的头节点"
     },
     {
         "operation": "append_node",
         "data": {
             "value": 25,
             "id": "node02",
             "list_name": "secondLinkedList"
         },
         "metadata": "在第二个链表尾部添加值为25的新节点"
     },
     {
         "operation": "append_node",
         "data": {
             "value": 30,
             "id": "node03",
             "list_name": "secondLinkedList"
         },
         "metadata": "在第二个链表尾部添加值为30的新节点"
     },

     // 合并链表
     {
         "operation": "merge_lists",
         "data": {
             "list1_name": "linkedList",
             "list2_name": "secondLinkedList",
             "new_list_id": "mergedList"
         },
         "metadata": "合并两个链表到新链表"
     },

     // 继续在合并后的链表上操作
     {
         "operation": "highlight_node",
         "data": {
             "id": "node3"
         },
         "metadata": "高亮node3节点"
     },
     {
         "operation": "highlight_node",
         "data": {
             "id": "node02"
         },
         "metadata": "高亮node02节点"
     },
     {
         "operation": "unhighlight_node",
         "data": {
             "id": "node3"
         },
         "metadata": "取消高亮node3节点"
     },
     {
         "operation": "unhighlight_node",
         "data": {
             "id": "node02"
         },
         "metadata": "取消高亮node02节点"
     },
     {
         "operation": "swap_nodes",
         "data": {
             "id1": "node2",
             "id2": "node03"
         },
         "metadata": "交换node2和node03节点"
     },

     // 创建第三个链表
     {
         "operation": "create_list",
         "data": {
             "value": 100,
             "id": "node100",
             "list_name": "thirdList"
         },
         "metadata": "创建第三个链表，值为100的头节点"
     },
     {
         "operation": "append_node",
         "data": {
             "value": 200,
             "id": "node200",
             "list_name": "thirdList"
         },
         "metadata": "在第三个链表尾部添加值为200的新节点"
     },

     // 拆分合并后的链表
     {
         "operation": "highlight_node",
         "data": {
             "id": "node4"
         },
         "metadata": "高亮node4节点"
     },
     {
         "operation": "split_list",
         "data": {
             "list_name": "mergedList",
             "split_after_id": "node4",
             "new_list_id": "splitList"
         },
         "metadata": "在node4之后拆分合并链表"
     },
     {
         "operation": "unhighlight_node",
         "data": {
             "id": "node4"
         },
         "metadata": "取消高亮node4节点"
     },

     // 再次合并链表展示多次合并
     {
         "operation": "merge_lists",
         "data": {
             "list1_name": "thirdList",
             "list2_name": "mergedList",
             "new_list_id": "finalList"
         },
         "metadata": "将第三个链表与拆分后的第一个链表合并"
     },

     // 树操作
     {
         "operation": "create_root",
         "data": {
             "tree_name": "binaryTree",
             "id": "root1",
             "value": 50,
             "clear_visual": true
         },
         "metadata": "创建值为50的树根节点"
     },
     {
         "operation": "add_child",
         "data": {
             "parent_id": "root1",
             "id": "node11",
             "value": 30
         },
         "metadata": "添加值为30的左子节点"
     },
     {
         "operation": "add_child",
         "data": {
             "parent_id": "root1",
             "id": "node12",
             "value": 70
         },
         "metadata": "添加值为70的右子节点"
     },
     {
         "operation": "add_child",
         "data": {
             "parent_id": "node11",
             "id": "node21",
             "value": 20
         },
         "metadata": "添加值为20的子节点"
     },
     {
         "operation": "add_child",
         "data": {
             "parent_id": "node11",
             "id": "node22",
             "value": 40
         },
         "metadata": "添加值为40的子节点"
     },
     {
         "operation": "highlight_tree_node",
         "data": {
             "id": "node11"
         },
         "metadata": "高亮节点node11"
     },
     {
         "operation": "unhighlight_tree_node",
         "data": {
             "id": "node11"
         },
         "metadata": "取消高亮节点node11"
     }
 ];

