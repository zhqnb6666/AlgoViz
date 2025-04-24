
// 二维数组可视化
const Array2DVisualization = {
    // SVG元素
    svg: null,
    arrayGroups: {},
    
    // 初始化数组可视化
    init() {
        // 清除现有SVG
        d3.select("#array2d-visualization").selectAll("*").remove();
        
        // 计算所需SVG的高度：每个数组需要的高度 + 间距
        const arrayCount = Object.keys(Array2DModel.data).length;
        
        // 如果没有数据，不创建SVG，只清空容器
        if (arrayCount === 0) {
            this.svg = null;
            return;
        }
        
        // 计算所需的高度 - 二维数组通常需要更多空间
        let totalHeight = 0;
        Object.entries(Array2DModel.data).forEach(([arrayId, array]) => {
            const rows = array.length;
            totalHeight += Math.max(100, rows * (CONFIG.visualization.array.squareSize + 10) + 50);
        });
        
        // 确保最小高度
        totalHeight = Math.max(CONFIG.svgContainer.arrayHeight, totalHeight);
        
        // 创建新的SVG容器
        this.svg = d3.select("#array2d-visualization")
            .append("svg")
            .attr("width", CONFIG.svgContainer.width)
            .attr("height", totalHeight)
            .attr("class", "mx-auto");
            
        // 渲染数组
        this.render();
    },
    
    // 渲染数组
    render() {
        if (!this.svg) return;
        
        // 清除所有现有元素，包括数组标识符
        this.svg.selectAll("*").remove();
        
        // 处理多个数组数据
        if (Object.keys(Array2DModel.data).length > 0) {
            // 创建数组对象的数组，方便处理
            const arrayEntries = Object.entries(Array2DModel.data);
            this.arrayGroups = {};
            
            // 当前垂直位置
            let currentY = 20;
            
            // 为每个数组创建组并绑定数据
            arrayEntries.forEach(([arrayId, array], arrayIndex) => {
                // 如果是空数组，跳过
                if (array.length === 0) return;
                
                // 计算行列数
                const rows = array.length;
                const cols = array[0].length;
                
                // 添加数组标识
                this.svg.append("text")
                    .attr("x", 0)
                    .attr("y", currentY + 20)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "16px")
                    .attr("font-weight", "bold")
                    .text(arrayId);
                
                // 创建数组元素组
                const group = this.svg.append("g")
                    .attr("class", `array-group array-group-${arrayId}`)
                    .attr("transform", `translate(100, ${currentY})`);
                
                // 创建行组
                const rowGroups = group.selectAll(`.array-row-${arrayId}`)
                    .data(array)
                    .enter()
                    .append("g")
                    .attr("class", `array-row-${arrayId}`)
                    .attr("transform", (d, rowIdx) => 
                        `translate(0, ${rowIdx * (CONFIG.visualization.array.squareSize + 10)})`);
                
                // 为每行创建元素组
                rowGroups.each(function(rowData, rowIdx) {
                    const rowGroup = d3.select(this);
                    
                    // 添加行标签
                    rowGroup.append("text")
                        .attr("x", -20)
                        .attr("y", CONFIG.visualization.array.squareSize / 2)
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("font-size", "14px")
                        .attr("font-weight", "bold")
                        .attr("fill", "#666")
                        .text(rowIdx);
                    
                    // 为每行的每个元素创建组
                    const cellGroups = rowGroup.selectAll(`.array-cell-${arrayId}-${rowIdx}`)
                        .data(rowData)
                        .enter()
                        .append("g")
                        .attr("class", (d, colIdx) => `array-cell-${arrayId}-${rowIdx}-${colIdx}`)
                        .attr("transform", (d, colIdx) => 
                            `translate(${colIdx * (CONFIG.visualization.array.squareSize + 5)}, 0)`);
                    
                    // 为每个元素添加方框
                    cellGroups.append("rect")
                        .attr("width", CONFIG.visualization.array.squareSize)
                        .attr("height", CONFIG.visualization.array.squareSize)
                        .attr("fill", (d, colIdx) => {
                            const posKey = `${rowIdx}-${colIdx}`;
                            if (Array2DModel.highlighted[arrayId] && 
                                Array2DModel.highlighted[arrayId].some(pos => 
                                    pos.row === rowIdx && pos.col === colIdx)) {
                                return Array2DModel.highlightColors[arrayId][posKey] || 
                                       CONFIG.visualization.array.defaultHighlightColor;
                            }
                            return "white";
                        })
                        .attr("stroke", "#333")
                        .attr("rx", 4);
                    
                    // 为每个元素添加文本
                    cellGroups.append("text")
                        .attr("x", CONFIG.visualization.array.squareSize / 2)
                        .attr("y", CONFIG.visualization.array.squareSize / 2)
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "central")
                        .attr("font-size", "14px")
                        .attr("font-weight", "bold")
                        .text(d => d);
                    
                    // 如果是第一行，添加列标签
                    if (rowIdx === 0) {
                        cellGroups.append("text")
                            .attr("x", CONFIG.visualization.array.squareSize / 2)
                            .attr("y", -10)
                            .attr("text-anchor", "middle")
                            .attr("dominant-baseline", "central")
                            .attr("font-size", "14px")
                            .attr("fill", "#666")
                            .text((d, colIdx) => colIdx);
                    }
                });
                
                // 更新垂直位置
                currentY += rows * (CONFIG.visualization.array.squareSize + 10) + 50;
                
                // 存储引用以便后续更新
                this.arrayGroups[arrayId] = {
                    group: group,
                    rowGroups: rowGroups
                };
            });
            
            // 保存数组组引用供其他方法使用
            window.array2DGroups = this.arrayGroups;
        } else {
            // 没有数组数据时，显示提示信息
            this.svg.append("text")
                .attr("class", "empty-hint")
                .attr("x", CONFIG.svgContainer.width / 2)
                .attr("y", CONFIG.svgContainer.arrayHeight / 2)
                .attr("text-anchor", "middle")
                .attr("font-size", "16px")
                .attr("fill", "#999")
                .text("等待二维数组数据...");
        }
    },
    
    // 动画交换元素
    animateElementSwap(arrayId, pos1, pos2, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 获取元素位置信息
        const cell1 = this.svg.select(`.array-cell-${arrayId}-${pos1.row}-${pos1.col}`);
        const cell2 = this.svg.select(`.array-cell-${arrayId}-${pos2.row}-${pos2.col}`);
        
        if (cell1.empty() || cell2.empty()) {
            return Promise.resolve();
        }
        
        // 获取元素的值
        const value1 = Array2DModel.data[arrayId][pos1.row][pos1.col];
        const value2 = Array2DModel.data[arrayId][pos2.row][pos2.col];
        
        // 创建临时复制元素进行动画
        const tempElement1 = this._createTempElement(pos1, value1, arrayId);
        const tempElement2 = this._createTempElement(pos2, value2, arrayId);
        
        // 隐藏原始元素
        cell1.style("opacity", 0);
        cell2.style("opacity", 0);
        
        // 计算目标位置
        const pos1Coords = this._getCellCoordinates(arrayId, pos1.row, pos1.col);
        const pos2Coords = this._getCellCoordinates(arrayId, pos2.row, pos2.col);
        
        // 动画移动临时元素
        tempElement1.transition()
            .duration(CONFIG.delay.standard / animationSpeed)
            .attr("transform", `translate(${pos2Coords.x}, ${pos2Coords.y})`);
            
        tempElement2.transition()
            .duration(CONFIG.delay.standard / animationSpeed)
            .attr("transform", `translate(${pos1Coords.x}, ${pos1Coords.y})`);
            
        // 动画完成后清理
        return new Promise(resolve => {
            setTimeout(() => {
                // 移除临时元素
                tempElement1.remove();
                tempElement2.remove();
                // 重新渲染以确保高亮状态正确显示
                this.render();
                
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    },
    
    // 创建临时元素用于交换动画
    _createTempElement(pos, value, arrayId) {
        const coords = this._getCellCoordinates(arrayId, pos.row, pos.col);
        
        const tempGroup = this.svg.append("g")
            .attr("class", "temp-element")
            .attr("transform", `translate(${coords.x}, ${coords.y})`);
        
        // 确定元素是否高亮以及高亮颜色
        const posKey = `${pos.row}-${pos.col}`;
        let fillColor = "white";
        
        if (Array2DModel.highlighted[arrayId] && 
            Array2DModel.highlighted[arrayId].some(p => 
                p.row === pos.row && p.col === pos.col)) {
            fillColor = Array2DModel.highlightColors[arrayId][posKey] || 
                       CONFIG.visualization.array.defaultHighlightColor;
        }
            
        // 添加方块
        tempGroup.append("rect")
            .attr("width", CONFIG.visualization.array.squareSize)
            .attr("height", CONFIG.visualization.array.squareSize)
            .attr("fill", fillColor)
            .attr("stroke", "#333")
            .attr("rx", 4);
            
        // 添加文本
        tempGroup.append("text")
            .attr("x", CONFIG.visualization.array.squareSize / 2)
            .attr("y", CONFIG.visualization.array.squareSize / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .text(value);
            
        return tempGroup;
    },
    
    // 获取数组单元格的坐标
    _getCellCoordinates(arrayId, row, col) {
        // 基础偏移量 (因为整个数组组是从(100,y)开始的)
        const baseX = 100;
        let baseY = 0;
        
        // 查找正确的数组组位置
        const arrayEntries = Object.entries(Array2DModel.data);
        let currentY = 20;
        
        for (let i = 0; i < arrayEntries.length; i++) {
            const [id, array] = arrayEntries[i];
            if (id === arrayId) {
                baseY = currentY;
                break;
            }
            // 移动到下一个数组位置
            const rows = array.length;
            currentY += rows * (CONFIG.visualization.array.squareSize + 10) + 50;
        }
        
        // 计算具体单元格位置
        const x = baseX + col * (CONFIG.visualization.array.squareSize + 5);
        const y = baseY + row * (CONFIG.visualization.array.squareSize + 10);
        
        return { x, y };
    },
    
    // 动画高亮元素
    animateHighlight(arrayId, positions, color, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 为每个位置应用高亮
        positions.forEach(pos => {
            this.svg.select(`.array-cell-${arrayId}-${pos.row}-${pos.col}`)
                .select("rect")
                .transition()
                .duration(CONFIG.delay.highlight / animationSpeed)
                .attr("fill", color);
        });
            
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },
    
    // 动画取消高亮
    animateUnhighlight(arrayId, positions, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 为每个位置取消高亮
        positions.forEach(pos => {
            this.svg.select(`.array-cell-${arrayId}-${pos.row}-${pos.col}`)
                .select("rect")
                .transition()
                .duration(CONFIG.delay.highlight / animationSpeed)
                .attr("fill", "white");
        });
            
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },
    
    // 动画交换行
    animateRowSwap(arrayId, row1, row2, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 获取行组
        const rowGroup1 = this.svg.select(`.array-row-${arrayId}:nth-child(${row1 + 1})`);
        const rowGroup2 = this.svg.select(`.array-row-${arrayId}:nth-child(${row2 + 1})`);
        
        if (rowGroup1.empty() || rowGroup2.empty()) {
            return Promise.resolve();
        }
        
        // 获取行的当前位置
        const yPos1 = row1 * (CONFIG.visualization.array.squareSize + 10);
        const yPos2 = row2 * (CONFIG.visualization.array.squareSize + 10);
        
        // 动画交换行
        rowGroup1.transition()
            .duration(CONFIG.delay.standard / animationSpeed)
            .attr("transform", `translate(0, ${yPos2})`);
            
        rowGroup2.transition()
            .duration(CONFIG.delay.standard / animationSpeed)
            .attr("transform", `translate(0, ${yPos1})`);
            
        return new Promise(resolve => {
            setTimeout(() => {
                this.render();
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    },
    
    // 动画交换列
    animateColumnSwap(arrayId, col1, col2, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }

        // 数组维度
        const dimensions = Array2DModel.getDimensions(arrayId);

        // 对每一行进行列交换
        const promises = [];
        for (let row = 0; row < dimensions.rows; row++) {
            const pos1 = {row, col: col1};
            const pos2 = {row, col: col2};
            promises.push(this.animateElementSwap(arrayId, pos1, pos2, animationSpeed * 2));
        }

        // 等待所有动画完成
        return Promise.all(promises).then(() => {
            // 确保在模型层面也更新了高亮信息
            Array2DModel.swapColumns(arrayId, col1, col2);
            this.render();
        });
    },
    
    // 动画更新元素
    animateElementUpdate(arrayId, position, value, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 查找元素
        const cell = this.svg.select(`.array-cell-${arrayId}-${position.row}-${position.col}`);
        
        if (cell.empty()) {
            return Promise.resolve();
        }
        
        // 闪烁效果
        cell.select("rect")
            .transition()
            .duration(CONFIG.delay.highlight / (2 * animationSpeed))
            .attr("fill", "#ffcc00")
            .transition()
            .duration(CONFIG.delay.highlight / (2 * animationSpeed))
            .attr("fill", () => {
                const posKey = `${position.row}-${position.col}`;
                if (Array2DModel.highlighted[arrayId] && 
                    Array2DModel.highlighted[arrayId].some(pos => 
                        pos.row === position.row && pos.col === position.col)) {
                    return Array2DModel.highlightColors[arrayId][posKey] || 
                           CONFIG.visualization.array.defaultHighlightColor;
                }
                return "white";
            });
        
        // 更新数据模型
        Array2DModel.updateElement(arrayId, position, value);
        
        // 更新文本
        cell.select("text")
            .text(value);
        
        // 重新渲染以确保视图与模型同步
        this.render();
        
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },
    
    // 动画添加行
    animateAddRow(arrayId, position, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 先让整个数组淡出
        this.svg.select(`.array-group-${arrayId}`)
            .transition()
            .duration(CONFIG.delay.standard / (2 * animationSpeed))
            .style("opacity", 0.5)
            .transition()
            .duration(CONFIG.delay.standard / (2 * animationSpeed))
            .style("opacity", 1);
        
        return new Promise(resolve => {
            setTimeout(() => {
                // 重新渲染以包含新行
                this.render();
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    },
    
    // 动画添加列
    animateAddColumn(arrayId, position, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 与添加行类似的淡出淡入效果
        this.svg.select(`.array-group-${arrayId}`)
            .transition()
            .duration(CONFIG.delay.standard / (2 * animationSpeed))
            .style("opacity", 0.5)
            .transition()
            .duration(CONFIG.delay.standard / (2 * animationSpeed))
            .style("opacity", 1);
        
        return new Promise(resolve => {
            setTimeout(() => {
                // 重新渲染以包含新列
                this.render();
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    },
    
    // 动画移除行
    animateRemoveRow(arrayId, row, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 验证行索引的有效性
        const dimensions = Array2DModel.getDimensions(arrayId);
        if (row < 0 || row >= dimensions.rows) {
            console.error(`行索引超出范围: ${row}`);
            return Promise.resolve();
        }
        
        // 清除被删除行的高亮信息
        if (Array2DModel.highlighted[arrayId]) {
            // 移除被删除行的高亮
            Array2DModel.highlighted[arrayId] = Array2DModel.highlighted[arrayId].filter(pos => pos.row !== row);
            // 更新后续行的高亮索引
            Array2DModel.highlighted[arrayId].forEach(pos => {
                if (pos.row > row) {
                    pos.row--;
                    // 更新高亮颜色的键
                    const oldKey = `${pos.row}-${pos.col}`;
                    const newKey = `${pos.row - 1}-${pos.col}`;
                    Array2DModel.highlightColors[arrayId][newKey] = Array2DModel.highlightColors[arrayId][oldKey];
                    delete Array2DModel.highlightColors[arrayId][oldKey];
                }
            });
        }
        
        // 获取要删除的行
        const rowGroup = this.svg.select(`.array-row-${arrayId}`).filter((d, i) => i === row);
        
        if (!rowGroup.empty()) {
            // 淡出要删除的行
            rowGroup.transition()
                .duration(CONFIG.delay.standard / (2 * animationSpeed))
                .style("opacity", 0);
        }
        
        return new Promise(resolve => {
            setTimeout(() => {
                // 重新渲染以反映删除
                this.render();
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    },
    
    // 动画移除列
    animateRemoveColumn(arrayId, col, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 验证列索引的有效性
        const dimensions = Array2DModel.getDimensions(arrayId);
        if (col < 0 || col >= dimensions.cols) {
            console.error(`列索引超出范围: ${col}`);
            return Promise.resolve();
        }
        
        // 清除被删除列的高亮信息
        if (Array2DModel.highlighted[arrayId]) {
            // 移除被删除列的高亮
            Array2DModel.highlighted[arrayId] = Array2DModel.highlighted[arrayId].filter(pos => pos.col !== col);
            // 更新后续列的高亮索引
            Array2DModel.highlighted[arrayId].forEach(pos => {
                if (pos.col > col) {
                    pos.col--;
                    // 更新高亮颜色的键
                    const oldKey = `${pos.row}-${pos.col}`;
                    const newKey = `${pos.row}-${pos.col - 1}`;
                    Array2DModel.highlightColors[arrayId][newKey] = Array2DModel.highlightColors[arrayId][oldKey];
                    delete Array2DModel.highlightColors[arrayId][oldKey];
                }
            });
        }
        
        // 淡出要删除的列中的所有单元格
        for (let row = 0; row < dimensions.rows; row++) {
            this.svg.select(`.array-cell-${arrayId}-${row}-${col}`)
                .transition()
                .duration(CONFIG.delay.standard / (2 * animationSpeed))
                .style("opacity", 0);
        }
        
        return new Promise(resolve => {
            setTimeout(() => {
                // 重新渲染以反映删除
                this.render();
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    }
    
};