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
    
    // 更新单个元素
    updateElement(arrayId, index, value) {
        this.init(arrayId);
        const array = this.data[arrayId];
        
        if (index < 0 || index >= array.length) {
            throw new Error(`更新元素索引超出范围: ${index}`);
        }
        
        // 更新元素值
        array[index] = value;
        
        // 更新元素索引映射
        this.updateElementIndices(arrayId);
        
        return array;
    },
    
    // 批量更新多个元素
    updateElements(arrayId, updates) {
        this.init(arrayId);
        const array = this.data[arrayId];
        
        // 更新多个元素值
        updates.forEach(update => {
            const { index, value } = update;
            if (index < 0 || index >= array.length) {
                throw new Error(`更新元素索引超出范围: ${index}`);
            }
            array[index] = value;
        });
        
        // 更新元素索引映射
        this.updateElementIndices(arrayId);
        
        return array;
    },
    
    // 更新整个数组
    updateArray(arrayId, newArray) {
        this.init(arrayId);
        
        // 更新整个数组
        this.data[arrayId] = [...newArray];
        
        // 清除高亮状态，因为索引可能已经完全改变
        this.highlighted[arrayId] = [];
        this.highlightColors[arrayId] = {};
        
        // 更新元素索引映射
        this.updateElementIndices(arrayId);
        
        return this.data[arrayId];
    },
    
    // 在指定位置插入元素
    insertElement(arrayId, index, value) {
        this.init(arrayId);
        const array = this.data[arrayId];
        
        if (index < 0 || index > array.length) {
            throw new Error(`插入位置索引超出范围: ${index}`);
        }
        
        // 插入元素
        array.splice(index, 0, value);
        
        // 更新高亮状态：如果插入位置之后有高亮的元素，需要调整它们的索引
        if (this.highlighted[arrayId].length > 0) {
            // 调整高亮索引
            this.highlighted[arrayId] = this.highlighted[arrayId].map(idx => {
                if (idx >= index) return idx + 1;
                return idx;
            });
            
            // 调整高亮颜色索引
            const newColors = {};
            for (const [idx, color] of Object.entries(this.highlightColors[arrayId])) {
                const numIdx = parseInt(idx, 10);
                if (numIdx >= index) {
                    newColors[numIdx + 1] = color;
                } else {
                    newColors[idx] = color;
                }
            }
            this.highlightColors[arrayId] = newColors;
        }
        
        // 更新元素索引映射
        this.updateElementIndices(arrayId);
        
        return array;
    },
    
    // 删除指定位置的元素
    removeElement(arrayId, index) {
        this.init(arrayId);
        const array = this.data[arrayId];
        
        if (index < 0 || index >= array.length) {
            throw new Error(`删除元素索引超出范围: ${index}`);
        }
        
        // 删除元素
        const removedElement = array.splice(index, 1)[0];
        
        // 更新高亮状态：删除对应的高亮，并调整后续索引
        if (this.highlighted[arrayId].length > 0) {
            // 移除被删除位置的高亮
            this.highlighted[arrayId] = this.highlighted[arrayId].filter(idx => idx !== index);
            
            // 调整高亮索引
            this.highlighted[arrayId] = this.highlighted[arrayId].map(idx => {
                if (idx > index) return idx - 1;
                return idx;
            });
            
            // 删除对应位置的高亮颜色
            delete this.highlightColors[arrayId][index];
            
            // 调整高亮颜色索引
            const newColors = {};
            for (const [idx, color] of Object.entries(this.highlightColors[arrayId])) {
                const numIdx = parseInt(idx, 10);
                if (numIdx > index) {
                    newColors[numIdx - 1] = color;
                } else if (numIdx < index) {
                    newColors[idx] = color;
                }
            }
            this.highlightColors[arrayId] = newColors;
        }
        
        // 更新元素索引映射
        this.updateElementIndices(arrayId);
        
        return removedElement;
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