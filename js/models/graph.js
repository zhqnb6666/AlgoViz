// ==================== 图模型 ====================
const GraphModel = {
    // 数据存储 (复用链表模型结构)
    graphs: {}, // {graphId: {nodes: {}, edges: {}, directed: boolean}}

    // 错误处理方法 (复用链表实现)
    _validateGraphExists(graphId) {
        if (!this.graphs[graphId]) {
            throw new Error(`图 ${graphId} 不存在`);
        }
    },

    _validateNodeExists(graphId, nodeId) {
        this._validateGraphExists(graphId);
        if (!this.graphs[graphId].nodes[nodeId]) {
            throw new Error(`节点 ${nodeId} 不存在于图 ${graphId}`);
        }
    },

    // 创建图 (增强链表模型)
    createGraph(graphId, directed = false) {
        if (this.graphs[graphId]) {
            throw new Error(`图 ${graphId} 已存在`);
        }
        this.graphs[graphId] = {
            nodes: {},
            edges: {},
            directed,
            highlightedNodes: new Set(), // 复用链表高亮状态管理
            highlightedEdges: new Set()
        };
        return this.graphs[graphId];
    },

    // 添加节点 (增加属性支持)
    addNode(graphId, nodeId, value = null, attributes = {}) {
        this._validateGraphExists(graphId);
        const graph = this.graphs[graphId];

        graph.nodes[nodeId] = {
            id: nodeId,
            value,
            attributes: {...attributes}, // 深拷贝属性
            edges: new Set(), // 连接的边ID集合
        };
        return graph.nodes[nodeId];
    },

    // 删除节点 (增强边处理)
    removeNode(graphId, nodeId) {
        this._validateNodeExists(graphId, nodeId);
        const graph = this.graphs[graphId];
        const node = graph.nodes[nodeId];

        // 删除关联边（复用链表删除关联节点逻辑）
        [...node.edges].forEach(edgeId => this.removeEdge(graphId, edgeId));

        delete graph.nodes[nodeId];
        return true;
    },

    // 添加边 (增强权重支持)
    addEdge(graphId, edgeId, sourceId, targetId, weight = 1, attributes = {}) {
        this._validateNodeExists(graphId, sourceId);
        this._validateNodeExists(graphId, targetId);
        const graph = this.graphs[graphId];

        graph.edges[edgeId] = {
            id: edgeId,
            source: sourceId,
            target: targetId,
            weight,
            attributes: {...attributes},
            directed: graph.directed
        };

        // 更新节点关联（复用链表节点连接逻辑）
        graph.nodes[sourceId].edges.add(edgeId);
        if (!graph.directed) {
            graph.nodes[targetId].edges.add(edgeId);
        }
        return graph.edges[edgeId];
    },

    // 更新节点 (复用链表更新逻辑)
    updateNode(graphId, nodeId, newValue, newAttributes) {
        this._validateNodeExists(graphId, nodeId);
        const node = this.graphs[graphId].nodes[nodeId];

        if (newValue !== undefined) node.value = newValue;
        Object.assign(node.attributes, newAttributes);
        return node;
    },

    // 高亮节点 (复用链表高亮机制)
    highlightNode(graphId, nodeId) {
        this._validateNodeExists(graphId, nodeId);
        this.graphs[graphId].highlightedNodes.add(nodeId);
    },

    unhighlightNode(graphId, nodeId) {
        this.graphs[graphId].highlightedNodes.delete(nodeId);
    },

    // 高亮边（新增方法）
    highlightEdge(graphId, edgeId) {
        if (!this.graphs[graphId].edges[edgeId]) {
            throw new Error(`边 ${edgeId} 不存在`);
        }
        this.graphs[graphId].highlightedEdges.add(edgeId);
    },

    unhighlightEdge(graphId, edgeId) {
        this.graphs[graphId].highlightedEdges.delete(edgeId);
    },

    mergeNodes(graphId, nodeIds, newNodeId, value) {
        const graph = this.graphs[graphId];
        const mergedNode = this.addNode(graphId, newNodeId, value, {
            color: "#ff7f0e",
            size: 30
        });

        // 新增：记录需要清理的边
        const edgesToRemove = new Set();

        nodeIds.forEach(nodeId => {
            const node = graph.nodes[nodeId];
            [...node.edges].forEach(edgeId => {
                const edge = graph.edges[edgeId];

                // 修改前
                // if (edge.source === nodeId) edge.source = newNodeId;
                // if (edge.target === nodeId) edge.target = newNodeId;

                // 修改后：检查是否形成自环边
                const originalSource = edge.source;
                const originalTarget = edge.target;

                if (edge.source === nodeId) edge.source = newNodeId;
                if (edge.target === nodeId) edge.target = newNodeId;

                // 如果边两端都指向新节点，则标记删除
                if (edge.source === newNodeId && edge.target === newNodeId) {
                    edgesToRemove.add(edgeId);
                }
            });
            this.removeNode(graphId, nodeId);
        });

        // 新增：清理自环边
        edgesToRemove.forEach(edgeId => {
            this.removeEdge(graphId, edgeId);
        });

        return mergedNode;
    }
    ,

    // 收缩边
    contractEdge(graphId, edgeId, newNodeId) {
        const graph = this.graphs[graphId];
        const edge = graph.edges[edgeId];
        if (!edge) throw new Error(`边 ${edgeId} 不存在`);

        const newNode = this.mergeNodes(graphId, [edge.source, edge.target], newNodeId,
            graph.nodes[edge.source].value + graph.nodes[edge.target].value);

        return newNode;
    },
    // 在graph.js的GraphModel中添加
    updateEdge(graphId, edgeId, newWeight, newAttributes) {
        this._validateGraphExists(graphId);
        const edge = this.graphs[graphId].edges[edgeId];
        if (!edge) throw new Error(`边 ${edgeId} 不存在`);

        if (newWeight !== undefined) edge.weight = newWeight;
        Object.assign(edge.attributes, newAttributes);
        return edge;
    },

    // 在graph.js的GraphModel中添加
    removeEdge(graphId, edgeId) {
        this._validateGraphExists(graphId);
        const graph = this.graphs[graphId];
        const edge = graph.edges[edgeId];
        //if (!edge) throw new Error(`边 ${edgeId} 不存在`);
        if (!edge) return false; // 如果边不存在，直接返回false

        // 从关联节点中移除边引用
        const sourceNode = graph.nodes[edge.source];
        const targetNode = graph.nodes[edge.target];
        if (sourceNode) sourceNode.edges.delete(edgeId);
        if (targetNode && !graph.directed) targetNode.edges.delete(edgeId);

        // 移除边的高亮状态
        graph.highlightedEdges.delete(edgeId);

        // 删除边本身
        delete graph.edges[edgeId];
        return true;
    },

    // 在graph.js的GraphModel中添加
    getNeighbors(graphId, nodeId) {
        this._validateNodeExists(graphId, nodeId);
        const graph = this.graphs[graphId];
        const neighbors = new Set();

        Object.values(graph.edges).forEach(edge => {
            if (edge.source === nodeId) neighbors.add(edge.target);
            if (!graph.directed && edge.target === nodeId) neighbors.add(edge.source);
        });

        return Array.from(neighbors);
    }


};

