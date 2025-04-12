// 链表模型
const LinkedListModel = {
    // 数据存储
    lists: {}, // 格式: {listName: headNode}
    nodes: {}, // 格式: {nodeId: nodeObject}
    
    // 创建链表
    createList(listName, value, id) {
        // 创建链表节点
        const newNode = {
            id: id,
            value: value,
            next: null
        };
        
        // 添加到节点字典
        this.nodes[id] = newNode;
        
        // 将链表添加到链表字典中
        this.lists[listName] = newNode;
        
        return newNode;
    },
    
    // 在链表尾部添加节点
    appendNode(listName, value, id) {
        // 创建新节点
        const newNode = {
            id: id,
            value: value,
            next: null
        };
        
        // 添加到节点字典
        this.nodes[id] = newNode;
        
        // 获取目标链表
        let currentList = this.lists[listName];
        
        // 如果链表为空，则新节点成为头节点
        if (!currentList) {
            this.lists[listName] = newNode;
        } else {
            // 找到链表的最后一个节点
            let lastNode = currentList;
            while (lastNode.next) {
                lastNode = lastNode.next;
            }
            
            // 将新节点连接到最后一个节点
            lastNode.next = newNode;
        }
        
        return newNode;
    },
    
    // 在链表头部添加节点
    prependNode(listName, value, id) {
        // 获取目标链表
        const currentList = this.lists[listName];
        
        // 创建新节点
        const newNode = {
            id: id,
            value: value,
            next: currentList // 指向当前的头节点
        };
        
        // 添加到节点字典
        this.nodes[id] = newNode;
        
        // 新节点成为头节点
        this.lists[listName] = newNode;
        
        return newNode;
    },
    
    // 在指定节点后插入新节点
    insertAfter(targetId, value, id, listName) {
        const targetNode = this.nodes[targetId];
        
        if (!targetNode) {
            throw new Error(`目标节点 ${targetId} 不存在`);
        }
        
        // 创建新节点
        const newNode = {
            id: id,
            value: value,
            next: targetNode.next // 指向目标节点的下一个节点
        };
        
        // 添加到节点字典
        this.nodes[id] = newNode;
        
        // 目标节点指向新节点
        targetNode.next = newNode;
        
        return newNode;
    },
    
    // 在指定节点前插入新节点
    insertBefore(targetId, value, id, listName) {
        const targetNode = this.nodes[targetId];
        
        if (!targetNode) {
            throw new Error(`目标节点 ${targetId} 不存在`);
        }
        
        // 创建新节点
        const newNode = {
            id: id,
            value: value,
            next: targetNode // 指向目标节点
        };
        
        // 添加到节点字典
        this.nodes[id] = newNode;
        
        // 查找目标节点所在的链表
        let foundList = null;
        for (const listKey in this.lists) {
            if (Utils.isNodeInList(targetNode.id, this.lists[listKey])) {
                foundList = listKey;
                break;
            }
        }
        
        if (!foundList) {
            throw new Error(`未找到包含目标节点 ${targetId} 的链表`);
        }
        
        // 找到指向目标节点的节点
        let prevNode = null;
        let current = this.lists[foundList];
        
        while (current && current.id !== targetNode.id) {
            prevNode = current;
            current = current.next;
        }
        
        if (prevNode) {
            // 将前一个节点指向新节点
            prevNode.next = newNode;
        } else {
            // 如果目标节点是头节点，则新节点成为头节点
            this.lists[foundList] = newNode;
        }
        
        return newNode;
    },
    
    // 删除节点
    removeNode(nodeId, listName) {
        const nodeToRemove = this.nodes[nodeId];
        
        if (!nodeToRemove) {
            throw new Error(`节点 ${nodeId} 不存在`);
        }
        
        // 查找目标节点所在的链表
        let foundList = listName;
        if (!foundList) {
            for (const listKey in this.lists) {
                if (Utils.isNodeInList(nodeId, this.lists[listKey])) {
                    foundList = listKey;
                    break;
                }
            }
        }
        
        if (!foundList) {
            throw new Error(`未找到包含节点 ${nodeId} 的链表`);
        }
        
        // 找到指向目标节点的节点
        let prevNode = null;
        let current = this.lists[foundList];
        
        while (current && current.id !== nodeId) {
            prevNode = current;
            current = current.next;
        }
        
        if (prevNode) {
            // 将前一个节点指向目标节点的下一个节点
            prevNode.next = nodeToRemove.next;
        } else {
            // 如果目标节点是头节点，则将头节点指向下一个节点
            this.lists[foundList] = nodeToRemove.next;
        }
        
        // 从节点字典中删除目标节点
        delete this.nodes[nodeId];
        
        return true;
    },
    
    // 反转链表
    reverseList(listName) {
        const head = this.lists[listName];
        if (!head || !head.next) {
            // 空链表或只有一个节点，无需反转
            return head;
        }
        
        let prev = null;
        let current = head;
        let next = null;
        
        while (current) {
            // 保存下一个节点
            next = current.next;
            
            // 反转当前节点的指向
            current.next = prev;
            
            // 移动指针
            prev = current;
            current = next;
        }
        
        // 更新链表头节点
        this.lists[listName] = prev;
        
        return prev;
    },
    
    // 合并两个链表
    mergeLists(list1Name, list2Name, newListName) {
        // 获取链表头节点
        const list1Head = this.lists[list1Name];
        const list2Head = this.lists[list2Name];
        
        if (!list1Head || !list2Head) {
            throw new Error(`链表 ${list1Name} 或 ${list2Name} 不存在`);
        }
        
        // 找到第一个链表的尾节点
        let current = list1Head;
        while (current.next) {
            current = current.next;
        }
        
        // 将第二个链表连接到第一个链表的尾部
        current.next = list2Head;
        
        // 创建合并后的新链表
        this.lists[newListName] = list1Head;
        
        // 删除原始链表
        delete this.lists[list1Name];
        delete this.lists[list2Name];
        
        return this.lists[newListName];
    },
    
    // 拆分链表
    splitList(listName, splitAfterId, newListId) {
        // 获取链表头节点
        let head = this.lists[listName];
        
        if (!head) {
            throw new Error(`链表 ${listName} 为空或不存在`);
        }
        
        // 找到分割点
        const splitNode = this.nodes[splitAfterId];
        if (!splitNode) {
            throw new Error(`分割节点 ${splitAfterId} 不存在`);
        }
        
        // 检查节点是否在指定链表中
        if (!Utils.isNodeInList(splitAfterId, head)) {
            throw new Error(`在链表 ${listName} 中未找到分割节点 ${splitAfterId}`);
        }
        
        // 找到分割点
        let current = head;
        while (current && current.id !== splitAfterId) {
            current = current.next;
        }
        
        // 确保我们找到了分割点
        if (!current) {
            throw new Error(`未能找到分割节点 ${splitAfterId}`);
        }
        
        // 第二个链表从分割点的下一个节点开始
        const secondHead = current.next;
        // 切断第一个链表与第二个链表的连接
        current.next = null;
        
        // 创建新链表
        this.lists[newListId] = secondHead;
        
        return {
            firstList: head,
            secondList: secondHead
        };
    },
    
    // 更新节点值
    updateValue(nodeId, newValue) {
        const node = this.nodes[nodeId];
        
        if (!node) {
            throw new Error(`节点 ${nodeId} 不存在`);
        }
        
        node.value = newValue;
        return node;
    },
    
    // 交换两个节点的值
    swapNodes(id1, id2) {
        const node1 = this.nodes[id1];
        const node2 = this.nodes[id2];
        
        if (!node1 || !node2) {
            throw new Error(`节点 ${id1} 或 ${id2} 不存在`);
        }
        
        // 交换节点值
        [node1.value, node2.value] = [node2.value, node1.value];
        
        return { node1, node2 };
    }
};
