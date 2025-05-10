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
        
        // 计算所需的容器尺寸
        const { width, height } = this.calculateRequiredDimensions();
        
        // 创建新的SVG容器
        this.svg = d3.select("#array-visualization")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "mx-auto");
            
        // 渲染数组
        this.render();
    },
    
    // 计算所需的容器尺寸
    calculateRequiredDimensions() {
        // 计算所有数组所需的高度
        const arrayCount = Object.keys(ArrayModel.data).length;
        const verticalOffset = 80; // 每个数组的垂直间距
        const height = Math.max(
            CONFIG.svgContainer.arrayHeight,
            arrayCount * verticalOffset + 40 // 添加额外空间
        );
        
        // 计算最长数组所需的宽度
        let maxArrayLength = 0;
        for (const arrayId in ArrayModel.data) {
            const array = ArrayModel.data[arrayId];
            const arrayNameWidth = arrayId.length * 9; // 估算数组名宽度
            const arrayElementsWidth = array.length * (CONFIG.visualization.array.squareSize + CONFIG.visualization.array.gap);
            
            maxArrayLength = Math.max(maxArrayLength, arrayNameWidth + arrayElementsWidth + 60); // 60是左侧标签的预留空间
        }
        
        const width = Math.max(CONFIG.svgContainer.width, maxArrayLength);
        
        return { width, height };
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
                
                // 计算数组名宽度以确保标签不重叠
                const nameWidth = arrayId.length * 9; // 估算文本宽度
                const labelOffset = Math.max(10, nameWidth);
                
                // 添加数组标识
                this.svg.append("text")
                    .attr("x", 10)
                    .attr("y", groupY + CONFIG.visualization.array.squareSize / 2)
                    .attr("text-anchor", "start")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "14px")
                    .attr("font-weight", "bold")
                    .text(arrayId);
                
                // 创建数组元素组，确保与标签有足够间距
                const group = this.svg.append("g")
                    .attr("class", `array-group array-group-${arrayId}`)
                    .attr("transform", `translate(${labelOffset + 50}, ${groupY})`);
                    
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
    
    // 检查是否需要重新调整容器大小
    checkAndResizeContainer() {
        if (!this.svg) return false;
        
        const { width, height } = this.calculateRequiredDimensions();
        const currentWidth = parseInt(d3.select("#array-visualization svg").attr("width"));
        const currentHeight = parseInt(d3.select("#array-visualization svg").attr("height"));
        
        // 如果尺寸有变化则重新初始化
        if (width > currentWidth || height > currentHeight) {
            return true;
        }
        
        return false;
    },
    
    // 动画交换元素
    animateSwap(arrayId, i, j, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 检查是否需要调整容器大小
        if (this.checkAndResizeContainer()) {
            this.init();
            return Utils.delay(CONFIG.delay.standard, animationSpeed);
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
    
    // 动画高亮元素
    animateHighlight(arrayId, indices, color, animationSpeed) {
        // 如果没有SVG容器，直接返回Promise
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 检查是否需要调整容器大小
        if (this.checkAndResizeContainer()) {
            this.init();
            return this.animateHighlight(arrayId, indices, color, animationSpeed);
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
        
        // 检查是否需要调整容器大小
        if (this.checkAndResizeContainer()) {
            this.init();
            return this.animateUnhighlight(arrayId, indices, animationSpeed);
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
