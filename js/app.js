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
        // 代码相关变量
        const codeLoaded = ref(false);
        const codeFile = ref('');

        // 控制各数据结构容器显示的变量
        const showArrayContainer = ref(false);
        const showLinkedListContainer = ref(false);
        const showTreeContainer = ref(false);
        const showArray2DContainer = ref(false);
        const showGraphContainer = ref(false);
        const showVariableContainer = ref(false);

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
                
                // 处理代码高亮
                if (operation.position !== undefined && codeLoaded.value) {
                    await CodeVisualization.highlightLine(operation.position-1, animationSpeed.value);
                }

                // 根据操作类型预先显示容器
                if (operation.operation.startsWith("create_array")&&!(operation.operation.startsWith("create_array2d"))) {
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
                } else if (operation.operation === 'add_variable' ||
                    operation.operation === 'update_variable' ||
                    operation.operation === 'delete_variable') {
                    // 变量区始终显示，无需设置showVariableContainer
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


                switch (operation.operation) {
                    // 数组操作
                    case "create_array":
                        await handleCreateArray(operation.data);
                        break;
                    case "highlight":
                        await handleHighlight(operation.data);
                        break;
                    case "unhighlight":
                        await handleUnhighlight(operation.data);
                        break;
                    case "update_element":
                        await handleUpdateElement(operation.data);
                        break;
                    case "update_elements":
                        await handleUpdateElements(operation.data);
                        break;
                    case "update_array":
                        await handleUpdateArray(operation.data);
                        break;
                    case "insert_element":
                        await handleInsertElement(operation.data);
                        break;
                    case "remove_element":
                        await handleRemoveElement(operation.data);
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

                    // 二维数组操作
                    case "create_array2d":
                        await handleCreateArray2D(operation.data);
                        break;
                    case "swap_elements2d":
                        await handleSwapElements2D(operation.data);
                        break;
                    case "highlight2d":
                        await handleHighlight2D(operation.data);
                        break;
                    case "unhighlight2d":
                        await handleUnhighlight2D(operation.data);
                        break;
                    case "swap_rows2d":
                        await handleSwapRows2D(operation.data);
                        break;
                    case "swap_columns2d":
                        await handleSwapColumns2D(operation.data);
                        break;
                    case "transpose2d":
                        await handleTranspose2D(operation.data);
                        break;
                    case "update_element2d":
                        await handleUpdateElement2D(operation.data);
                        break;
                    case "add_row2d":
                        await handleAddRow2D(operation.data);
                        break;
                    case "add_column2d":
                        await handleAddColumn2D(operation.data);
                        break;
                    case "remove_row2d":
                        await handleRemoveRow2D(operation.data);
                        break;
                    case "remove_column2d":
                        await handleRemoveColumn2D(operation.data);
                        break;
                    case "resize2d":
                        await handleResize2D(operation.data);
                        break;
                    case "subarray2d":
                        await handleSubarray2D(operation.data);
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
                    case "highlight_edge":
                        await handleHighlightEdge(operation.data);
                        break;
                    case "unhighlight_edge":
                        await handleUnhighlightEdge(operation.data);
                        break;
                    case "update_node":
                        await handleUpdateGraphNode(operation.data);
                        break;
                    case "update_edge":
                        await handleUpdateEdge(operation.data);
                        break;
                    case "remove_edge":
                        await handleRemoveGraphEdge(operation.data);
                        break;
                    case "remove_graph_node":
                        await handleRemoveGraphNode(operation.data);
                        break;
                    case "contract_edge":
                        await handleContractEdge(operation.data);
                        break;
                    case "get_neighbors":
                        await handleGetNeighbors(operation.data);
                        break;

                    // 变量操作
                    case "add_variable":
                        await handleAddVariable(operation.data);
                        break;
                    case "update_variable":
                        await handleUpdateVariable(operation.data);
                        break;
                    case "delete_variable":
                        await handleDeleteVariable(operation.data);
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

        const handleHighlight = async (data) => {
            ArrayModel.highlight(data.id, data.indices, data.color);
            return ArrayVisualization.animateHighlight(data.id, data.indices, data.color, animationSpeed.value);
        };

        const handleUnhighlight = async (data) => {
            ArrayModel.unhighlight(data.id, data.indices);
            return ArrayVisualization.animateUnhighlight(data.id, data.indices, animationSpeed.value);
        };


        const handleUpdateElement = async (data) => {
            ArrayModel.updateElement(data.id, data.index, data.value);
            return ArrayVisualization.animateUpdateElement(data.id, data.index, data.value, animationSpeed.value);
        };

        const handleUpdateElements = async (data) => {
            ArrayModel.updateElements(data.id, data.updates);
            return ArrayVisualization.animateUpdateElements(data.id, data.updates, animationSpeed.value);
        };

        const handleUpdateArray = async (data) => {
            ArrayModel.updateArray(data.id, data.array);
            return ArrayVisualization.animateUpdateArray(data.id, animationSpeed.value);
        };

        const handleInsertElement = async (data) => {
            ArrayModel.insertElement(data.id, data.index, data.value);
            return ArrayVisualization.animateInsertElement(data.id, data.index, data.value, animationSpeed.value);
        };

        const handleRemoveElement = async (data) => {
            ArrayModel.removeElement(data.id, data.index);
            return ArrayVisualization.animateRemoveElement(data.id, data.index, animationSpeed.value);
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
            try {
                // 添加边，GraphModel.addEdge 会自动处理不存在的节点
                const edge = GraphModel.addEdge(
                    data.graph_id,
                    data.id,
                    data.source_id ?? data.source,
                    data.target_id ?? data.target,
                    data.weight,
                    data.attributes
                );
                
                // 如果有新节点被创建，需要更新当前操作信息
                const sourceNode = edge.source;
                const targetNode = edge.target;
                
                if (data.source_id === undefined && data.source === undefined) {
                    currentOperation.value += ` (自动创建节点: ${sourceNode})`;
                }
                
                if (data.target_id === undefined && data.target === undefined) {
                    currentOperation.value += ` (自动创建节点: ${targetNode})`;
                }
                
                return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
            } catch (error) {
                console.error("添加边时出错:", error);
                currentOperation.value = `错误: ${error.message}`;
                return Promise.resolve();
            }
        };

        const handleHighlightGraphNode = async (data) => {
            GraphModel.highlightNode(data.graph_id, data.id);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleUnhighlightGraphNode = async (data) => {
            GraphModel.unhighlightNode(data.graph_id, data.id);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleHighlightEdge = async (data) => {
            GraphModel.highlightEdge(data.graph_id, data.id);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        }

        const handleUnhighlightEdge = async (data) => {
            GraphModel.unhighlightEdge(data.graph_id, data.id);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        }

        const handleUpdateGraphNode = async (data) => {
            GraphModel.updateNode(data.graph_id, data.id, data.value, data.attributes);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        };

        const handleUpdateEdge = async (data) => {
            GraphModel.updateEdge(data.graph_id, data.id, data.weight, data.attributes);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        }

        const handleContractEdge = async (data) => {
            GraphModel.contractEdge(data.graph_id, data.edge_id, data.new_node_id);
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

        const handleRemoveGraphNode = async (data) => {
            GraphModel.removeNode(data.graph_id, data.id);
            return GraphVisualization.animateUpdate(animationSpeed.value, data.graph_id);
        }





        // 二维数组操作处理
        const handleCreateArray2D = async (data) => {
            Array2DVisualization.init();
            showArray2DContainer.value = true;
            await Utils.delay(1000);
            Array2DModel.create(data.id, data.array);
            Array2DVisualization.init();
            return Utils.delay(CONFIG.delay.standard, animationSpeed.value);
        };

        const handleSwapElements2D = async (data) => {
            Array2DModel.swapElements(data.id, data.pos1, data.pos2);
            return Array2DVisualization.animateElementSwap(data.id, data.pos1, data.pos2, animationSpeed.value);
        };

        const handleHighlight2D = async (data) => {
            Array2DModel.highlightElements(data.id, data.positions, data.color);
            return Array2DVisualization.animateHighlight(data.id, data.positions, data.color, animationSpeed.value);
        };

        const handleUnhighlight2D = async (data) => {
            Array2DModel.unhighlightElements(data.id, data.positions);
            return Array2DVisualization.animateUnhighlight(data.id, data.positions, animationSpeed.value);
        };

        const handleSwapRows2D = async (data) => {
            Array2DModel.swapRows(data.id, data.row1, data.row2);
            return Array2DVisualization.animateRowSwap(data.id, data.row1, data.row2, animationSpeed.value);
        };

        const handleSwapColumns2D = async (data) => {
            Array2DModel.swapColumns(data.id, data.col1, data.col2);
            return Array2DVisualization.animateColumnSwap(data.id, data.col1, data.col2, animationSpeed.value);
        };

        const handleTranspose2D = async (data) => {
            Array2DModel.transpose(data.id, data.newId);
            return Array2DVisualization.animateTranspose(data.id, data.newId, animationSpeed.value);
        };

        const handleUpdateElement2D = async (data) => {
            Array2DModel.updateElement(data.id, data.position, data.value);
            return Array2DVisualization.animateElementUpdate(data.id, data.position, data.value, animationSpeed.value);
        };

        const handleAddRow2D = async (data) => {
            Array2DModel.addRow(data.id, data.row, data.position);
            return Array2DVisualization.animateAddRow(data.id, data.position, animationSpeed.value);
        };

        const handleAddColumn2D = async (data) => {
            Array2DModel.addColumn(data.id, data.column, data.position);
            return Array2DVisualization.animateAddColumn(data.id, data.position, animationSpeed.value);
        };

        const handleRemoveRow2D = async (data) => {
            Array2DModel.removeRow(data.id, data.position);
            return Array2DVisualization.animateRemoveRow(data.id, data.row, animationSpeed.value);
        };

        const handleRemoveColumn2D = async (data) => {
            Array2DModel.removeColumn(data.id, data.position);
            return Array2DVisualization.animateRemoveColumn(data.id, data.col, animationSpeed.value);
        };

        const handleResize2D = async (data) => {
            Array2DModel.resize(data.id, data.rows, data.cols, data.defaultValue);
            return Array2DVisualization.animateResize(data.id, animationSpeed.value);
        };

        const handleSubarray2D = async (data) => {
            Array2DModel.subarray(data.id, data.startRow, data.startCol, data.endRow, data.endCol, data.newId);
            return Array2DVisualization.animateSubarray(data.id, data.newId, data.startRow, data.startCol, data.endRow, data.endCol, animationSpeed.value);
        };

        // 变量操作处理
        const handleAddVariable = async (data) => {
            VariableModel.setVariable(data.name, data.value);
            // 始终初始化变量可视化，不再依赖showVariableContainer
            VariableVisualization.init();
            return VariableVisualization.animateAddVariable(data.name, data.value, animationSpeed.value);
        };
        
        const handleUpdateVariable = async (data) => {
            VariableModel.setVariable(data.name, data.value);
            return VariableVisualization.animateUpdateVariable(data.name, data.value, animationSpeed.value);
        };
        
        const handleDeleteVariable = async (data) => {
            return VariableVisualization.animateDeleteVariable(data.name, animationSpeed.value);
        };

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


            // 重置二维数组
            Array2DModel.data = {};
            Array2DModel.highlighted = {};
            Array2DModel.highlightColors = {};

            // 重置链表
            LinkedListModel.lists = {};
            LinkedListModel.nodes = {};

            // 重置树
            TreeModel.trees = {};
            TreeModel.nodes = {};

            // 重置图
            GraphModel.graphs = {};
            
            // 重置变量
            VariableModel.clearAllVariables();
            
            // 重置代码区状态变量
            codeFile.value = '';
            
            // 清除所有可视化区域，但不创建新的SVG
            d3.select("#array-visualization").selectAll("*").remove();
            d3.select("#linked-list-visualization").selectAll("*").remove();
            d3.select("#tree-visualization").selectAll("*").remove();
            d3.select("#graph-visualization").selectAll("*").remove();
            d3.select("#variable-visualization").selectAll("*").remove();
            d3.select("#code-visualization").selectAll("*").remove();

            // 重置可视化组件的SVG引用
            ArrayVisualization.svg = null;
            LinkedListVisualization.svg = null;
            LinkedListVisualization.nodesData = [];
            LinkedListVisualization.linksData = [];
            TreeVisualization.svg = null;
            GraphVisualization.svg = null;
            VariableVisualization.svg = null;

            // 重置容器显示状态
            showArrayContainer.value = false;
            showLinkedListContainer.value = false;
            showTreeContainer.value = false;
            showGraphContainer.value = false;
            showArray2DContainer.value = false;
            // 变量区始终显示，不重置showVariableContainer

            // 初始化变量可视化区
            VariableVisualization.init();
            
            // 初始化代码可视化区并加载代码
            CodeVisualization.init();
            CodeVisualization.loadCode(codeContent);
            codeLoaded.value = true;
        };

        // 组件挂载后初始化
        onMounted(() => {
            // 初始不显示任何容器
            showArrayContainer.value = false;
            showLinkedListContainer.value = false;
            showTreeContainer.value = false;
            showGraphContainer.value = false;
            showArray2DContainer.value = false;
            // 变量区始终显示，不设置showVariableContainer

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
            VariableVisualization.svg = null;
            
            // 初始化变量可视化区
            VariableVisualization.init();
            
            // 初始化代码可视化区
            CodeVisualization.init();
            
            // 加载代码文件
            loadCodeFile();
        });

        // 加载代码文件
        const loadCodeFile = async () => {
            try {
                // 直接使用codeContent变量，不再通过fetch加载
                CodeVisualization.loadCode(codeContent);
                codeLoaded.value = true;
                return true;
            } catch (error) {
                console.error('加载代码文件失败:', error);
                currentOperation.value = `加载代码文件失败: ${error.message}`;
                return false;
            }
        };

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
            codeLoaded,
            codeFile,

            // 容器显示状态
            showArrayContainer,
            showLinkedListContainer,
            showTreeContainer,
            showGraphContainer,
            showArray2DContainer,
            showVariableContainer
        };
    }
}).mount("#app");