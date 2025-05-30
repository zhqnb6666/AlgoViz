// 变量区可视化
const VariableVisualization = {
    // SVG元素
    svg: null,
    
    // 用于跟踪变量的展开状态
    expandedVariables: {},
    expandedPage: {}, // 存储当前页码
    
    // 初始化变量区可视化
    init() {
        // 清除现有SVG
        d3.select("#variable-visualization").selectAll("*").remove();
        
        // 计算所需SVG的高度
        const variableCount = Object.keys(VariableModel.variables).length;
        
        // 如果没有数据，不创建SVG，只清空容器
        if (variableCount === 0) {
            this.svg = null;
            return;
        }
        
        // 获取所有变量
        const variables = VariableModel.getAllVariables();
        const variableNames = Object.keys(variables);
        
        // 设置容器尺寸
        const width = CONFIG.svgContainer.width;
        // 计算每行能容纳的变量数量和所需行数
        const minBoxWidth = 100; // 最小变量框宽度
        const padding = 16; // 变量框之间的间距
        const boxHeight = 70; // 变量框高度
        const maxBoxesPerRow = Math.floor((width - padding) / (minBoxWidth + padding));
        const rows = Math.ceil(variableCount / maxBoxesPerRow);
        const height = rows * (boxHeight + padding) + padding;
        
        // 创建新的SVG容器
        this.svg = d3.select("#variable-visualization")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("class", "mx-auto");
            
        // 渲染变量
        this.render();
    },
    
    // 格式化变量值
    formatVariableValue(value, name, expanded = false, page = 0) {
        if (value === null || value === undefined) return "undefined";
        
        // 处理数组/列表
        if (Array.isArray(value)) {
            if (value.length === 0) return "[]";
            
            if (!expanded) {
                // 不展开时，始终省略显示
                return `[...${value.length}项]`;
            } else {
                // 计算分页
                const itemsPerPage = 20;
                const pageCount = Math.ceil(value.length / itemsPerPage);
                const startIdx = page * itemsPerPage;
                const endIdx = Math.min(startIdx + itemsPerPage, value.length);
                const items = [];
                
                for (let i = startIdx; i < endIdx; i++) {
                    // 展开时，完整显示每个值 (不使用shortenValue)
                    const itemValue = Array.isArray(value[i]) || (typeof value[i] === 'object' && value[i] !== null) ? 
                        JSON.stringify(value[i]) : value[i];
                    items.push(`[${i}]: ${itemValue}`);
                }
                
                return {
                    text: items.join("\n"),
                    pageInfo: {
                        current: page,
                        total: pageCount,
                        itemCount: value.length
                    }
                };
            }
        }
        
        // 处理对象/字典
        if (typeof value === 'object' && value !== null) {
            const keys = Object.keys(value);
            if (keys.length === 0) return "{}";
            
            if (!expanded) {
                // 不展开时，始终使用省略显示
                return `{...${keys.length}项}`;
            } else {
                // 计算分页
                const itemsPerPage = 15;
                const pageCount = Math.ceil(keys.length / itemsPerPage);
                const startIdx = page * itemsPerPage;
                const endIdx = Math.min(startIdx + itemsPerPage, keys.length);
                const items = [];
                
                for (let i = startIdx; i < endIdx; i++) {
                    const key = keys[i];
                    const val = value[key];
                    // 展开时，完整显示值（不使用shortenValue）
                    const valStr = Array.isArray(val) || (typeof val === 'object' && val !== null) ? 
                        JSON.stringify(val) : (val !== null && val !== undefined ? val.toString() : "undefined");
                    items.push(`"${key}": ${valStr}`);
                }
                
                return {
                    text: items.join("\n"),
                    pageInfo: {
                        current: page,
                        total: pageCount,
                        itemCount: keys.length
                    }
                };
            }
        }
        
        // 处理普通值
        return value.toString();
    },
    
    // 缩短值表示，针对嵌套结构
    shortenValue(value) {
        if (value === null || value === undefined) return "undefined";
        if (Array.isArray(value)) return `[...${value.length}项]`;
        if (typeof value === 'object' && value !== null) {
            const keys = Object.keys(value);
            return `{...${keys.length}项}`;
        }
        if (typeof value === 'string' && value.length > 15) {
            return `"${value.substring(0, 12)}..."`;
        }
        return value.toString();
    },
    
    // 渲染变量区
    render() {
        if (!this.svg) return;
        
        // 清除现有元素
        this.svg.selectAll("g.variable-item").remove();
        
        // 获取所有变量
        const variables = VariableModel.getAllVariables();
        const variableNames = Object.keys(variables);
        
        // 如果没有变量，显示提示信息
        if (variableNames.length === 0) {
            this.svg.append("text")
                .attr("x", CONFIG.svgContainer.width / 2)
                .attr("y", 50)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "16px")
                .attr("fill", "#999")
                .text("变量区为空");
            return;
        }
        
        // 设置变量框布局参数
        const padding = 16;
        const minBoxWidth = 100;
        const maxBoxWidth = 300; // 增加最大宽度，以便更好地显示展开的数据
        let boxHeight = 70;
        const containerWidth = CONFIG.svgContainer.width;
        
        // 计算每个变量名的宽度和框的合适宽度
        const boxWidths = [];
        const boxHeights = [];
        variableNames.forEach(name => {
            const nameLength = name.length * 12;
            const value = variables[name];
            
            // 检查是否是展开状态
            const isExpanded = this.expandedVariables[name] || false;
            const currentPage = this.expandedPage[name] || 0;
            
            const valueStr = this.formatVariableValue(value, name, isExpanded, currentPage);
            const valueText = typeof valueStr === 'object' ? valueStr.text : valueStr;
            
            // 计算文本宽度
            const valueLength = valueText.length * 10;
            const valueLines = valueText.split('\n');
            
            // 计算高度 - 基础高度加上每增加一行的高度
            let height = boxHeight;
            if (isExpanded && valueLines.length > 1) {
                height += (valueLines.length - 1) * 20 + 30; // 额外的空间用于分页控制
            }
            
            // 限制最大宽度
            const width = Math.min(maxBoxWidth, Math.max(minBoxWidth, Math.max(nameLength, valueLength) + 30));
            boxWidths.push(width);
            boxHeights.push(height);
        });
        
        // 计算每行能放置的变量数及布局
        let currentRowWidth = 0;
        let currentRow = 0;
        let offsetX = padding;
        let offsetY = padding;
        const positions = [];
        
        boxWidths.forEach((width, index) => {
            // 如果这个变量框加上后会超出宽度，移到下一行
            if (currentRowWidth + width + padding > containerWidth && currentRowWidth > 0) {
                currentRow++;
                offsetX = padding;
                offsetY = padding + positions
                    .filter(p => p.row === currentRow - 1)
                    .reduce((h, p) => Math.max(h, p.height), 0) + padding;
                currentRowWidth = 0;
            }
            
            positions.push({
                x: offsetX,
                y: offsetY,
                width: width,
                height: boxHeights[index],
                row: currentRow
            });
            
            // 更新当前行的宽度和下一个变量的X位置
            offsetX += width + padding;
            currentRowWidth += width + padding;
        });
        
        // 为每个变量创建一个组
        const variableGroups = this.svg.selectAll("g.variable-item")
            .data(variableNames)
            .enter()
            .append("g")
            .attr("class", "variable-item");
        
        // 为每个变量创建一个方框
        const self = this; // 保存this引用
        variableGroups.each(function(d, i) {
            const group = d3.select(this);
            const position = positions[i];
            const value = variables[d];
            
            // 检查是否是展开状态
            const isExpanded = self.expandedVariables[d] || false;
            const currentPage = self.expandedPage[d] || 0;
            
            // 创建方框外框 - 添加阴影效果
            group.append("rect")
                .attr("x", position.x)
                .attr("y", position.y)
                .attr("width", position.width)
                .attr("height", position.height)
                .attr("rx", 8)
                .attr("fill", "white")
                .attr("stroke", "#cfd8dc")
                .attr("stroke-width", 2)
                .attr("filter", "drop-shadow(0px 2px 3px rgba(0,0,0,0.1))");
            
            // 创建上半部分背景（变量名区域）
            group.append("rect")
                .attr("x", position.x)
                .attr("y", position.y)
                .attr("width", position.width)
                .attr("height", 30)
                .attr("rx", 8)
                .attr("ry", 0)
                .attr("fill", "#e3f2fd");
                
            // 创建圆角修复（让上半部分只有顶部是圆角）
            group.append("rect")
                .attr("x", position.x)
                .attr("y", position.y + 20)
                .attr("width", position.width)
                .attr("height", 10)
                .attr("fill", "#e3f2fd");
                
            // 添加变量名
            group.append("text")
                .attr("x", position.x + position.width / 2)
                .attr("y", position.y + 15)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "middle")
                .attr("font-size", "14px")
                .attr("fill", "#37474f")
                .attr("font-weight", "bold")
                .text(d);
                
            // 添加变量值
            const formattedValue = self.formatVariableValue(value, d, isExpanded, currentPage);
            
            // 检查是否是可展开的复杂数据
            const isExpandable = Array.isArray(value) || (typeof value === 'object' && value !== null);
            
            if (isExpandable) {
                // 添加展开/折叠按钮
                const btnX = position.x + position.width - 25;
                const btnY = position.y + 40;
                
                // 创建圆形按钮背景
                group.append("circle")
                    .attr("cx", btnX)
                    .attr("cy", btnY)
                    .attr("r", 10)
                    .attr("fill", "#e0e0e0")
                    .attr("stroke", "#bdbdbd")
                    .attr("stroke-width", 1)
                    .attr("cursor", "pointer")
                    .attr("class", "expand-btn")
                    .on("click", function() {
                        // 切换展开状态
                        self.expandedVariables[d] = !isExpanded;
                        self.expandedPage[d] = 0; // 重置页码
                        self.render(); // 重新渲染
                    });
                
                // 添加+/-符号
                group.append("text")
                    .attr("x", btnX)
                    .attr("y", btnY)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "14px")
                    .attr("fill", "#616161")
                    .attr("cursor", "pointer")
                    .attr("pointer-events", "none")
                    .text(isExpanded ? "-" : "+");
            }
            
            // 渲染值文本
            if (typeof formattedValue === 'object') {
                // 是展开的对象或数组 - 分行显示
                const valueLines = formattedValue.text.split('\n');
                const pageInfo = formattedValue.pageInfo;
                
                valueLines.forEach((line, lineIndex) => {
                    group.append("text")
                        .attr("x", position.x + 10)
                        .attr("y", position.y + 40 + lineIndex * 20)
                        .attr("text-anchor", "start")
                        .attr("dominant-baseline", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#263238")
                        .text(line)
                        .attr("class", "value-text");
                });
                
                // 添加分页控制
                if (pageInfo.total > 1) {
                    // 显示页码
                    group.append("text")
                        .attr("x", position.x + position.width / 2)
                        .attr("y", position.y + position.height - 15)
                        .attr("text-anchor", "middle")
                        .attr("dominant-baseline", "middle")
                        .attr("font-size", "12px")
                        .attr("fill", "#757575")
                        .text(`第 ${pageInfo.current + 1}/${pageInfo.total} 页, 共 ${pageInfo.itemCount} 项`);
                    
                    // 上一页按钮
                    if (pageInfo.current > 0) {
                        group.append("circle")
                            .attr("cx", position.x + 20)
                            .attr("cy", position.y + position.height - 15)
                            .attr("r", 8)
                            .attr("fill", "#e0e0e0")
                            .attr("cursor", "pointer")
                            .on("click", function() {
                                self.expandedPage[d] = Math.max(0, currentPage - 1);
                                self.render();
                            });
                            
                        group.append("text")
                            .attr("x", position.x + 20)
                            .attr("y", position.y + position.height - 15)
                            .attr("text-anchor", "middle")
                            .attr("dominant-baseline", "middle")
                            .attr("font-size", "12px")
                            .attr("fill", "#616161")
                            .attr("pointer-events", "none")
                            .text("←");
                    }
                    
                    // 下一页按钮
                    if (pageInfo.current < pageInfo.total - 1) {
                        group.append("circle")
                            .attr("cx", position.x + position.width - 20)
                            .attr("cy", position.y + position.height - 15)
                            .attr("r", 8)
                            .attr("fill", "#e0e0e0")
                            .attr("cursor", "pointer")
                            .on("click", function() {
                                self.expandedPage[d] = Math.min(pageInfo.total - 1, currentPage + 1);
                                self.render();
                            });
                            
                        group.append("text")
                            .attr("x", position.x + position.width - 20)
                            .attr("y", position.y + position.height - 15)
                            .attr("text-anchor", "middle")
                            .attr("dominant-baseline", "middle")
                            .attr("font-size", "12px")
                            .attr("fill", "#616161")
                            .attr("pointer-events", "none")
                            .text("→");
                    }
                }
            } else {
                // 普通未展开文本
                group.append("text")
                    .attr("x", position.x + position.width / 2)
                    .attr("y", position.y + 50)
                    .attr("text-anchor", "middle")
                    .attr("dominant-baseline", "middle")
                    .attr("font-size", "14px")
                    .attr("fill", "#263238")
                    .text(formattedValue)
                    .attr("class", "value-text");
            }
        });
        
        // 调整SVG高度以适应内容
        // 找到最后一行的所有位置并计算最底部的位置
        const maxRow = Math.max(...positions.map(p => p.row));
        const lastRowPositions = positions.filter(p => p.row === maxRow);
        const bottomMost = Math.max(...lastRowPositions.map(p => p.y + p.height)) + padding;
        
        // 设置SVG的高度
        this.svg.attr("height", bottomMost);
    },
    
    // 动画更新变量
    animateUpdateVariable(name, value, animationSpeed) {
        // 如果没有SVG容器，直接返回
        if (!this.svg) {
            return Promise.resolve();
        }
        
        // 先更新模型中的值
        VariableModel.setVariable(name, value);
        
        // 查找对应的变量组
        const variableGroup = this.svg.selectAll("g.variable-item")
            .filter(d => d === name);
        
        if (variableGroup.empty()) {
            // 如果变量不存在，需要完全重新渲染
            this.init();
            return Utils.delay(CONFIG.delay.standard / animationSpeed);
        }
        
        // 找到值文本元素
        const valueText = variableGroup.select(".value-text");
        
        // 找到方框元素
        const rect = variableGroup.select("rect:first-child");
        
        // 闪烁效果
        rect.transition()
            .duration(CONFIG.delay.highlight / (2 * animationSpeed))
            .attr("stroke", "#ff9800")
            .attr("stroke-width", 3)
            .transition()
            .duration(CONFIG.delay.highlight / (2 * animationSpeed))
            .attr("stroke", "#cfd8dc")
            .attr("stroke-width", 2);
        
        // 更新和重绘整个变量区
        // 因为可能变量类型改变需要重新布局
        this.init();
        
        return Utils.delay(CONFIG.delay.standard / animationSpeed);
    },
    
    // 动画添加变量
    animateAddVariable(name, value, animationSpeed) {
        // 先更新模型
        VariableModel.setVariable(name, value);
        
        // 如果没有SVG容器，创建一个
        if (!this.svg) {
            this.init();
            
            // 查找新创建的变量并添加动画效果
            if (this.svg) {
                const newVarGroup = this.svg.selectAll("g.variable-item")
                    .filter(d => d === name);
                
                if (!newVarGroup.empty()) {
                    // 找到方框元素并添加动画
                    const rect = newVarGroup.select("rect:first-child");
                    
                    // 设置初始状态为中心点，所有元素淡入
                    newVarGroup.selectAll("*")
                        .attr("opacity", 0)
                        .transition()
                        .duration(CONFIG.delay.highlight / animationSpeed)
                        .attr("opacity", 1);
                }
            }
        } else {
            // 更新现有容器
            this.init();
            
            // 查找新创建的变量并添加动画效果
            const newVarGroup = this.svg.selectAll("g.variable-item")
                .filter(d => d === name);
            
            if (!newVarGroup.empty()) {
                // 所有元素淡入
                newVarGroup.selectAll("*")
                    .attr("opacity", 0)
                    .transition()
                    .duration(CONFIG.delay.highlight / animationSpeed)
                    .attr("opacity", 1);
            }
        }
        
        return Utils.delay(CONFIG.delay.standard / animationSpeed);
    },
    
    // 动画删除变量
    animateDeleteVariable(name, animationSpeed) {
        // 删除模型中的变量
        VariableModel.deleteVariable(name);
        
        // 移除展开状态记录
        delete this.expandedVariables[name];
        delete this.expandedPage[name];
        
        // 重新初始化，不做淡出动画，直接更新
        this.init();
        
        return Utils.delay(CONFIG.delay.standard / animationSpeed);
    }
}; 