import json
from typing import Dict, Any, Union, Optional, List
import os
import webbrowser

class VisualizationGenerator:
    """用于生成算法可视化的HTML页面"""
    
    def __init__(self, title: str = "算法可视化", width: int = 800, height: int = 200):
        """
        初始化可视化生成器
        
        参数:
            title: 页面标题
            width: SVG容器宽度
            height: SVG容器高度
        """
        self.title = title
        self.width = width
        self.height = height
        
    def create_html(self, json_content: Union[str, Dict, list], output_file: str = "visualization.html", 
                   algorithm_info: Optional[Dict[str, str]] = None) -> str:
        """
        创建包含JSON数据的HTML文件
        
        参数:
            json_content: JSON操作队列（字符串、字典或列表）
            output_file: 输出HTML文件名
            algorithm_info: 算法信息，包含名称、描述、复杂度等
            
        返回:
            生成的HTML文件路径
        """
        # 如果输入是字典或列表，转换为JSON字符串
        if isinstance(json_content, (dict, list)):
            json_content = json.dumps(json_content, indent=4, ensure_ascii=False)
            
        # 生成HTML内容 - 使用统一模板
        html_content = self._generate_unified_html_template(json_content, algorithm_info)
        
        # 创建HTML文件
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        return output_file
    
    def show_visualization(self, json_content: Union[str, Dict, list], output_file: str = "visualization.html",
                         algorithm_info: Optional[Dict[str, str]] = None) -> None:
        """
        创建并在浏览器中显示可视化
        
        参数:
            json_content: JSON操作队列
            output_file: 输出HTML文件名
            algorithm_info: 算法信息
        """
        html_file = self.create_html(json_content, output_file, algorithm_info)
        webbrowser.open('file://' + os.path.abspath(html_file))
        
    def _generate_unified_html_template(self, json_content: str, algorithm_info: Optional[Dict[str, str]] = None) -> str:
        """生成统一的HTML模板，支持数组、树和链表可视化"""
        # 生成算法信息HTML
        algorithm_info_html = self._generate_algorithm_info_html(algorithm_info)
        
        # 使用较大尺寸以适应所有类型的可视化
        width = max(1000, self.width)
        height = max(600, self.height)
        
        return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{self.title}</title>
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <style>
        body {{
            margin: 20px;
            font-family: Arial, sans-serif;
        }}
        h1 {{
            color: #333;
        }}
        .controls {{
            margin: 20px 0;
        }}
        button {{
            padding: 8px 15px;
            margin-right: 10px;
            cursor: pointer;
        }}
        .metadata {{
            margin-top: 20px;
            font-size: 16px;
            color: #555;
        }}
        /* 数组可视化样式 */
        .array-element {{
            fill: white;
            stroke: black;
            stroke-width: 1px;
        }}
        .array-text {{
            text-anchor: middle;
            dominant-baseline: central;
            font-size: 14px;
        }}
        /* 树可视化样式 */
        .node circle {{
            fill: white;
            stroke: #999;
            stroke-width: 2px;
        }}
        .node text {{
            font-size: 14px;
        }}
        /* 链表可视化样式 */
        .link {{
            fill: none;
            stroke: #999;
            stroke-width: 2px;
        }}
        .highlighted-node circle {{
            fill: #ff7f0e;
        }}
        .highlighted-link {{
            stroke: #ff7f0e;
            stroke-width: 3px;
        }}
        /* 可视化容器样式 */
        .visualization-container {{
            margin-bottom: 20px;
        }}
        .visualization-title {{
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }}
    </style>
</head>
<body>
    <h1>{self.title}</h1>
    
    <div class="controls">
        <button id="startBtn">开始</button>
        <button id="pauseBtn">暂停</button>
        <button id="stepBtn">下一步</button>
        <button id="resetBtn">重置</button>
    </div>
    
    <div id="visualization">
        <div id="array-container" class="visualization-container">
            <div class="visualization-title">数组可视化</div>
            <svg id="array-svg" width="{width}" height="150"></svg>
        </div>
        
        <div id="tree-container" class="visualization-container">
            <div class="visualization-title">树可视化</div>
            <svg id="tree-svg" width="{width}" height="300"></svg>
        </div>
        
        <div id="linkedlist-container" class="visualization-container">
            <div class="visualization-title">链表可视化</div>
            <svg id="linkedlist-svg" width="{width}" height="150"></svg>
        </div>
    </div>
    
    <div class="metadata" id="currentOperation">准备就绪</div>
    {algorithm_info_html}

