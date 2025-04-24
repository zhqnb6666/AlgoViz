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
        radius: CONFIG.svgContainer.width / 3,    // 多边形半径
        center: {x: CONFIG.svgContainer.width / 2, y: CONFIG.svgContainer.graphHeight / 2}
    },

    init(containerId = "#graph-visualization") {
        const container = d3.select(containerId);
        const width = container.node().clientWidth;
        const height = container.node().clientHeight;

        container.selectAll("svg").remove();

//        this.svg = d3.select(containerId)
//            .append("svg")
//            .attr("width", CONFIG.svgContainer.width)
//            .attr("height", CONFIG.svgContainer.graphHeight);
        // 使用动态尺寸
        this.svg = container.append("svg")
            .attr("width", width)
            .attr("height", height);

        // 更新布局配置
        this.layoutConfig = {
            radius: Math.min(width, height) * 0.4,
            center: {
                x: width / 2,
                y: height / 2
            }
        };

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
            .attr("fill", d => d === "highlighted-arrow" ? "#ff7f0e" : "#666");

        const drag = d3.drag()
            .on("start", (e, d) => this.dragstarted(e, d))
            .on("drag", (e, d) => this.dragged(e, d))
            .on("end", (e, d) => this.dragended(e, d));

        this.svg.selectAll(".node").call(drag);

    },

    render(graphId) {
        const graph = GraphModel.graphs[graphId];
        if (!graph) return;

        // 计算正多边形布局
        const nodeCount = Object.keys(graph.nodes).length;
        const positions = this._calculatePolygonPositions(nodeCount);

        // 更新节点坐标时添加日志
        Object.values(graph.nodes).forEach((node, index) => {
            node.x = positions[index]?.x || 0;
            node.y = positions[index]?.y || 0;
            console.log(`节点 ${node.id} 坐标: (${node.x}, ${node.y})`);
        });

        // 在绘制节点前清空旧元素
        this.svg.selectAll(".node, .link").remove();

        // 绘制节点（保持原有样式逻辑）
        const nodes = this.svg.selectAll(".node")
            .data(Object.values(graph.nodes), d => d.id);

        // 退出节点处理
        nodes.exit().remove();

        // 新增节点处理
        const nodeEnter = nodes.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`);

//        nodeEnter.append("circle")
//            .attr("r", this.config.nodeRadius)
//            .attr("fill", "#fff")
//            .attr("stroke", "#333");
        nodeEnter.append("circle")
            .attr("r", d =>
                graph.highlightedNodes.has(d.id)
                    ? this.config.highlightedRadius
                    : this.config.nodeRadius
            )
            .attr("fill", d =>
                graph.highlightedNodes.has(d.id) ? "#FFB74D" : "#fff"
            )
            .attr("stroke", "#333");

//        nodeEnter.append("text")
//            .attr("dy", ".35em")
//            .attr("text-anchor", "middle");
        // 修改节点渲染部分
        nodeEnter.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.value) // 增加显示节点值
            .style("font-size", "12px")
            .style("fill", "#333")
            .style("user-select", "none"); // 防止文字被选中


        // 更新所有节点位置
        nodes.merge(nodeEnter)
            .transition()
            .duration(500)
            .attr("transform", d => `translate(${d.x},${d.y})`);

        // 绘制边（保持原有逻辑）
        const links = this.svg.selectAll(".link")
            .data(Object.values(graph.edges), d => d.id);

//        links.enter().append("path")
//            .attr("class", "link")
//            .merge(links)
//            .attr("d", d => {
//                const source = graph.nodes[d.source];
//                const target = graph.nodes[d.target];
//                return `M${source.x},${source.y} L${target.x},${target.y}`;
//            })
//            .attr("marker-end", d => `url(#${graph.highlightedEdges.has(d.id) ? "highlighted-arrow" : "arrow"})`)
//            .attr("stroke", d => graph.highlightedEdges.has(d.id) ? "#ff7f0e" : "#666")
//            .attr("stroke-width", this.config.linkWidth);


        links.enter().append("path")
            .attr("class", "link")
            .merge(links)
            .attr("d", d => {
                const source = graph.nodes[d.source];
                const target = graph.nodes[d.target];
                return `M${source.x},${source.y} L${target.x},${target.y}`;
            })
            .attr("marker-end", d => `url(#${graph.highlightedEdges.has(d.id) ? "highlighted-arrow" : "arrow"})`)
            .attr("stroke", d => graph.highlightedEdges.has(d.id) ? "#ff7f0e" : "#666")
            .attr("stroke-width", this.config.linkWidth);

        // 添加边权重文字（在links定义后添加）
        const edgeLabels = this.svg.selectAll(".edge-label")
            .data(Object.values(graph.edges), d => d.id);

        edgeLabels.enter()
            .append("text")
            .attr("class", "edge-label")
            .merge(edgeLabels)
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
            .text(d => d.weight)
            .style("font-size", "10px")
            .style("fill", "#666")
            .style("paint-order", "stroke")
            .style("stroke", "white")
            .style("stroke-width", "2px");

        edgeLabels.exit().remove();

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
