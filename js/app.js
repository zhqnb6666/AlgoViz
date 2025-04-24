// 主应用入口
const {createApp, ref, computed, onMounted, watch} = Vue;

createApp({
    setup() {
        // 全局控制变量
        const isPaused = ref(true);
        const isRunning = ref(false);
        const currentStep = ref(0);
        const animationSpeed = ref(CONFIG.animation.defaultSpeed);
        const currentOperation = ref('准备就绪');
        const activeTab = ref('全部');
        // 添加操作锁，防止快速重复点击
        const isOperationLocked = ref(false);

        // 控制各数据结构容器显示的变量
        const showArrayContainer = ref(false);
        const showLinkedListContainer = ref(false);
        const showTreeContainer = ref(false);
        const showGraphContainer = ref(false);

        // 预定义操作队列
        const operationQueue = ref(defaultOperations);

        // 计算属性
        const progress = computed(() => {
            return operationQueue.value.length
                ? Math.min(100, Math.round((currentStep.value / operationQueue.value.length) * 100))
                : 0;
        });

        const progressText = computed(() => {
            return `${currentStep.value}/${operationQueue.value.length} 步`;
        });


        // 执行单步操作
        const executeStep = async () => {
            // 如果操作被锁定，则不执行
            if (isOperationLocked.value) return false;

            // 如果已经执行完所有步骤，则退出
            if (currentStep.value >= operationQueue.value.length) {
                currentOperation.value = "可视化完成";
                isRunning.value = false;
                return false;
            }

            try {
                // 锁定操作
                isOperationLocked.value = true;

                const operation = operationQueue.value[currentStep.value];
                currentOperation.value = operation.metadata || "执行操作";

                // 根据操作类型预先显示容器
                if (operation.operation.startsWith("create_array") ||
                    operation.operation === "swap_elements" ||
                    operation.operation === "highlight" ||
                    operation.operation === "unhighlight") {
                    showArrayContainer.value = true;
                } else if (operation.operation.includes("graph") ||
                    operation.operation === 'add_node' ||
                    operation.operation === 'add_edge' ||
                    operation.operation === 'merge_nodes' ||
                    operation.operation === 'remove_node' ||
                    operation.operation === 'remove_edge' ||
                    operation.operation === 'contract_edge' ||
                    operation.operation === 'get_neighbors' ||
                    operation.operation === 'update_node' ||
                    operation.operation === 'update_edge' ||
                    operation.operation === 'highlight_node' ||
                    operation.operation === 'unhighlight_node' ||
                    operation.operation === 'highlight_edge' ||
                    operation.operation === 'unhighlight_edge') {

                    showGraphContainer.value = true;
                } else if (operation.operation.includes("list") ||
                    operation.operation.includes("node") ||
                    operation.operation.includes("append") ||
                    operation.operation.includes("prepend") ||
                    operation.operation.includes("merge")) {
                    showLinkedListContainer.value = true;
                } else if (operation.operation.includes("tree") ||
                    operation.operation.includes("root") ||
                    operation.operation.includes("child")) {
                    showTreeContainer.value = true;
                }

                // // 特殊处理第一次create操作，确保初始化正确完成
                // if (operation.operation === "create_array" && 
                //     (!ArrayVisualization.svg || Object.keys(ArrayModel.data).length === 0)) {
                //     await handleCreateArray(operation.data);
                //     currentStep.value++;
                //     isOperationLocked.value = false;
                //     return true;
                // } else if (operation.operation === "create_list" && 
                //           (!LinkedListVisualization.svg || 
                //           Object.keys(LinkedListModel.lists).filter(k => LinkedListModel.lists[k]).length === 0)) {
                //     await handleCreateList(operation.data);
                //     currentStep.value++;
                //     isOperationLocked.value = false;
                //     return true;
                // } else if (operation.operation === "create_root" && 
                //           (!TreeVisualization.svg || Object.keys(TreeModel.trees).length === 0)) {
                //     await handleCreateRoot(operation.data);
                //     currentStep.value++;
                //     isOperationLocked.value = false;
                //     return true;
                // }

                switch (operation.operation) {
                    // 数组操作
                    case "create_array":
                        await handleCreateArray(operation.data);
                        break;
                    case "swap_elements":
                        await handleSwapElements(operation.data);
                        break;
                    case "highlight":
                        await handleHighlight(operation.data);
                        break;
                    case "unhighlight":
                        await handleUnhighlight(operation.data);
                        break;

                    // 链表操作
                    case "create_list":
                        await handleCreateList(operation.data);
                        break;
                    case "append_node":
                        await handleAppendNode(operation.data);
                        break;
                    case "prepend_node":
                        await handlePrependNode(operation.data);
                        break;
                    case "insert_after":
                        await handleInsertAfter(operation.data);
                        break;
                    case "insert_before":
                        await handleInsertBefore(operation.data);
                        break;
                    case "remove_node":
                        await handleRemoveNode(operation.data);
                        break;
                    case "highlight_node":
                        await handleHighlightNode(operation.data);
                        break;
                    case "unhighlight_node":
                        await handleUnhighlightNode(operation.data);
                        break;
                    case "highlight_link":
                        await handleHighlightLink(operation.data);
                        break;
                    case "unhighlight_link":
                        await handleUnhighlightLink(operation.data);
                        break;
                    case "update_value":
                        await handleUpdateValue(operation.data);
                        break;
                    case "reverse_list":
                        await handleReverseList(operation.data);
                        break;
                    case "merge_lists":
                        await handleMergeLists(operation.data);
                        break;
                    case "split_list":
                        await handleSplitList(operation.data);
                        break;
                    case "swap_nodes":
                        await handleSwapNodes(operation.data);
                        break;

                    // 树操作
                    case "create_root":
                        await handleCreateRoot(operation.data);
                        break;
                    case "add_child":
                        await handleAddChild(operation.data);
                        break;
                    case "remove_tree_node":
                        await handleRemoveTreeNode(operation.data);
                        break;
                    case "highlight_tree_node":
                        await handleHighlightTreeNode(operation.data);
                        break;
                    case "unhighlight_tree_node":
                        await handleUnhighlightTreeNode(operation.data);
                        break;

                    // 图操作
                    case "create_graph":
                        await handleCreateGraph(operation.data);
                        break;
                    case "add_node":
                        await handleAddGraphNode(operation.data);
                        break;
                    case "add_edge":
                        await handleAddGraphEdge(operation.data);
                        break;
                    case "highlight_graph_node":
                        await handleHighlightGraphNode(operation.data);
                        break;
                    case "unhighlight_graph_node":
                        await handleUnhighlightGraphNode(operation.data);
                        break;
                    case "update_node":
                        await handleUpdateGraphNode(operation.data);
                        break;
                    case "remove_edge":
                        await handleRemoveGraphEdge(operation.data);
                        break;
                    case "contract_edge":
                        await handleContractEdge(operation.data);
                        break;
                    case "merge_nodes":
                        await handleMergeNodes(operation.data);
                        break;
                    case "get_neighbors":
                        await handleGetNeighbors(operation.data);
                        break;

                    default:
                        console.warn(`未知操作: ${operation.operation}`);
                }

                // 增加步骤计数
                currentStep.value++;

                // 解锁操作
                isOperationLocked.value = false;
                return true;
            } catch (error) {
                console.error(`执行操作时出错:`, error);
                currentOperation.value = `操作执行失败: ${error.message}`;
                // 发生错误时也要解锁
                isOperationLocked.value = false;
                return false;
            }
        };

        // ==================== 操作处理函数 ====================

        // 数组操作处理
        const handleCreateArray = async (data) => {
            ArrayVisualization.init();
            showArrayContainer.value = true;
            await Utils.delay(1000);
            ArrayModel.create(data.id, data.array);
            ArrayVisualization.init();

            // 重要：只有在有数据时才渲染
            if (Object.keys(ArrayModel.data).length > 0) {
                ArrayVisualization.render();
            }

            return Utils.delay(CONFIG.delay.standard, animationSpeed.value);
        };

        const handleSwapElements = async (data) => {
            ArrayModel.swap(data.id, data.indices[0], data.indices[1]);
            return ArrayVisualization.animateSwap(data.id, data.indices[0], data.indices[1], animationSpeed.value);
        };

        const handleHighlight = async (data) => {
            ArrayModel.highlight(data.id, data.indices, data.color);
            return ArrayVisualization.animateHighlight(data.id, data.indices, data.color, animationSpeed.value);
        };

        const handleUnhighlight = async (data) => {
            ArrayModel.unhighlight(data.id, data.indices);
            return ArrayVisualization.animateUnhighlight(data.id, data.indices, animationSpeed.value);
        };

        // 链表操作处理
        const handleCreateList = async (data) => {
            // 先显示容器，再创建数据
            showLinkedListContainer.value = true;
            LinkedListVisualization.init();
            await Utils.delay(1000);
            LinkedListModel.createList(data.list_name, data.value, data.id);
            LinkedListVisualization.init();
            return Utils.delay(CONFIG.delay.standard, animationSpeed.value);
        };

        const handleAppendNode = async (data) => {
            LinkedListModel.appendNode(data.list_name, data.value, data.id);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        const handlePrependNode = async (data) => {
            LinkedListModel.prependNode(data.list_name, data.value, data.id);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        const handleInsertAfter = async (data) => {
            LinkedListModel.insertAfter(data.target_id, data.value, data.id, data.list_name);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        const handleInsertBefore = async (data) => {
            LinkedListModel.insertBefore(data.target_id, data.value, data.id, data.list_name);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        const handleRemoveNode = async (data) => {
            LinkedListModel.removeNode(data.id, data.list_name);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        const handleHighlightNode = async (data) => {
            return LinkedListVisualization.highlightNode(data.id, animationSpeed.value);
        };

        const handleUnhighlightNode = async (data) => {
            return LinkedListVisualization.unhighlightNode(data.id, animationSpeed.value);
        };

        const handleHighlightLink = async (data) => {
            return LinkedListVisualization.highlightLink(data.source_id, data.target_id, animationSpeed.value);
        };

        const handleUnhighlightLink = async (data) => {
            return LinkedListVisualization.unhighlightLink(data.source_id, data.target_id, animationSpeed.value);
        };

        const handleUpdateValue = async (data) => {
            LinkedListModel.updateValue(data.id, data.value);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        const handleReverseList = async (data) => {
            LinkedListModel.reverseList(data.list_name);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        const handleMergeLists = async (data) => {
            LinkedListModel.mergeLists(data.list1_name, data.list2_name, data.new_list_id);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        const handleSplitList = async (data) => {
            LinkedListModel.splitList(data.list_name, data.split_after_id, data.new_list_id);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        const handleSwapNodes = async (data) => {
            LinkedListModel.swapNodes(data.id1, data.id2);
            return LinkedListVisualization.animateUpdate(animationSpeed.value);
        };

        // 树操作处理
        const handleCreateRoot = async (data) => {
            showTreeContainer.value = true;
            TreeVisualization.init();
            await Utils.delay(1000);
            TreeModel.createRoot(data.tree_name, data.value, data.id);
            TreeVisualization.init();
            return Utils.delay(CONFIG.delay.standard, animationSpeed.value);
        };

        const handleAddChild = async (data) => {
            TreeModel.addChild(data.parent_id, data.value, data.id);
            return TreeVisualization.animateUpdate(animationSpeed.value);
        };

        const handleRemoveTreeNode = async (data) => {
            TreeModel.removeNode(data.id, data.tree_name);
            return TreeVisualization.animateUpdate(animationSpeed.value);
        };

        const handleHighlightTreeNode = async (data) => {
            return TreeVisualization.highlightNode(data.id, animationSpeed.value);
        };

        const handleUnhighlightTreeNode = async (data) => {
            return TreeVisualization.unhighlightNode(data.id, animationSpeed.value);
        };

        // 图操作处理
        // 添加图操作处理函数
        const handleCreateGraph = async (data) => {
            showGraphContainer.value = true;
            await Utils.delay(1000);

            GraphVisualization.init('#graph-visualization');
            await GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);

            GraphModel.createGraph(data.id, data.directed);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleAddGraphNode = async (data) => {
            GraphModel.addNode(data.graph_id, data.id, data.value, data.attributes);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleAddGraphEdge = async (data) => {
            GraphModel.addEdge(
                data.graph_id,
                data.id,
                data.source_id || data.source,
                data.target_id || data.target,
                data.weight,
                data.attributes
            );
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleHighlightGraphNode = async (data) => {
            GraphModel.highlightNode(data.graph_id, data.id);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleUnhighlightGraphNode = async (data) => {
            GraphModel.unhighlightNode(data.graph_id, data.id);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleUpdateGraphNode = async (data) => {
            GraphModel.updateNode(data.graph_id, data.id, data.value, data.attributes);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleContractEdge = async (data) => {
            GraphModel.contractEdge(data.graph_id, data.edge_id, data.new_node_id);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);

        };

        const handleMergeNodes = async (data) => {

            GraphModel.mergeNodes(data.graph_id, data.nodes, data.new_node_id, data.value);


            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleGetNeighbors = async (data) => {
            const neighbors = GraphModel.getNeighbors(
                data.graph_id,
                data.node_id
            );

            // 高亮邻居节点
            neighbors.forEach(id =>
                GraphModel.highlightNode(data.graph_id, id)
            );
            GraphVisualization.render(data.graph_id);

            // 保持高亮1秒
            await new Promise(r => setTimeout(r, 1000));

            // 取消高亮
            neighbors.forEach(id =>
                GraphModel.unhighlightNode(data.graph_id, id)
            );
            GraphVisualization.render(data.graph_id);

            console.log(`节点 ${data.node_id} 的邻居:`, neighbors);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);

        };
        const handleRemoveGraphEdge = async (data) => {

            GraphModel.removeEdge(data.graph_id, data.id);

            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        }


        // 执行队列
        const executeQueue = async () => {
            while (!isPaused.value && isRunning.value && currentStep.value < operationQueue.value.length) {
                const success = await executeStep();
                if (!success) break;

                // 在每一步之间添加小延迟，避免界面卡顿
                await Utils.delay(CONFIG.delay.transition, animationSpeed.value);
            }
        };

        // 控制函数
        const startVisualization = () => {
            // 如果操作被锁定，不执行
            if (isOperationLocked.value) return;

            isRunning.value = true;
            isPaused.value = false;
            executeQueue();
        };

        const pauseVisualization = () => {
            isPaused.value = true;
        };

        const stepVisualization = async () => {
            // 如果操作被锁定，不执行
            if (isOperationLocked.value) return;

            if (!isRunning.value) {
                isRunning.value = true;
            }
            isPaused.value = true;
            await executeStep();
        };

        // 重置函数
        const resetVisualization = () => {
            // 如果操作被锁定，不执行
            if (isOperationLocked.value) return;

            isPaused.value = true;
            isRunning.value = false;
            currentStep.value = 0;
            currentOperation.value = "准备就绪";

            // 重置数据模型
            // 重置数组为空
            ArrayModel.data = {};
            ArrayModel.highlighted = {};
            ArrayModel.highlightColors = {};
            ArrayModel.elementIndices = {};

            // 重置链表
            LinkedListModel.lists = {};
            LinkedListModel.nodes = {};

            // 重置树
            TreeModel.trees = {};
            TreeModel.nodes = {};

            // 重置图
            GraphModel.graphs = {};


            // 重置容器显示状态
            showArrayContainer.value = false;
            showLinkedListContainer.value = false;
            showTreeContainer.value = false;
            showGraphContainer.value = false;

            // 清除所有可视化区域，但不创建新的SVG
            d3.select("#array-visualization").selectAll("*").remove();
            d3.select("#linked-list-visualization").selectAll("*").remove();
            d3.select("#tree-visualization").selectAll("*").remove();
            d3.select("#graph-visualization").selectAll("*").remove();

            // 重置可视化组件的SVG引用
            ArrayVisualization.svg = null;
            LinkedListVisualization.svg = null;
            LinkedListVisualization.nodesData = [];
            LinkedListVisualization.linksData = [];
            TreeVisualization.svg = null;
            GraphVisualization.svg = null;

        };

        // 组件挂载后初始化
        onMounted(() => {
            // 初始不显示任何容器
            showArrayContainer.value = false;
            showLinkedListContainer.value = false;
            showTreeContainer.value = false;
            showGraphContainer.value = false;

            // 不预先初始化可视化组件，等到实际需要时才初始化
            // 确保状态清晰
            currentOperation.value = "准备就绪";

            // 确保可视化组件的SVG引用为null
            ArrayVisualization.svg = null;
            LinkedListVisualization.svg = null;
            LinkedListVisualization.nodesData = [];
            LinkedListVisualization.linksData = [];
            TreeVisualization.svg = null;
            GraphVisualization.svg = null;
        });

        return {
            isPaused,
            isRunning,
            currentStep,
            animationSpeed,
            currentOperation,
            progress,
            progressText,
            startVisualization,
            pauseVisualization,
            stepVisualization,
            resetVisualization,
            activeTab,
            isOperationLocked,

            // 容器显示状态
            showArrayContainer,
            showLinkedListContainer,
            showTreeContainer,
            showGraphContainer
        };
    }
}).mount("#app"); 