<script>
    // 定义SVG容器
    const width = {width};
    const height = {height};
    
    // 创建独立的SVG容器
    const arraySvg = d3.select("#array-svg")
        .append("g")
        .attr("transform", `translate(50, 75)`);
        
    const treeSvg = d3.select("#tree-svg")
        .append("g")
        .attr("transform", `translate(${width/4}, 50)`);
        
    const linkedListSvg = d3.select("#linkedlist-svg")
        .append("g")
        .attr("transform", `translate(50, 75)`);

    // 为每个容器定义箭头标记
    function defineArrowMarker(svg, id) {{
        svg.append("defs").append("marker")
            .attr("id", id)
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 20)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 8)
            .attr("markerHeight", 8)
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")
            .attr("fill", "#999");
    }}
    
    defineArrowMarker(treeSvg, "tree-arrowhead");
    defineArrowMarker(linkedListSvg, "linkedlist-arrowhead");

    // 定义全局变量
    // 数组可视化变量
    let arrays = {{}};       // 支持多个数组，格式 {id: [...]}
    let arrayGroups = {{}};  // 存储数组视觉元素，格式 {id: d3Selection}
    const squareSize = 40;
    const gap = 5;
    
    // 树可视化变量
    let trees = {{}};        // 支持多个树，格式 {id: treeObject}
    const treeLayout = d3.tree().size([width - 200, 200]);
    
    // 链表可视化变量
    let lists = {{}};        // 存储所有链表
    let nodesData = [];      // 存储节点可视化数据
    let linksData = [];      // 存储连线可视化数据
    
    // 共享变量
    let nodes = {{}};        // 节点字典，用于树和链表
    
    // 控制变量
    let isPaused = true;
    let currentStep = 0;
    let timer = null;
    
    // 添加操作锁，防止并发操作
    let operationInProgress = false;

    // 操作队列
    const queue = {json_content};
    
    // 初始化可视化容器
    function initializeVisualizations() {{
        // 默认隐藏所有容器，按需显示
        document.getElementById("array-container").style.display = "none";
        document.getElementById("tree-container").style.display = "none";
        document.getElementById("linkedlist-container").style.display = "none";
    }}
    
    // 显示对应的容器
    function showContainer(containerType) {{
        document.getElementById(`${{containerType}}-container`).style.display = "block";
    }}

    // ===== 数组操作函数 =====
    async function createArray(operationData) {{
        // 显示数组容器
        showContainer("array");
        
        const arrayId = operationData.id || "default";
        
        // 初始化数据
        arrays[arrayId] = operationData.array.slice();
        
        // 计算这个数组的起始位置
        const arraysCount = Object.keys(arrays).length;
        const yOffset = (arraysCount - 1) * (squareSize + 20); // 每个数组垂直间隔
        
        // 创建组并绑定数据
        arrayGroups[arrayId] = arraySvg.append("g")
            .attr("class", `array-group-${{arrayId}}`)
            .attr("transform", `translate(0, ${{yOffset}})`);
            
        // 添加数组名称标签
        arrayGroups[arrayId].append("text")
            .attr("x", -30)
            .attr("y", squareSize/2)
            .attr("text-anchor", "end")
            .attr("dominant-baseline", "central")
            .text(arrayId);
            
        const groups = arrayGroups[arrayId].selectAll(".element")
            .data(arrays[arrayId])
            .enter()
            .append("g")
            .attr("class", "element")
            .attr("transform", (d, i) => `translate(${{i * (squareSize + gap)}}, 0)`);

        // 在组中添加正方形
        groups.append("rect")
            .attr("class", "array-element")
            .attr("width", squareSize)
            .attr("height", squareSize);

        // 在组中添加文本
        groups.append("text")
            .attr("class", "array-text")
            .attr("x", squareSize / 2)
            .attr("y", squareSize / 2)
            .text(d => d);
            
        // 等待动画完成
        await new Promise(resolve => setTimeout(resolve, 500));
    }}

    async function swapElements(operationData) {{
        const arrayId = operationData.id || "default";
        if (!arrays[arrayId]) return;
        
        const [i, j] = operationData.indices;
        
        // 交换数据
        [arrays[arrayId][i], arrays[arrayId][j]] = [arrays[arrayId][j], arrays[arrayId][i]];

        // 获取位置信息
        const positionI = i * (squareSize + gap);
        const positionJ = j * (squareSize + gap);

        // 获取当前数组的选择器
        const groupSelector = `.array-group-${{arrayId}}`;
        
        // 通过动画显示交换
        arrayGroups[arrayId].selectAll(".element")
            .filter((d, idx) => idx === i)
            .transition()
            .duration(1000)
            .attr("transform", `translate(${{positionJ}}, 0)`);
            
        arrayGroups[arrayId].selectAll(".element")
            .filter((d, idx) => idx === j)
            .transition()
            .duration(1000)
            .attr("transform", `translate(${{positionI}}, 0)`);

        // 等待动画完成
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 重新绑定数据和更新视图
        arrayGroups[arrayId].selectAll(".element").remove();
        
        const groups = arrayGroups[arrayId].selectAll(".element")
            .data(arrays[arrayId])
            .enter()
            .append("g")
            .attr("class", "element")
            .attr("transform", (d, i) => `translate(${{i * (squareSize + gap)}}, 0)`);

        groups.append("rect")
            .attr("class", "array-element")
            .attr("width", squareSize)
            .attr("height", squareSize);

        groups.append("text")
            .attr("class", "array-text")
            .attr("x", squareSize / 2)
            .attr("y", squareSize / 2)
            .text(d => d);
    }}

    async function highlight(operationData) {{
        const arrayId = operationData.id || "default";
        if (!arrays[arrayId]) return;
        
        arrayGroups[arrayId].selectAll(".element")
            .filter((d, i) => operationData.indices.includes(i))
            .select("rect")
            .transition()
            .duration(500)
            .attr("fill", "red");

        await new Promise(resolve => setTimeout(resolve, 500));
    }}

    async function unhighlight(operationData) {{
        const arrayId = operationData.id || "default";
        if (!arrays[arrayId]) return;
        
        arrayGroups[arrayId].selectAll(".element")
            .filter((d, i) => operationData.indices.includes(i))
            .select("rect")
            .transition()
            .duration(500)
            .attr("fill", "white");

        await new Promise(resolve => setTimeout(resolve, 500));
    }}

    // ===== 树操作函数 =====
    async function createRoot(operationData) {{
        // 显示树容器
        showContainer("tree");
        
        const treeId = operationData.id || "default";
        
        // 创建树数据结构
        trees[treeId] = {{
            id: operationData.id,
            value: operationData.value,
            children: []
        }};
        
        // 添加到节点字典
        nodes[operationData.id] = trees[treeId];

        // 更新树可视化
        updateTreeVisualization();

        await new Promise(resolve => setTimeout(resolve, 1000));
    }}

    async function addChild(operationData) {{
        const parentNode = nodes[operationData.parent_id];
        if (!parentNode) {{
            console.error(`父节点 ${{operationData.parent_id}} 不存在`);
            return;
        }}

        // 创建新节点
        const newNode = {{
            id: operationData.id,
            value: operationData.value,
            children: []
        }};

        // 添加到父节点的子节点列表
        if (!parentNode.children) {{
            parentNode.children = [];
        }}
        parentNode.children.push(newNode);

        // 添加到节点字典
        nodes[operationData.id] = newNode;

        // 更新树可视化
        updateTreeVisualization();

        await new Promise(resolve => setTimeout(resolve, 1000));
    }}

    function updateTreeVisualization() {{
        // 清除现有树可视化
        treeSvg.selectAll(".node, .link").remove();
        
        // 处理每个树
        Object.entries(trees).forEach(([treeId, treeData]) => {{
            if (!treeData) return;
            
            // 使用d3.hierarchy获取层次结构
            const root = d3.hierarchy(treeData);
            
            // 应用树形布局
            treeLayout(root);
    
            // 绘制连线
            treeSvg.selectAll(`.link-${{treeId}}`)
                .data(root.links(), d => d.target.data.id)
                .enter()
                .append("path")
                .attr("class", `link link-${{treeId}}`)
                .attr("marker-end", "url(#tree-arrowhead)")
                .attr("d", d => `M${{d.source.x}},${{d.source.y}} L${{d.target.x}},${{d.target.y}}`);
    
            // 绘制节点
            const treeNodes = treeSvg.selectAll(`.node-${{treeId}}`)
                .data(root.descendants(), d => d.data.id)
                .enter()
                .append("g")
                .attr("class", `node node-${{treeId}}`)
                .attr("transform", d => `translate(${{d.x}},${{d.y}})`);
    
            treeNodes.append("circle")
                .attr("r", 12);
    
            treeNodes.append("text")
                .attr("dy", ".35em")
                .attr("text-anchor", "middle")
                .text(d => d.data.value);
        }});
    }}

    // ===== 链表操作函数 =====
    async function createList(operationData) {{
        // 显示链表容器
        showContainer("linkedlist");
        
        const listName = operationData.list_name || "linkedList";
        
        // 创建链表节点
        const newNode = {{
            id: operationData.id,
            value: operationData.value,
            next: null
        }};
        
        // 添加到节点字典
        nodes[operationData.id] = newNode;
        
        // 将链表添加到链表字典中
        lists[listName] = newNode;
        
        // 更新链表可视化
        updateLinkedListVisualization();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }}

    async function appendNode(operationData) {{
        const listName = operationData.list_name || "linkedList";
        
        // 创建新节点
        const newNode = {{
            id: operationData.id,
            value: operationData.value,
            next: null
        }};
        
        // 添加到节点字典
        nodes[operationData.id] = newNode;
        
        // 获取目标链表
        let currentList = lists[listName];
        
        // 如果链表为空，则新节点成为头节点
        if (!currentList) {{
            lists[listName] = newNode;
        }} else {{
            // 找到链表的最后一个节点
            let lastNode = currentList;
            while (lastNode.next) {{
                lastNode = lastNode.next;
            }}
            
            // 将新节点连接到最后一个节点
            lastNode.next = newNode;
        }}
        
        // 更新链表可视化
        updateLinkedListVisualization();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
    }}

    function updateLinkedListVisualization() {{
        // 清除现有链表可视化
        linkedListSvg.selectAll(".node, .link").remove();
        
        // 生成节点和链接的数据
        nodesData = [];
        linksData = [];
        
        // 计算链表数量以确定垂直间距
        const numLists = Object.keys(lists).filter(key => lists[key] != null).length;
        const verticalSpacing = numLists <= 1 ? 0 : 60;
        
        // 处理所有链表
        let listIndex = 0;
        for (const listName in lists) {{
            if (!lists[listName]) continue;
            
            let xPos = 0;
            let yPos = listIndex * verticalSpacing;
            let current = lists[listName];
            
            // 添加链表名称标签
            linkedListSvg.append("text")
                .attr("x", -30)
                .attr("y", yPos)
                .attr("text-anchor", "end")
                .attr("dominant-baseline", "central")
                .text(listName);
            
            while (current) {{
                nodesData.push({{
                    id: current.id,
                    value: current.value,
                    x: xPos,
                    y: yPos,
                    listName: listName
                }});
                
                if (current.next) {{
                    linksData.push({{
                        source: {{id: current.id, value: current.value}},
                        target: {{id: current.next.id, value: current.next.value}}
                    }});
                }}
                
                current = current.next;
                xPos += 80;
            }}
            
            listIndex++;
        }}
        
        // 绘制连线
        linkedListSvg.selectAll(".link")
            .data(linksData, d => `${{d.source.id}}-${{d.target.id}}`)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("marker-end", "url(#linkedlist-arrowhead)")
            .attr("d", d => {{
                const sourceNode = nodesData.find(node => node.id === d.source.id);
                const targetNode = nodesData.find(node => node.id === d.target.id);
                
                if (sourceNode && targetNode) {{
                    return `M${{sourceNode.x}},${{sourceNode.y}} L${{targetNode.x}},${{targetNode.y}}`;
                }}
                return "";
            }});
            
        // 绘制节点
        const linkedListNodes = linkedListSvg.selectAll(".node")
            .data(nodesData, d => d.id)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${{d.x}},${{d.y}})`);
            
        linkedListNodes.append("circle")
            .attr("r", 12);
            
        linkedListNodes.append("text")
            .attr("dy", ".35em")
            .attr("text-anchor", "middle")
            .text(d => d.value);
    }}

    // ===== 执行控制函数 =====
    async function executeStep() {{
        // 如果已有操作在执行，则不执行新操作
        if (operationInProgress) {{
            console.log("操作正在进行中，请稍候...");
            return false;
        }}
        
        if (currentStep >= queue.length) {{
            document.getElementById("currentOperation").textContent = "可视化完成";
            return false;
        }}
        
        operationInProgress = true;
        
        try {{
            const operation = queue[currentStep];
            document.getElementById("currentOperation").textContent = operation.metadata || "执行操作";
            
            try {{
                switch (operation.operation) {{
                    // 数组操作
                    case "create_array":
                        await createArray(operation.data);
                        break;
                    case "swap_elements":
                        await swapElements(operation.data);
                        break;
                    case "highlight":
                        await highlight(operation.data);
                        break;
                    case "unhighlight":
                        await unhighlight(operation.data);
                        break;
                        
                    // 树操作
                    case "create_root":
                        await createRoot(operation.data);
                        break;
                    case "add_child":
                        await addChild(operation.data);
                        break;
                    
                    // 链表操作
                    case "create_list":
                        await createList(operation.data);
                        break;
                    case "append_node":
                        await appendNode(operation.data);
                        break;
                        
                    // 其他操作函数也可以添加在这里
                    
                    default:
                        console.warn(`未知操作: ${{operation.operation}}`);
                }}
            }} catch (error) {{
                console.error(`执行操作 ${{operation.operation}} 时出错:`, error);
                document.getElementById("currentOperation").textContent = `操作 ${{operation.operation}} 执行失败: ${{error.message}}`;
            }}
            
            currentStep++;
            return true;
        }} finally {{
            operationInProgress = false;
        }}
    }}
    
    async function executeQueue() {{
        while (!isPaused && currentStep < queue.length) {{
            const success = await executeStep();
            if (!success) break;
            // 添加小延迟，避免过快执行下一步
            await new Promise(resolve => setTimeout(resolve, 100));
        }}
    }}
    
    function resetVisualization() {{
        isPaused = true;
        currentStep = 0;
        if (timer) clearTimeout(timer);
        
        // 重置所有可视化状态
        arrays = {{}};
        trees = {{}};
        for (let list in lists) {{
            lists[list] = null;
        }}
        nodes = {{}};
        nodesData = [];
        linksData = [];
        
        // 清除所有容器内容
        arraySvg.selectAll("*").remove();
        treeSvg.selectAll("*").remove();
        linkedListSvg.selectAll("*").remove();
        
        // 重新定义箭头标记
        defineArrowMarker(treeSvg, "tree-arrowhead");
        defineArrowMarker(linkedListSvg, "linkedlist-arrowhead");
        
        // 隐藏所有容器
        document.getElementById("array-container").style.display = "none";
        document.getElementById("tree-container").style.display = "none";
        document.getElementById("linkedlist-container").style.display = "none";
        
        document.getElementById("currentOperation").textContent = "已重置";
        
        // 防止操作锁死
        operationInProgress = false;
    }}
    
    // 初始化可视化
    initializeVisualizations();
    
    // 按钮事件处理
    document.getElementById("startBtn").addEventListener("click", () => {{
        // 防止重复点击开始按钮
        if (!operationInProgress && isPaused) {{
            isPaused = false;
            executeQueue();
        }}
    }});
    
    document.getElementById("pauseBtn").addEventListener("click", () => {{
        isPaused = true;
    }});
    
    document.getElementById("stepBtn").addEventListener("click", async () => {{
        isPaused = true;
        if (!operationInProgress) {{
            executeStep();
        }}
    }});
    
    document.getElementById("resetBtn").addEventListener("click", () => {{
        // 如果操作正在进行，等待操作完成后再重置
        if (operationInProgress) {{
            isPaused = true;
            setTimeout(resetVisualization, 500);
        }} else {{
            resetVisualization();
        }}
    }});
</script>
</body>
</html>"""

    def _generate_algorithm_info_html(self, algorithm_info: Optional[Dict[str, str]] = None) -> str:
        """生成算法信息HTML部分"""
        if not algorithm_info:
            return ""
            
        return f"""
    <div class="algorithm-info" style="margin-top: 30px; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
        <h3>{algorithm_info.get('name', '算法信息')}</h3>
        <p>{algorithm_info.get('description', '')}</p>
        <p><strong>时间复杂度：</strong>{algorithm_info.get('time_complexity', '')}</p>
        <p><strong>空间复杂度：</strong>{algorithm_info.get('space_complexity', '')}</p>
        <p><strong>稳定性：</strong>{algorithm_info.get('stability', '')}</p>
    </div>"""

