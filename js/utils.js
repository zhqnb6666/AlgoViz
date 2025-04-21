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
    },
    
    // 二维数组相关工具
    
    // 创建一个填充了特定值的二维数组
    create2DArray: (rows, cols, defaultValue = 0) => {
        return Array(rows).fill().map(() => Array(cols).fill(defaultValue));
    },
    
    // 检查位置是否在二维数组范围内
    isPositionInRange: (position, rows, cols) => {
        return position.row >= 0 && position.row < rows && 
               position.col >= 0 && position.col < cols;
    },
    
    // 对二维数组进行深拷贝
    deepCopy2DArray: (array) => {
        return JSON.parse(JSON.stringify(array));
    },
    
    // 转置二维数组
    transpose2DArray: (array) => {
        if (!array.length) return [];
        return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
    },
    
    // 提取二维数组的子矩阵
    getSubMatrix: (array, startRow, startCol, endRow, endCol) => {
        const result = [];
        for (let i = startRow; i <= endRow; i++) {
            const row = [];
            for (let j = startCol; j <= endCol; j++) {
                row.push(array[i][j]);
            }
            result.push(row);
        }
        return result;
    }
}; 