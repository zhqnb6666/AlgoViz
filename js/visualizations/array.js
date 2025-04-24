// 数组可视化
const ArrayVisualization = {
    // SVG元素
    svg: null,
    arrayGroups: {},
    
    // 初始化数组可视化
    init() {
        // 清除现有SVG
        d3.select("#array-visualization").selectAll("*").remove();
        
        // 计算所需SVG的高度：每个数组需要的高度 + 间距
        const arrayCount = Object.keys(ArrayModel.data).length;
        
        // 如果没有数据，不创建SVG，只清空容器
        if (arrayCount === 0) {
            this.svg = null;
            return;
        }
        
        const totalHeight = Math.max(CONFIG.svgContainer.arrayHeight, arrayCount * 100);
        
        // 创建新的SVG容器
        this.svg = d3.select("#array-visualization")
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
        
        // 清除现有元素
        this.svg.selectAll("g.array-group, text.empty-hint").remove();
        
        // 处理多个数组数据
        if (Object.keys(ArrayModel.data).length > 0) {
            // 创建数组对象的数组，方便处理
            const arrayEntries = Object.entries(ArrayModel.data);
            this.arrayGroups = {};
            
            // 每个数组占据的垂直空间
            const verticalOffset = 80;
            
            // 为每个数组创建组并绑定数据
            arrayEntries.forEach(([arrayId, array], arrayIndex) => {
                // 为该数组创建一个组
                const groupY = arrayIndex * verticalOffset;
                
                // 添加数组标识
                this.svg.append("text")
                    .attr("x", 10)
                    .attr("y", groupY + CONFIG.visualization.array.squareSize / 2)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "14px")
                    .attr("font-weight", "bold")
                    .text(arrayId);
                
                // 创建数组元素组
                const group = this.svg.append("g")
                    .attr("class", `array-group array-group-${arrayId}`)
                    .attr("transform", `translate(60, ${groupY})`);
                    
                // 为数组元素创建子组
                const elementGroups = group.selectAll(`.array-element-${arrayId}`)
                    .data(array)
                    .enter()
                    .append("g")
                    .attr("class", `array-element-${arrayId}`)
                    .attr("transform", (d, i) => `translate(${i * (CONFIG.visualization.array.squareSize + CONFIG.visualization.array.gap)}, 0)`);
                
                // 为每个元素添加方框
                elementGroups.append("rect")
                    .attr("width", CONFIG.visualization.array.squareSize)
                    .attr("height", CONFIG.visualization.array.squareSize)
                    .attr("fill", (d, i) => {
                        if (ArrayModel.highlighted[arrayId] && ArrayModel.highlighted[arrayId].includes(i)) {
                            return ArrayModel.highlightColors[arrayId] && ArrayModel.highlightColors[arrayId][i] || CONFIG.visualization.array.defaultHighlightColor;
                        }
                        return "white";
                    })
                    .attr("stroke", "#333")
                    .attr("rx", 4);
                
                // 为每个元素添加文本
                elementGroups.append("text")
                    .attr("x", CONFIG.visualization.array.squareSize / 2)
                    .attr("y", CONFIG.visualization.array.squareSize / 2)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .attr("font-size", "16px")
                    .attr("font-weight", "bold")
                    .text(d => d);
                
                // 为每个元素添加索引标签
                elementGroups.append("text")
                    .attr("x", CONFIG.visualization.array.squareSize / 2)
                    .attr("y", CONFIG.visualization.array.squareSize + 20)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "central")
                    .attr("font-size", "14px")
                    .attr("fill", "#666")
                    .text((d, i) => i);
                    
                // 存储引用以便后续更新
                this.arrayGroups[arrayId] = {
                    group: group,
                    elementGroups: elementGroups
                };
            });
            
            // 保存数组组引用供其他方法使用
            window.arrayGroups = this.arrayGroups;
        } else {
            // 没有数组数据时，显示提示信息
            this.svg.append("text")
                .attr("class", "empty-hint")
                .attr("x", CONFIG.svgContainer.width / 2)
                .attr("y", CONFIG.svgContainer.arrayHeight / 2)
                .attr("text-anchor", "middle")
                .attr("font-size", "16px")
                .attr("fill", "#999")
                .text("等待数组数据...");
        }
    },
    
    // 动画交换元素
    animateSwap(arrayId, i, j, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        const array = ArrayModel.data[arrayId];
        
        // 计算位置信息
        const positionI = i * (CONFIG.visualization.array.squareSize + CONFIG.visualization.array.gap);
        const positionJ = j * (CONFIG.visualization.array.squareSize + CONFIG.visualization.array.gap);
        
        // 动画显示交换过程
        this.svg.selectAll(`.array-element-${arrayId}`)
            .filter((d, idx) => idx === i)
            .transition()
            .duration(CONFIG.delay.standard / animationSpeed)
            .attr("transform", `translate(${positionJ}, 0)`);
            
        this.svg.selectAll(`.array-element-${arrayId}`)
            .filter((d, idx) => idx === j)
            .transition()
            .duration(CONFIG.delay.standard / animationSpeed)
            .attr("transform", `translate(${positionI}, 0)`);
            
        return new Promise(resolve => {
            setTimeout(() => {
                if (this.svg) this.render();
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    },
    
    // 动画更新单个元素
    animateUpdateElement(arrayId, index, value, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 查找对应元素
        const element = this.svg.selectAll(`.array-element-${arrayId}`)
            .filter((d, i) => i === index);
        
        if (element.empty()) {
            return Promise.resolve();
        }
        
        // 闪烁效果
        element.select("rect")
            .transition()
            .duration(CONFIG.delay.highlight / (2 * animationSpeed))
            .attr("fill", "#ffcc00")
            .transition()
            .duration(CONFIG.delay.highlight / (2 * animationSpeed))
            .attr("fill", () => {
                if (ArrayModel.highlighted[arrayId] && ArrayModel.highlighted[arrayId].includes(index)) {
                    return ArrayModel.highlightColors[arrayId][index] || CONFIG.visualization.array.defaultHighlightColor;
                }
                return "white";
            });
        
        // 更新文本
        element.select("text")
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed)
            .attr("opacity", 0)
            .transition()
            .duration(0)
            .text(value)
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed)
            .attr("opacity", 1);
        
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },
    
    // 动画更新多个元素
    animateUpdateElements(arrayId, updates, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 为每个更新创建一个Promise
        const promises = updates.map(update => {
            return this.animateUpdateElement(arrayId, update.index, update.value, animationSpeed * 1.5);
        });
        
        // 等待所有更新完成
        return Promise.all(promises);
    },
    
    // 动画更新整个数组
    animateUpdateArray(arrayId, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 先让整个数组淡出
        this.svg.select(`.array-group-${arrayId}`)
            .transition()
            .duration(CONFIG.delay.standard / (2 * animationSpeed))
            .style("opacity", 0)
            .transition()
            .duration(CONFIG.delay.standard / (2 * animationSpeed))
            .style("opacity", 1);
            
        // 重新渲染
        return new Promise(resolve => {
            setTimeout(() => {
                this.render();
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    },
    
    // 动画插入元素
    animateInsertElement(arrayId, index, value, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        const array = ArrayModel.data[arrayId];
        
        // 先移动插入位置后的所有元素，为新元素腾出空间
        const elementsToMove = this.svg.selectAll(`.array-element-${arrayId}`)
            .filter((d, i) => i >= index);
        
        // 对每个需要移动的元素，将其位置向右移动一格
        elementsToMove.each(function(d, i) {
            const currentElement = d3.select(this);
            const currentIndex = index + i;
            const newX = (currentIndex + 1) * (CONFIG.visualization.array.squareSize + CONFIG.visualization.array.gap);
            
            currentElement
                .transition()
                .duration(CONFIG.delay.standard / (2 * animationSpeed))
                .attr("transform", `translate(${newX}, 0)`);
        });
        
        // 等待元素移动完成，然后创建新元素并淡入
        return new Promise(resolve => {
            setTimeout(() => {
                // 重新渲染以确保所有元素正确定位
                this.render();
                
                // 高亮新插入的元素
                this.svg.selectAll(`.array-element-${arrayId}`)
                    .filter((d, i) => i === index)
                    .select("rect")
                    .attr("fill", "#ffcc00")
                    .transition()
                    .duration(CONFIG.delay.highlight / animationSpeed)
                    .attr("fill", "white");
                
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    },
    
    // 动画删除元素
    animateRemoveElement(arrayId, index, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        const array = ArrayModel.data[arrayId];
        
        // 将要删除的元素高亮并淡出
        const elementToRemove = this.svg.selectAll(`.array-element-${arrayId}`)
            .filter((d, i) => i === index);
        
        elementToRemove
            .select("rect")
            .transition()
            .duration(CONFIG.delay.highlight / (2 * animationSpeed))
            .attr("fill", "#ff6666");
            
        elementToRemove
            .transition()
            .duration(CONFIG.delay.standard / (2 * animationSpeed))
            .style("opacity", 0);
        
        // 计算需要移动的后续元素
        const elementsToMove = this.svg.selectAll(`.array-element-${arrayId}`)
            .filter((d, i) => i > index);
        
        // 等待删除元素淡出后，移动后续元素填补空缺
        setTimeout(() => {
            elementsToMove.each(function(d, i) {
                const currentElement = d3.select(this);
                const currentIndex = index + i + 1;
                const newX = (currentIndex - 1) * (CONFIG.visualization.array.squareSize + CONFIG.visualization.array.gap);
                
                currentElement
                    .transition()
                    .duration(CONFIG.delay.standard / (2 * animationSpeed))
                    .attr("transform", `translate(${newX}, 0)`);
            });
        }, CONFIG.delay.standard / (2 * animationSpeed));
        
        return new Promise(resolve => {
            setTimeout(() => {
                // 重新渲染以确保所有元素正确定位
                this.render();
                resolve();
            }, CONFIG.delay.standard / animationSpeed);
        });
    },
    
    // 动画高亮元素
    animateHighlight(arrayId, indices, color, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 更新视图中的高亮
        this.svg.selectAll(`.array-element-${arrayId}`)
            .filter((d, i) => indices.includes(i))
            .select("rect")
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed)
            .attr("fill", color);
            
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },
    
    // 动画取消高亮
    animateUnhighlight(arrayId, indices, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 更新视图中的高亮
        this.svg.selectAll(`.array-element-${arrayId}`)
            .filter((d, i) => indices.includes(i))
            .select("rect")
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed)
            .attr("fill", "white");
            
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    }
};
