// 树可视化
const TreeVisualization = {
    // SVG元素
    svg: null,
    
    // 初始化树可视化
    init() {
        // 清除现有SVG
        d3.select("#tree-visualization").selectAll("*").remove();
        
        // 检查是否有树数据
        const treeCount = Object.keys(TreeModel.trees).length;
        
        // 如果没有数据，不创建SVG，只清空容器
        if (treeCount === 0) {
            this.svg = null;
            return;
        }
        
        // 创建新的SVG容器
        this.svg = d3.select("#tree-visualization")
            .append("svg")
            .attr("width", CONFIG.svgContainer.width)
            .attr("height", CONFIG.svgContainer.treeHeight)
            .append("g")
            .attr("transform", `translate(${CONFIG.svgContainer.width/4}, 50)`);
            
        // 定义箭头标记
        this.svg.append("defs").append("marker")
            .attr("id", "tree-arrowhead")
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 18)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#999");
            
        // 渲染树
        this.render();
    },
    
    // 渲染树
    render() {
        if (!this.svg) return;
        
        // 清除现有元素
        this.svg.selectAll(".tree-link, .tree-node").remove();
        
        let hasRenderedTree = false;
        
        // 遍历所有树并可视化
        for (const treeName in TreeModel.trees) {
            const treeRoot = TreeModel.trees[treeName];
            if (!treeRoot) continue;
            
            hasRenderedTree = true;
            
            // 使用d3.hierarchy获取层次结构
            const root = d3.hierarchy(treeRoot);
            
            // 定义树形布局
            const treeLayout = d3.tree().size([800, 400]);
            
            // 应用树形布局
            treeLayout(root);
            
            // 绘制连线
            const links = this.svg.selectAll(`.tree-link-${treeName}`)
                .data(root.links())
                .enter()
                .append("path")
                .attr("class", "link tree-link")
                .attr("marker-end", "url(#tree-arrowhead)")
                .attr("d", d => `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`);
            
            // 绘制节点
            const nodes = this.svg.selectAll(`.tree-node-${treeName}`)
                .data(root.descendants())
                .enter()
                .append("g")
                .attr("class", "node tree-node")
                .attr("transform", d => `translate(${d.x},${d.y})`);
            
            // 节点的圆形
            nodes.append("circle")
                .attr("r", CONFIG.visualization.tree.nodeRadius)
                .on("mouseover", function(event, d) {
                    d3.select(this).transition().duration(300)
                        .attr("r", CONFIG.visualization.tree.highlightedNodeRadius);
                })
                .on("mouseout", function(event, d) {
                    d3.select(this).transition().duration(300)
                        .attr("r", CONFIG.visualization.tree.nodeRadius);
                });
            
            // 节点的文本
            nodes.append("text")
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .text(d => d.data.value);
        }
        
        // 如果没有树被渲染，添加一个提示文本
        if (!hasRenderedTree) {
            this.svg.append("text")
                .attr("x", 400)
                .attr("y", 200)
                .attr("text-anchor", "middle")
                .attr("font-size", "16px")
                .attr("fill", "#999")
                .text("等待树结构数据...");
        }
    },
    
    // 高亮节点
    highlightNode(nodeId, animationSpeed) {
        if (!this.svg) return Promise.resolve();
        
        // 找到对应节点
        this.svg.selectAll(".tree-node")
            .filter(d => d.data && d.data.id === nodeId)
            .classed("highlighted-node", true)
            .select("circle")
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed)
            .attr("r", CONFIG.visualization.tree.highlightedNodeRadius);
            
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },
    
    // 取消高亮节点
    unhighlightNode(nodeId, animationSpeed) {
        this.svg.selectAll(".tree-node")
            .filter(d => d.data && d.data.id === nodeId)
            .classed("highlighted-node", false)
            .select("circle")
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed)
            .attr("r", CONFIG.visualization.tree.nodeRadius);
            
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },
    
    // 高亮连接
    highlightLink(sourceId, targetId, animationSpeed) {
        this.svg.selectAll(".tree-link")
            .filter(d => d.source.data.id === sourceId && d.target.data.id === targetId)
            .classed("highlighted-link", true)
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed);
            
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },
    
    // 取消高亮连接
    unhighlightLink(sourceId, targetId, animationSpeed) {
        this.svg.selectAll(".tree-link")
            .filter(d => d.source.data.id === sourceId && d.target.data.id === targetId)
            .classed("highlighted-link", false)
            .transition()
            .duration(CONFIG.delay.highlight / animationSpeed);
            
        return Utils.delay(CONFIG.delay.highlight, animationSpeed);
    },
    
    // 动画更新
    animateUpdate(animationSpeed) {
        this.render();
        return Utils.delay(CONFIG.delay.standard, animationSpeed);
    }
};
