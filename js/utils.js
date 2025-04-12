// 工具函数集合
const Utils = {
    // 延迟函数 - 根据动画速度返回Promise
    delay: (ms, animationSpeed) => {
        return new Promise(resolve => setTimeout(resolve, ms / animationSpeed));
    },

    // 防抖函数
    debounce: (fn, ms = 300) => {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn.apply(this, args), ms);
        };
    },

    // 查找节点是否在链表中
    isNodeInList: (nodeId, list) => {
        let current = list;
        while (current) {
            if (current.id === nodeId) {
                return true;
            }
            current = current.next;
        }
        return false;
    },

    // 查找节点的父节点（树）
    findParent: (node, childId) => {
        if (!node || !node.children) return null;
        
        for (const child of node.children) {
            if (child.id === childId) {
                return node;
            }
            
            const parent = Utils.findParent(child, childId);
            if (parent) return parent;
        }
        
        return null;
    },

    // 生成唯一ID
    generateId: (prefix = 'node') => {
        return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    }
}; 