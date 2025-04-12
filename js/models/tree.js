// 树模型
const TreeModel = {
    // 数据存储
    trees: {},        // 存储所有树 {treeName: rootNode}
    nodes: {},        // 节点字典，用于快速查找 {nodeId: nodeObject}
    
    // 创建根节点
    createRoot(treeName, value, id) {
        // 创建树节点
        const newNode = {
            id: id,
            value: value,
            children: []
        };
        
        // 添加到节点字典
        this.nodes[id] = newNode;
        
        // 将树添加到树字典中
        this.trees[treeName] = newNode;
        
        return newNode;
    },
    
    // 添加子节点
    addChild(parentId, value, id) {
        const parentNode = this.nodes[parentId];
        
        if (!parentNode) {
            throw new Error(`父节点 ${parentId} 不存在`);
        }
        
        // 创建新节点
        const newNode = {
            id: id,
            value: value,
            children: []
        };
        
        // 添加到父节点的子节点列表
        if (!parentNode.children) {
            parentNode.children = [];
        }
        parentNode.children.push(newNode);
        
        // 添加到节点字典
        this.nodes[id] = newNode;
        
        return newNode;
    },
    
    // 删除节点
    removeNode(nodeId, treeName) {
        const nodeToRemove = this.nodes[nodeId];
        
        if (!nodeToRemove) {
            throw new Error(`节点 ${nodeId} 不存在`);
        }
        
        // 找到父节点
        let parent = Utils.findParent(this.trees[treeName], nodeId);
        
        if (parent) {
            // 从父节点的子节点列表中移除
            parent.children = parent.children.filter(child => child.id !== nodeId);
            
            // 处理子节点
            if (nodeToRemove.children && nodeToRemove.children.length > 0) {
                // 将子节点添加到父节点
                parent.children = parent.children.concat(nodeToRemove.children);
            }
        } else if (nodeId === this.trees[treeName].id) {
            // 如果删除的是根节点
            if (nodeToRemove.children && nodeToRemove.children.length > 0) {
                // 使第一个子节点成为新的根节点
                this.trees[treeName] = nodeToRemove.children[0];
                
                // 如果有其他子节点，将它们添加为新根的子节点
                if (nodeToRemove.children.length > 1) {
                    if (!this.trees[treeName].children) {
                        this.trees[treeName].children = [];
                    }
                    this.trees[treeName].children = this.trees[treeName].children.concat(
                        nodeToRemove.children.slice(1)
                    );
                }
            } else {
                // 如果根节点没有子节点，则树为空
                this.trees[treeName] = null;
            }
        }
        
        // 从节点字典中删除
        delete this.nodes[nodeId];
        
        return true;
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
    
    // 获取节点
    getNode(nodeId) {
        return this.nodes[nodeId];
    },
    
    // 获取树
    getTree(treeName) {
        return this.trees[treeName];
    },
    
    // 遍历树（前序）
    traversePreOrder(treeRoot, callback) {
        if (!treeRoot) return;
        
        // 处理当前节点
        callback(treeRoot);
        
        // 处理子节点
        if (treeRoot.children) {
            for (const child of treeRoot.children) {
                this.traversePreOrder(child, callback);
            }
        }
    },
    
    // 遍历树（后序）
    traversePostOrder(treeRoot, callback) {
        if (!treeRoot) return;
        
        // 处理子节点
        if (treeRoot.children) {
            for (const child of treeRoot.children) {
                this.traversePostOrder(child, callback);
            }
        }
        
        // 处理当前节点
        callback(treeRoot);
    },
    
    // 遍历树（层次）
    traverseLevelOrder(treeRoot, callback) {
        if (!treeRoot) return;
        
        const queue = [treeRoot];
        
        while (queue.length > 0) {
            const current = queue.shift();
            
            // 处理当前节点
            callback(current);
            
            // 将子节点加入队列
            if (current.children) {
                for (const child of current.children) {
                    queue.push(child);
                }
            }
        }
    },
    
    // 计算树的高度
    getHeight(node = null) {
        if (!node) return 0;
        
        let maxHeight = 0;
        
        // 遍历所有子节点，找到最大高度
        if (node.children) {
            for (const child of node.children) {
                const height = this.getHeight(child);
                maxHeight = Math.max(maxHeight, height);
            }
        }
        
        return maxHeight + 1;
    }
};
