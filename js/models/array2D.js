// 二维数组模型
const Array2DModel = {
    // 数据存储
    data: {}, // 格式: {arrayId: [[行1], [行2], ...]}
    highlighted: {}, // 格式: {arrayId: [{row: 行索引, col: 列索引}, ...]}
    highlightColors: {}, // 格式: {arrayId: {`${row}-${col}`: 颜色}}
    
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
    },
    
    // 获取二维数组的行数和列数
    getDimensions(arrayId) {
        this.init(arrayId);
        const array = this.data[arrayId];
        
        if (array.length === 0) {
            return { rows: 0, cols: 0 };
        }
        
        return {
            rows: array.length,
            cols: array[0].length
        };
    },
    
    // 创建二维数组
    create(arrayId, arrayData) {
        this.init(arrayId);
        this.data[arrayId] = JSON.parse(JSON.stringify(arrayData)); // 深拷贝
        this.highlighted[arrayId] = [];
        this.highlightColors[arrayId] = {};
        return this.data[arrayId];
    },
    
    // 获取数组数据
    get(arrayId = 'default') {
        return this.data[arrayId] || [];
    },     
    
    // 验证位置是否有效
    _validatePosition(arrayId, row, col) {
        const dimensions = this.getDimensions(arrayId);
        if (row < 0 || row >= dimensions.rows || col < 0 || col >= dimensions.cols) {
            throw new Error(`位置索引超出范围: (${row}, ${col})`);
        }
    },
    // 交换元素
    swapElements(arrayId, pos1, pos2) {
        this.init(arrayId);
        this._validatePosition(arrayId, pos1.row, pos1.col);
        this._validatePosition(arrayId, pos2.row, pos2.col);
        // 交换元素
        [this.data[arrayId][pos1.row][pos1.col], this.data[arrayId][pos2.row][pos2.col]] =
            [this.data[arrayId][pos2.row][pos2.col], this.data[arrayId][pos1.row][pos1.col]];
        this._updateHighlightAfterElementSwap(arrayId, pos1, pos2);
        
        return this.data[arrayId];
    },
    
    // 高亮元素
    highlightElement(arrayId, position, color = CONFIG.visualization.array.defaultHighlightColor) {
        this.init(arrayId);
        this._validatePosition(arrayId, position.row, position.col);
        
        // 创建位置的标识
        const posKey = `${position.row}-${position.col}`;
        
        // 如果该位置还没有高亮，添加到高亮列表
        const existingIndex = this.highlighted[arrayId].findIndex(
            pos => pos.row === position.row && pos.col === position.col
        );
        
        if (existingIndex === -1) {
            this.highlighted[arrayId].push({...position});
        }
        
        // 更新高亮颜色
        this.highlightColors[arrayId][posKey] = color;
        
        return {
            highlighted: this.highlighted[arrayId],
            colors: this.highlightColors[arrayId]
        };
    },
    
    // 高亮多个元素
    highlightElements(arrayId, positions, color = CONFIG.visualization.array.defaultHighlightColor) {
        this.init(arrayId);
        
        // 更新高亮状态和颜色
        positions.forEach(position => {
            this.highlightElement(arrayId, position, color);
        });
        
        return {
            highlighted: this.highlighted[arrayId],
            colors: this.highlightColors[arrayId]
        };
    },
    
    // 取消高亮元素
    unhighlightElement(arrayId, position) {
        this.init(arrayId);
        
        // 从高亮列表中移除该位置
        this.highlighted[arrayId] = this.highlighted[arrayId].filter(
            pos => !(pos.row === position.row && pos.col === position.col)
        );
        
        // 移除颜色映射
        delete this.highlightColors[arrayId][`${position.row}-${position.col}`];
        
        return {
            highlighted: this.highlighted[arrayId],
            colors: this.highlightColors[arrayId]
        };
    },
    
    // 取消高亮多个元素
    unhighlightElements(arrayId, positions) {
        this.init(arrayId);
        
        positions.forEach(position => {
            this.unhighlightElement(arrayId, position);
        });
        
        return {
            highlighted: this.highlighted[arrayId],
            colors: this.highlightColors[arrayId]
        };
    },
    
    // 高亮整行
    highlightRow(arrayId, row, color = CONFIG.visualization.array.defaultHighlightColor) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        if (row < 0 || row >= dimensions.rows) {
            throw new Error(`行索引超出范围: ${row}`);
        }
        
        // 为该行的每个元素高亮
        const positions = [];
        for (let col = 0; col < dimensions.cols; col++) {
            positions.push({ row, col });
        }
        
        return this.highlightElements(arrayId, positions, color);
    },
    
    // 取消高亮整行
    unhighlightRow(arrayId, row) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        if (row < 0 || row >= dimensions.rows) {
            throw new Error(`行索引超出范围: ${row}`);
        }
        
        // 为该行的每个元素取消高亮
        const positions = [];
        for (let col = 0; col < dimensions.cols; col++) {
            positions.push({ row, col });
        }
        
        return this.unhighlightElements(arrayId, positions);
    },
    
    // 高亮整列
    highlightColumn(arrayId, col, color = CONFIG.visualization.array.defaultHighlightColor) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        if (col < 0 || col >= dimensions.cols) {
            throw new Error(`列索引超出范围: ${col}`);
        }
        
        // 为该列的每个元素高亮
        const positions = [];
        for (let row = 0; row < dimensions.rows; row++) {
            positions.push({ row, col });
        }
        
        return this.highlightElements(arrayId, positions, color);
    },
    
    // 取消高亮整列
    unhighlightColumn(arrayId, col) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        if (col < 0 || col >= dimensions.cols) {
            throw new Error(`列索引超出范围: ${col}`);
        }
        
        // 为该列的每个元素取消高亮
        const positions = [];
        for (let row = 0; row < dimensions.rows; row++) {
            positions.push({ row, col });
        }
        
        return this.unhighlightElements(arrayId, positions);
    },
    
    // 更新元素值
    updateElement(arrayId, position, value) {
        this.init(arrayId);
        this._validatePosition(arrayId, position.row, position.col);
        
        // 更新元素值
        this.data[arrayId][position.row][position.col] = value;
        
        return this.data[arrayId];
    },
    
    // 交换行
    swapRows(arrayId, row1, row2) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        if (row1 < 0 || row2 < 0 || row1 >= dimensions.rows || row2 >= dimensions.rows) {
            throw new Error(`行索引超出范围: ${row1}, ${row2}`);
        }
        
        // 交换行
        [this.data[arrayId][row1], this.data[arrayId][row2]] = 
            [this.data[arrayId][row2], this.data[arrayId][row1]];
        
        // 更新高亮状态
        this._updateHighlightAfterRowSwap(arrayId, row1, row2);
        
        return this.data[arrayId];
    },
    
    // 交换列
    swapColumns(arrayId, col1, col2) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        if (col1 < 0 || col2 < 0 || col1 >= dimensions.cols || col2 >= dimensions.cols) {
            throw new Error(`列索引超出范围: ${col1}, ${col2}`);
        }
        
        // 交换每行中的相应列元素
        for (let row = 0; row < dimensions.rows; row++) {
            [this.data[arrayId][row][col1], this.data[arrayId][row][col2]] = 
                [this.data[arrayId][row][col2], this.data[arrayId][row][col1]];
        }
        
        // 更新高亮状态
        this._updateHighlightAfterColumnSwap(arrayId, col1, col2);
        
        return this.data[arrayId];
    },
    
    
    // 添加行
    addRow(arrayId, row, position = -1) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        // 检查行长度是否匹配
        if (dimensions.rows > 0 && row.length !== dimensions.cols) {
            throw new Error(`新行长度 ${row.length} 与数组列数 ${dimensions.cols} 不匹配`);
        }
        
        // 处理位置参数
        let insertPos = position;
        if (insertPos < 0 || insertPos > dimensions.rows) {
            insertPos = dimensions.rows; // 默认添加到末尾
        }
        
        // 插入新行
        this.data[arrayId].splice(insertPos, 0, [...row]);
        
        // 更新高亮状态 - 移动受影响行的高亮
        this._updateHighlightAfterRowInsert(arrayId, insertPos);
        
        return this.data[arrayId];
    },
    
    // 添加列
    addColumn(arrayId, column, position = -1) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        // 检查列长度是否匹配
        if (dimensions.rows > 0 && column.length !== dimensions.rows) {
            throw new Error(`新列长度 ${column.length} 与数组行数 ${dimensions.rows} 不匹配`);
        }
        
        // 处理位置参数
        let insertPos = position;
        if (insertPos < 0 || insertPos > dimensions.cols) {
            insertPos = dimensions.cols; // 默认添加到末尾
        }
        
        // 插入新列
        for (let row = 0; row < dimensions.rows; row++) {
            this.data[arrayId][row].splice(insertPos, 0, column[row]);
        }
        
        // 更新高亮状态 - 移动受影响列的高亮
        this._updateHighlightAfterColumnInsert(arrayId, insertPos);
        
        return this.data[arrayId];
    },
    
    // 删除行
    removeRow(arrayId, row) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        if (row < 0 || row >= dimensions.rows) {
            throw new Error(`行索引超出范围: ${row}`);
        }
        
        // 删除行
        this.data[arrayId].splice(row, 1);
        
        // 更新高亮状态
        this._updateHighlightAfterRowRemove(arrayId, row);
        
        return this.data[arrayId];
    },
    
    // 删除列
    removeColumn(arrayId, col) {
        this.init(arrayId);
        const dimensions = this.getDimensions(arrayId);
        
        if (col < 0 || col >= dimensions.cols) {
            throw new Error(`列索引超出范围: ${col}`);
        }
        
        // 删除每行中的相应列
        for (let row = 0; row < dimensions.rows; row++) {
            this.data[arrayId][row].splice(col, 1);
        }
        
        // 更新高亮状态
        this._updateHighlightAfterColumnRemove(arrayId, col);
        
        return this.data[arrayId];
    },
    
    
    // 交换元素后更新高亮状态
    _updateHighlightAfterElementSwap(arrayId, pos1, pos2) {
        const pos1Key = `${pos1.row}-${pos1.col}`;
        const pos2Key = `${pos2.row}-${pos2.col}`;
        
        // 查找高亮列表中的索引
        const pos1HighlightIndex = this.highlighted[arrayId].findIndex(
            pos => pos.row === pos1.row && pos.col === pos1.col
        );
        const pos2HighlightIndex = this.highlighted[arrayId].findIndex(
            pos => pos.row === pos2.row && pos.col === pos2.col
        );
        
        // 保存原始高亮状态和颜色
        const pos1Highlighted = pos1HighlightIndex !== -1;
        const pos2Highlighted = pos2HighlightIndex !== -1;
        const pos1Color = this.highlightColors[arrayId][pos1Key];
        const pos2Color = this.highlightColors[arrayId][pos2Key];
        
        // 交换高亮状态
        if (pos1Highlighted && !pos2Highlighted) {
            // 移除pos1的高亮
            this.highlighted[arrayId].splice(pos1HighlightIndex, 1);
            delete this.highlightColors[arrayId][pos1Key];
            
            // 添加pos2的高亮
            this.highlighted[arrayId].push({...pos2});
            this.highlightColors[arrayId][pos2Key] = pos1Color;
        } 
        else if (!pos1Highlighted && pos2Highlighted) {
            // 移除pos2的高亮
            this.highlighted[arrayId].splice(pos2HighlightIndex, 1);
            delete this.highlightColors[arrayId][pos2Key];
            
            // 添加pos1的高亮
            this.highlighted[arrayId].push({...pos1});
            this.highlightColors[arrayId][pos1Key] = pos2Color;
        }
        else if (pos1Highlighted && pos2Highlighted) {
            // 交换颜色
            this.highlightColors[arrayId][pos1Key] = pos2Color;
            this.highlightColors[arrayId][pos2Key] = pos1Color;
        }
    },
    
    // 交换行后更新高亮状态
    _updateHighlightAfterRowSwap(arrayId, row1, row2) {
        // 收集受影响的高亮索引
        const row1Highlights = [];
        const row2Highlights = [];
        const otherHighlights = [];
        
        // 分类高亮
        this.highlighted[arrayId].forEach((pos, index) => {
            if (pos.row === row1) {
                row1Highlights.push(index);
            } else if (pos.row === row2) {
                row2Highlights.push(index);
            } else {
                otherHighlights.push(index);
            }
        });
        
        // 更新高亮位置
        const newHighlighted = [...otherHighlights.map(idx => this.highlighted[arrayId][idx])];
        
        // 交换行高亮
        row1Highlights.forEach(idx => {
            const pos = {...this.highlighted[arrayId][idx]};
            pos.row = row2;
            newHighlighted.push(pos);
        });
        
        row2Highlights.forEach(idx => {
            const pos = {...this.highlighted[arrayId][idx]};
            pos.row = row1;
            newHighlighted.push(pos);
        });
        
        // 更新高亮颜色映射
        const newHighlightColors = {};
        Object.entries(this.highlightColors[arrayId]).forEach(([posKey, color]) => {
            const [posRow, posCol] = posKey.split('-').map(Number);
            let newRow = posRow;
            
            if (posRow === row1) {
                newRow = row2;
            } else if (posRow === row2) {
                newRow = row1;
            }
            
            newHighlightColors[`${newRow}-${posCol}`] = color;
        });
        
        // 更新状态
        this.highlighted[arrayId] = newHighlighted;
        this.highlightColors[arrayId] = newHighlightColors;
    },
    
    // 交换列后更新高亮状态
    _updateHighlightAfterColumnSwap(arrayId, col1, col2) {
        // 收集受影响的高亮索引
        const col1Highlights = [];
        const col2Highlights = [];
        const otherHighlights = [];
        
        // 分类高亮
        this.highlighted[arrayId].forEach((pos, index) => {
            if (pos.col === col1) {
                col1Highlights.push(index);
            } else if (pos.col === col2) {
                col2Highlights.push(index);
            } else {
                otherHighlights.push(index);
            }
        });
        
        // 更新高亮位置
        const newHighlighted = [...otherHighlights.map(idx => this.highlighted[arrayId][idx])];
        
        // 交换列高亮
        col1Highlights.forEach(idx => {
            const pos = {...this.highlighted[arrayId][idx]};
            pos.col = col2;
            newHighlighted.push(pos);
        });
        
        col2Highlights.forEach(idx => {
            const pos = {...this.highlighted[arrayId][idx]};
            pos.col = col1;
            newHighlighted.push(pos);
        });
        
        // 更新高亮颜色映射
        const newHighlightColors = {};
        Object.entries(this.highlightColors[arrayId]).forEach(([posKey, color]) => {
            const [posRow, posCol] = posKey.split('-').map(Number);
            let newCol = posCol;
            
            if (posCol === col1) {
                newCol = col2;
            } else if (posCol === col2) {
                newCol = col1;
            }
            
            newHighlightColors[`${posRow}-${newCol}`] = color;
        });
        
        // 更新状态
        this.highlighted[arrayId] = newHighlighted;
        this.highlightColors[arrayId] = newHighlightColors;
    },
    
    // 插入行后更新高亮状态
    _updateHighlightAfterRowInsert(arrayId, insertPos) {
        // 更新受影响行的高亮位置
        const newHighlighted = [];
        
        this.highlighted[arrayId].forEach(pos => {
            if (pos.row >= insertPos) {
                // 受影响的行索引+1
                newHighlighted.push({
                    row: pos.row + 1,
                    col: pos.col
                });
            } else {
                // 不受影响的行保持原位置
                newHighlighted.push({...pos});
            }
        });
        
        // 更新高亮颜色映射
        const newHighlightColors = {};
        Object.entries(this.highlightColors[arrayId]).forEach(([posKey, color]) => {
            const [posRow, posCol] = posKey.split('-').map(Number);
            let newRow = posRow;
            
            if (posRow >= insertPos) {
                newRow = posRow + 1;
            }
            
            newHighlightColors[`${newRow}-${posCol}`] = color;
        });
        
        // 更新状态
        this.highlighted[arrayId] = newHighlighted;
        this.highlightColors[arrayId] = newHighlightColors;
    },
    
    // 插入列后更新高亮状态
    _updateHighlightAfterColumnInsert(arrayId, insertPos) {
        // 更新受影响列的高亮位置
        const newHighlighted = [];
        
        this.highlighted[arrayId].forEach(pos => {
            if (pos.col >= insertPos) {
                // 受影响的列索引+1
                newHighlighted.push({
                    row: pos.row,
                    col: pos.col + 1
                });
            } else {
                // 不受影响的列保持原位置
                newHighlighted.push({...pos});
            }
        });
        
        // 更新高亮颜色映射
        const newHighlightColors = {};
        Object.entries(this.highlightColors[arrayId]).forEach(([posKey, color]) => {
            const [posRow, posCol] = posKey.split('-').map(Number);
            let newCol = posCol;
            
            if (posCol >= insertPos) {
                newCol = posCol + 1;
            }
            
            newHighlightColors[`${posRow}-${newCol}`] = color;
        });
        
        // 更新状态
        this.highlighted[arrayId] = newHighlighted;
        this.highlightColors[arrayId] = newHighlightColors;
    },
    
    // 删除行后更新高亮状态
    _updateHighlightAfterRowRemove(arrayId, removedRow) {
        // 更新高亮位置
        const newHighlighted = [];
        
        this.highlighted[arrayId].forEach(pos => {
            if (pos.row === removedRow) {
                // 忽略已删除行的高亮
                return;
            } else if (pos.row > removedRow) {
                // 受影响的行索引-1
                newHighlighted.push({
                    row: pos.row - 1,
                    col: pos.col
                });
            } else {
                // 不受影响的行保持原位置
                newHighlighted.push({...pos});
            }
        });
        
        // 更新高亮颜色映射
        const newHighlightColors = {};
        Object.entries(this.highlightColors[arrayId]).forEach(([posKey, color]) => {
            const [posRow, posCol] = posKey.split('-').map(Number);
            
            if (posRow === removedRow) {
                // 忽略已删除行的颜色
                return;
            }
            
            let newRow = posRow;
            if (posRow > removedRow) {
                newRow = posRow - 1;
            }
            
            newHighlightColors[`${newRow}-${posCol}`] = color;
        });
        
        // 更新状态
        this.highlighted[arrayId] = newHighlighted;
        this.highlightColors[arrayId] = newHighlightColors;
    },
    
    // 删除列后更新高亮状态
    _updateHighlightAfterColumnRemove(arrayId, removedCol) {
        // 更新高亮位置
        const newHighlighted = [];
        
        this.highlighted[arrayId].forEach(pos => {
            if (pos.col === removedCol) {
                // 忽略已删除列的高亮
                return;
            } else if (pos.col > removedCol) {
                // 受影响的列索引-1
                newHighlighted.push({
                    row: pos.row,
                    col: pos.col - 1
                });
            } else {
                // 不受影响的列保持原位置
                newHighlighted.push({...pos});
            }
        });
        
        // 更新高亮颜色映射
        const newHighlightColors = {};
        Object.entries(this.highlightColors[arrayId]).forEach(([posKey, color]) => {
            const [posRow, posCol] = posKey.split('-').map(Number);
            
            if (posCol === removedCol) {
                // 忽略已删除列的颜色
                return;
            }
            
            let newCol = posCol;
            if (posCol > removedCol) {
                newCol = posCol - 1;
            }
            
            newHighlightColors[`${posRow}-${newCol}`] = color;
        });
        
        // 更新状态
        this.highlighted[arrayId] = newHighlighted;
        this.highlightColors[arrayId] = newHighlightColors;
    }
};