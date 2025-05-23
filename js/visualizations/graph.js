// ==================== 图可视化 ====================
const GraphVisualization = {
    // 复用链表可视化配置
    config: {
        nodeRadius: 15,
        highlightedRadius: 20,
        linkWidth: 2,
        highlightedLinkWidth: 4
    },

    layoutConfig: {
        radius: CONFIG.svgContainer.width / 4,    // 多边形半径
        center: {x: CONFIG.svgContainer.width / 2, y: CONFIG.svgContainer.graphHeight / 2}
    },

    init(containerId = "#graph-visualization") {
        const container = d3.select(containerId);
        container.selectAll("svg").remove();
        this.svg = container.append("svg")
            .attr("width", CONFIG.svgContainer.width)
            .attr("height", CONFIG.svgContainer.graphHeight);

        // 定义箭头（增强链表箭头样式）
        this.svg.append("defs").selectAll("marker")
            .data(["arrow", "highlighted-arrow"])
            .join("marker")
            .attr("id", d => d)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", this.config.nodeRadius + 5)
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", d => d === "highlighted-arrow" ? "#ff0000" : "#666");

        // 添加CSS样式到文档头部
        if (!document.getElementById("graph-visualization-styles")) {
            const styleElement = document.createElement("style");
            styleElement.id = "graph-visualization-styles";
            styleElement.textContent = `
                .link { stroke: #666; stroke-width: ${this.config.linkWidth}px; stroke-opacity: 0.7; }
                .link.highlighted { 
                    stroke: #ff0000; 
                    stroke-width: ${this.config.highlightedLinkWidth}px; 
                    stroke-opacity: 1;
                }
                .edge-label { font-size: 12px; paint-order: stroke; stroke: white; stroke-width: 2px; }
                .edge-label.highlighted { fill: #ff0000; font-weight: bold; }
                .node circle { fill: #FFFFFF; stroke: #333; stroke-width: 1.5px; }
                .node.highlighted circle { fill: #FFB74D; stroke: #ff7f0e; stroke-width: 3px; }
                .node text { font-size: 12px; fill: #333; user-select: none; }
                .node.highlighted text { font-weight: bold; }
            `;
            document.head.appendChild(styleElement);
        }

        const drag = d3.drag()
            .on("start", (e, d) => this.dragstarted(e, d))
            .on("drag", (e, d) => this.dragged(e, d))
            .on("end", (e, d) => this.dragended(e, d));

        this.svg.selectAll(".node").call(drag);
    },

    animateUpdate(speed = 1, graphId) {
        this.render(graphId);
        return Utils.delay(CONFIG.delay.standard / speed);
    },

    render(graphId) {
        const graph = GraphModel.graphs[graphId];
        if (!graph) return;

        // 计算正多边形布局
        const nodeCount = Object.keys(graph.nodes).length;
        const positions = this._calculatePolygonPositions(nodeCount);

        // 更新节点坐标
        Object.values(graph.nodes).forEach((node, index) => {
            node.x = positions[index]?.x || 0;
            node.y = positions[index]?.y || 0;
        });

        // 在绘制节点前清空旧元素
        this.svg.selectAll(".node, .link, .edge-label").remove();

        // 绘制边
        const links = this.svg.selectAll(".link")
            .data(Object.values(graph.edges), d => d.id);

        // 简化高亮边的实现 - 使用CSS类并统一使用直线
        links.enter().append("path")
            .attr("class", d => graph.highlightedEdges.has(d.id) ? "link highlighted" : "link")
            .attr("d", d => {
                const source = graph.nodes[d.source];
                const target = graph.nodes[d.target];
                return `M${source.x},${source.y} L${target.x},${target.y}`;
            })
            .attr("marker-end", d => `url(#${graph.highlightedEdges.has(d.id) ? "highlighted-arrow" : "arrow"})`);

        // 添加边权重文字
        const edgeLabels = this.svg.selectAll(".edge-label")
            .data(Object.values(graph.edges), d => d.id);

        edgeLabels.enter()
            .append("text")
            .attr("class", d => graph.highlightedEdges.has(d.id) ? "edge-label highlighted" : "edge-label")
            .attr("x", d => {
                const source = graph.nodes[d.source];
                const target = graph.nodes[d.target];
                return (source.x + target.x) / 2;
            })
            .attr("y", d => {
                const source = graph.nodes[d.source];
                const target = graph.nodes[d.target];
                return (source.y + target.y) / 2;
            })
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .text(d => d.weight);

        // 绘制节点
        const nodes = this.svg.selectAll(".node-group")
            .data(Object.values(graph.nodes), d => d.id);

        // 新增节点处理
        const nodeEnter = nodes.enter().append("g")
            .attr("class", d => graph.highlightedNodes.has(d.id) ? "node highlighted" : "node")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        nodeEnter.append("circle")
            .attr("r", d => graph.highlightedNodes.has(d.id) ? this.config.highlightedRadius : this.config.nodeRadius);

        nodeEnter.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.value);

        // 更新所有节点位置
        nodes.merge(nodeEnter)
            .transition()
            .duration(500)
            .attr("transform", d => `translate(${d.x},${d.y})`);
    },

    // 高亮边 - 直接方法
    highlightEdge(graphId, edgeId) {
        // 高亮指定边
        GraphModel.highlightEdge(graphId, edgeId);
        // 更新可视化
        this.render(graphId);
        return Utils.delay(CONFIG.delay.standard);
    },

    // 取消高亮边 - 直接方法
    unhighlightEdge(graphId, edgeId) {
        // 取消高亮指定边
        GraphModel.unhighlightEdge(graphId, edgeId);
        // 更新可视化
        this.render(graphId);
        return Utils.delay(CONFIG.delay.standard);
    },

    // 新增正多边形坐标计算方法
    _calculatePolygonPositions(n) {
        if (n < 1) return [];
        const angleStep = (2 * Math.PI) / n;
        return Array.from({length: n}, (_, i) => ({
            x: this.layoutConfig.center.x + this.layoutConfig.radius * Math.cos(i * angleStep - Math.PI / 2),
            y: this.layoutConfig.center.y + this.layoutConfig.radius * Math.sin(i * angleStep - Math.PI / 2)
        }));
    },

    // 拖动处理（新增交互逻辑）
    dragstarted(event, d) {
        d3.select(event.sourceEvent.target.parentNode).raise(); // 拖动时提升当前节点
        d.fx = d.x;
        d.fy = d.y;
    },

    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    },

    dragended(event, d) {
        d.fx = null;
        d.fy = null;
        this.render();
    }
};
