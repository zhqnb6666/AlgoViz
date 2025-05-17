// 链表可视化
const LinkedListVisualization = {
    // SVG元素
    svg: null,
    nodesData: [],
    linksData: [],

    // 初始化链表可视化
    init() {
        // 清除现有SVG
        d3.select("#linked-list-visualization").selectAll("*").remove();

        // 检查是否有链表数据
        const listCount = Object.keys(LinkedListModel.lists).filter(key => LinkedListModel.lists[key] != null).length;

        // 如果没有数据，不创建SVG，只清空容器
        if (listCount === 0) {
            this.svg = null;
            this.nodesData = [];
            this.linksData = [];
            return;
        }

        // 计算所需的容器高度和宽度
        const requiredHeight = this.calculateRequiredHeight();
        const requiredWidth = this.calculateRequiredWidth();

        // 创建新的SVG容器，使用动态计算的尺寸
        this.svg = d3.select("#linked-list-visualization")
            .append("svg")
            .attr("width", Math.max(CONFIG.svgContainer.width, requiredWidth))
            .attr("height", Math.max(CONFIG.svgContainer.linkedListHeight, requiredHeight))
            .append("g")
            .attr("transform", `translate(50, ${Math.max(CONFIG.svgContainer.linkedListHeight, requiredHeight) / 2})`);

        // 定义箭头标记
        this.svg.append("defs").append("marker")
            .attr("id", "list-arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 20)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#999");

        // 渲染链表
        this.render();
    },

    // 计算所需的容器高度
    calculateRequiredHeight() {
        // 计算链表数量以确定垂直间距
        const numLists = Object.keys(LinkedListModel.lists).filter(key => LinkedListModel.lists[key] != null).length;
        const verticalSpacing = numLists <= 1 ? 0 : CONFIG.visualization.linkedList.verticalSpacing;

        // 最小高度为标准高度，增加链表数量时增加高度
        return Math.max(
            CONFIG.svgContainer.linkedListHeight,
            (numLists * verticalSpacing) + 100 // 额外添加空间容纳标签
        );
    },

    // 计算所需的容器宽度
    calculateRequiredWidth() {
        // 遍历所有链表计算最大长度
        let maxLength = 0;

        for (const listName in LinkedListModel.lists) {
            if (!LinkedListModel.lists[listName]) continue;

            let length = 0;
            let current = LinkedListModel.lists[listName];

            while (current) {
                length++;
                current = current.next;
            }

            const requiredWidth = length * CONFIG.visualization.linkedList.horizontalSpacing + 100; // 额外添加空间
            maxLength = Math.max(maxLength, requiredWidth);
        }

        return Math.max(CONFIG.svgContainer.width, maxLength);
    },

    // 收集所有链表数据转换为可视化数据
    collectData() {
        this.nodesData = [];
        this.linksData = [];

        // 计算链表数量以确定垂直间距
        const numLists = Object.keys(LinkedListModel.lists).filter(key => LinkedListModel.lists[key] != null).length;
        const verticalSpacing = numLists <= 1 ? 0 : CONFIG.visualization.linkedList.verticalSpacing;

        // 处理所有链表
        let listIndex = 0;
        for (const listName in LinkedListModel.lists) {
            if (!LinkedListModel.lists[listName]) continue;

            // 计算每个链表的起始位置
            const nameLength = listName.length * 9; // 估算标签宽度
            const startXPos = nameLength + 20; // 确保标签和第一个节点不重叠

            let xPos = startXPos;
            let yPos = listIndex * verticalSpacing - (verticalSpacing * (numLists - 1) / 2);
            let current = LinkedListModel.lists[listName];

            // 添加链表名称标签
            this.nodesData.push({
                id: `label-${listName}`,
                value: listName,
                x: 0,
                y: yPos,
                isLabel: true,
                listName: listName
            });

            while (current) {
                this.nodesData.push({
                    id: current.id,
                    value: current.value,
                    x: xPos,
                    y: yPos,
                    isLabel: false,
                    listName: listName // 添加链表名称以便于区分
                });

                if (current.next) {
                    this.linksData.push({
                        source: {id: current.id, value: current.value},
                        target: {id: current.next.id, value: current.next.value},
                        highlighted: false
                    });
                }

                current = current.next;
                xPos += CONFIG.visualization.linkedList.horizontalSpacing;
            }

            listIndex++;
        }
    },

    // 渲染链表
    render() {
        if (!this.svg) return;

        // 收集数据
        this.collectData();

        // 清除现有元素
        this.svg.selectAll(".link, .node, .empty-hint, .list-label").remove();

        // 如果没有节点数据，显示提示信息
        if (this.nodesData.length === 0) {
            this.svg.append("text")
                .attr("class", "empty-hint")
                .attr("x", 400)
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .attr("font-size", "16px")
                .attr("fill", "#999")
                .text("等待链表数据...");
            return;
        }

        // 绘制连线
        const links = this.svg.selectAll(".link")
            .data(this.linksData, d => `${d.source.id}-${d.target.id}`);

        links.enter()
            .append("path")
            .attr("class", d => d.highlighted ? "link highlighted-link" : "link")
            .attr("marker-end", "url(#list-arrowhead)")
            .attr("d", d => {
                // 计算曲线路径
                const sourceNode = this.nodesData.find(node => node.id === d.source.id);
                const targetNode = this.nodesData.find(node => node.id === d.target.id);

                if (sourceNode && targetNode) {
                    return `M${sourceNode.x},${sourceNode.y} L${targetNode.x},${targetNode.y}`;
                }
                return "";
            })
            .style("stroke-dasharray", "8,4") // 添加虚线效果;
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .styleTween("stroke-dashoffset", function () {
                return d3.interpolateNumber(12, 0); // 流动动画
            });


        // 绘制链表标签
        const labels = this.svg.selectAll(".list-label")
            .data(this.nodesData.filter(d => d.isLabel), d => d.id);

        labels.enter()
            .append("text")
            .attr("class", "list-label")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("text-anchor", "start")
            .attr("dominant-baseline", "middle")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .text(d => d.value);

        // 绘制节点
        const nodes = this.svg.selectAll(".node")
            .data(this.nodesData.filter(d => !d.isLabel), d => d.id);

        const nodeGroups = nodes.enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        // 节点的圆形
        nodeGroups.append("circle")
            .attr("r", CONFIG.visualization.linkedList.nodeRadius)
            .on("mouseover", function (event, d) {
                d3.select(this).transition().duration(300)
                    .attr("r", CONFIG.visualization.linkedList.highlightedNodeRadius);
            })
            .on("mouseout", function (event, d) {
                d3.select(this).transition().duration(300)
                    .attr("r", CONFIG.visualization.linkedList.nodeRadius);
            });

        // 节点的文本
        nodeGroups.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.value);

        // 确保所有节点都在连线上方
        this.svg.selectAll(".node").raise();

        // 在节点渲染后添加
        this.svg.selectAll(".node")
            .on('mouseover', function (event, d) {
                tippy(this, {
                    content: `ID: ${d.id}<br>值: ${d.value}<br>链表: ${d.listName}`,
                    allowHTML: true,
                    theme: 'light-border'
                });
            });

    },

    // 高亮节点
    highlightNode(nodeId, animationSpeed) {
        if (!this.svg) return Promise.resolve();

        this.svg.selectAll(".node")
            .filter(d => d.id === nodeId)
            .classed("highlighted-node", true)
            .select("circle")
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed)
            .attr("r", CONFIG.visualization.linkedList.highlightedNodeRadius);

        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },

    // 取消高亮节点
    unhighlightNode(nodeId, animationSpeed) {
        if (!this.svg) return Promise.resolve();

        this.svg.selectAll(".node")
            .filter(d => d.id === nodeId)
            .classed("highlighted-node", false)
            .select("circle")
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed)
            .attr("r", CONFIG.visualization.linkedList.nodeRadius);

        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },

    // 高亮连接
    highlightLink(sourceId, targetId, animationSpeed) {
        if (!this.svg) return Promise.resolve();

        // 先更新数据
        this.linksData.forEach(link => {
            if (link.source.id === sourceId && link.target.id === targetId) {
                link.highlighted = true;
            }
        });

        // 更新视图
        this.svg.selectAll(".link")
            .filter(d => d.source.id === sourceId && d.target.id === targetId)
            .classed("highlighted-link", true)
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed);

        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },

    // 取消高亮连接
    unhighlightLink(sourceId, targetId, animationSpeed) {
        if (!this.svg) return Promise.resolve();

        // 先更新数据
        this.linksData.forEach(link => {
            if (link.source.id === sourceId && link.target.id === targetId) {
                link.highlighted = false;
            }
        });

        // 更新视图
        this.svg.selectAll(".link")
            .filter(d => d.source.id === sourceId && d.target.id === targetId)
            .classed("highlighted-link", false)
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed);

        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },

    // 动画更新
    animateUpdate(animationSpeed) {
        if (!this.svg) {
            // 如果还没有SVG容器，则尝试初始化
            if (Object.keys(LinkedListModel.lists).filter(key => LinkedListModel.lists[key] != null).length > 0) {
                this.init();
                return Utils.delay(CONFIG.delay.standard, animationSpeed);
            }
            return Promise.resolve();
        }

        // 收集数据
        this.collectData();

        // 检查是否需要调整容器大小
        const requiredHeight = this.calculateRequiredHeight();
        const requiredWidth = this.calculateRequiredWidth();

        // 如果需要调整容器大小，重新初始化
        if (requiredHeight > parseInt(d3.select("#linked-list-visualization svg").attr("height")) ||
            requiredWidth > parseInt(d3.select("#linked-list-visualization svg").attr("width"))) {
            this.init();
            return Utils.delay(CONFIG.delay.standard, animationSpeed);
        }

        // 更新连线
        const links = this.svg.selectAll(".link")
            .data(this.linksData, d => `${d.source.id}-${d.target.id}`);

        // 删除多余的连线
        links.exit().remove();

        // 新增连线
        links.enter()
            .append("path")
            .attr("class", d => d.highlighted ? "link highlighted-link" : "link")
            .attr("marker-end", "url(#list-arrowhead)")
            .attr("d", d => {
                const sourceNode = this.nodesData.find(node => node.id === d.source.id);
                const targetNode = this.nodesData.find(node => node.id === d.target.id);
                if (sourceNode && targetNode) {
                    return `M${sourceNode.x},${sourceNode.y} L${targetNode.x},${targetNode.y}`;
                }
                return "";
            });

        // 更新现有连线
        links.transition()
            .duration(CONFIG.delay.standard / animationSpeed)
            .attr("d", d => {
                const sourceNode = this.nodesData.find(node => node.id === d.source.id);
                const targetNode = this.nodesData.find(node => node.id === d.target.id);
                if (sourceNode && targetNode) {
                    return `M${sourceNode.x},${sourceNode.y} L${targetNode.x},${targetNode.y}`;
                }
                return "";
            });

        // 更新标签
        const labels = this.svg.selectAll(".list-label")
            .data(this.nodesData.filter(d => d.isLabel), d => d.id);

        // 删除多余的标签
        labels.exit().remove();

        // 新增标签
        labels.enter()
            .append("text")
            .attr("class", "list-label")
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .attr("text-anchor", "start")
            .attr("dominant-baseline", "middle")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .text(d => d.value);

        // 更新现有标签
        labels.transition()
            .duration(CONFIG.delay.standard / animationSpeed)
            .attr("x", d => d.x)
            .attr("y", d => d.y)
            .text(d => d.value);

        // 更新节点
        const nodes = this.svg.selectAll(".node")
            .data(this.nodesData.filter(d => !d.isLabel), d => d.id);

        // 删除多余的节点
        nodes.exit().remove();

        // 新增节点
        const newNodes = nodes.enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        newNodes.append("circle")
            .attr("r", CONFIG.visualization.linkedList.nodeRadius)
            .on("mouseover", function (event, d) {
                d3.select(this).transition().duration(300)
                    .attr("r", CONFIG.visualization.linkedList.highlightedNodeRadius);
            })
            .on("mouseout", function (event, d) {
                d3.select(this).transition().duration(300)
                    .attr("r", CONFIG.visualization.linkedList.nodeRadius);
            });

        newNodes.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.value);

        // 更新现有节点
        nodes.transition()
            .duration(CONFIG.delay.standard / animationSpeed)
            .attr("transform", d => `translate(${d.x},${d.y})`)
            .select("text")
            .text(d => d.value);

        // 确保所有节点都在连线上方
        this.svg.selectAll(".node").raise();

        return Utils.delay(CONFIG.delay.standard, animationSpeed);
    }
};
