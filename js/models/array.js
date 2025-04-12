// 数组模型
const ArrayModel = {
    // 数据存储
    data: {}, // 格式: {arrayId: [数组数据]}
    highlighted: {}, // 格式: {arrayId: [高亮索引]}
    highlightColors: {}, // 格式: {arrayId: {索引: 颜色}}
    elementIndices: {}, // 格式: {arrayId: {值: 索引}}
    
    // 初始化数组
    init(arrayId = 'default') {
        if (!this.data[arrayId]) {
            this.data[arrayId] = [];
        }
        
        if (!this.highlighted[arrayId]) {
            this.highlighted[arrayId] = [];
        }
        
        if (!this.highlightColors[arrayId]) {
            this.highlightColors[arrayId] = {};
        }
        
        if (!this.elementIndices[arrayId]) {
            this.elementIndices[arrayId] = {};
        }
    },
    
    // 创建数组
    create(arrayId, arrayData) {
        this.init(arrayId);
        this.data[arrayId] = [...arrayData];
        this.highlighted[arrayId] = [];
        this.highlightColors[arrayId] = {};
        this.updateElementIndices(arrayId);
        return this.data[arrayId];
    },
    
    // 获取数组数据
    get(arrayId = 'default') {
        return this.data[arrayId] || [];
    },
    
    // 交换数组元素
    swap(arrayId, i, j) {
        this.init(arrayId);
        const array = this.data[arrayId];
        
        if (i < 0 || j < 0 || i >= array.length || j >= array.length) {
            throw new Error(`交换位置索引超出范围: ${i}, ${j}`);
        }
        
        // 交换元素
        [array[i], array[j]] = [array[j], array[i]];
        
        // 更新元素索引
        this.updateElementIndices(arrayId);
        
        // 更新高亮状态
        this.updateHighlightAfterSwap(arrayId, i, j);
        
        return array;
    },
    
    // 高亮元素
    highlight(arrayId, indices, color = CONFIG.visualization.array.defaultHighlightColor) {
        this.init(arrayId);
        
        // 更新高亮状态
        this.highlighted[arrayId] = [...new Set([...this.highlighted[arrayId], ...indices])];
        
        // 更新高亮颜色
        indices.forEach(idx => {
            this.highlightColors[arrayId][idx] = color;
        });
        
        return {
            highlighted: this.highlighted[arrayId],
            colors: this.highlightColors[arrayId]
        };
    },
    
    // 取消高亮
    unhighlight(arrayId, indices) {
        this.init(arrayId);
        
        // 移除高亮状态
        this.highlighted[arrayId] = this.highlighted[arrayId].filter(idx => !indices.includes(idx));
        
        // 移除颜色映射
        indices.forEach(idx => {
            delete this.highlightColors[arrayId][idx];
        });
        
        return {
            highlighted: this.highlighted[arrayId],
            colors: this.highlightColors[arrayId]
        };
    },
    
    // 更新元素索引映射
    updateElementIndices(arrayId) {
        this.init(arrayId);
        const array = this.data[arrayId];
        
        this.elementIndices[arrayId] = {};
        array.forEach((value, index) => {
            this.elementIndices[arrayId][value] = index;
        });
    },
    
    // 在交换后更新高亮状态
    updateHighlightAfterSwap(arrayId, i, j) {
        this.init(arrayId);
        
        if (this.highlighted[arrayId] && 
            (this.highlighted[arrayId].includes(i) || this.highlighted[arrayId].includes(j))) {
                
            const newHighlighted = [...this.highlighted[arrayId]];
            const newColors = {...this.highlightColors[arrayId] || {}};
            
            // 保存原始高亮状态和颜色
            const iHighlighted = newHighlighted.includes(i);
            const jHighlighted = newHighlighted.includes(j);
            const iColor = newColors[i];
            const jColor = newColors[j];
            
            // 如果i原本高亮，现在j应该高亮
            if (iHighlighted) {
                if (!newHighlighted.includes(j)) {
                    newHighlighted.push(j);
                }
                newColors[j] = iColor;
            } else {
                // 如果i原本不高亮，从高亮列表中移除j
                const jIndex = newHighlighted.indexOf(j);
                if (jIndex > -1) {
                    newHighlighted.splice(jIndex, 1);
                }
                delete newColors[j];
            }
            
            // 如果j原本高亮，现在i应该高亮
            if (jHighlighted) {
                if (!newHighlighted.includes(i)) {
                    newHighlighted.push(i);
                }
                newColors[i] = jColor;
            } else {
                // 如果j原本不高亮，从高亮列表中移除i
                const iIndex = newHighlighted.indexOf(i);
                if (iIndex > -1) {
                    newHighlighted.splice(iIndex, 1);
                }
                delete newColors[i];
            }
            
            this.highlighted[arrayId] = newHighlighted;
            this.highlightColors[arrayId] = newColors;
        }
    }
}; 