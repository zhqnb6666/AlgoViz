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
            
        # 生成HTML内容
        html_content = self._generate_html_template(json_content, algorithm_info)
        
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
        
    def _generate_html_template(self, json_content: str, algorithm_info: Optional[Dict[str, str]] = None) -> str:
        """生成HTML模板"""
        # 生成算法信息HTML
        algorithm_info_html = ""
        if algorithm_info:
            algorithm_info_html = f"""
    <div class="algorithm-info" style="margin-top: 30px; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
        <h3>{algorithm_info.get('name', '算法信息')}</h3>
        <p>{algorithm_info.get('description', '')}</p>
        <p><strong>时间复杂度：</strong>{algorithm_info.get('time_complexity', '')}</p>
        <p><strong>空间复杂度：</strong>{algorithm_info.get('space_complexity', '')}</p>
        <p><strong>稳定性：</strong>{algorithm_info.get('stability', '')}</p>
    </div>"""
            
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
    
    <div id="visualization"></div>
    
    <div class="metadata" id="currentOperation">准备就绪</div>
    {algorithm_info_html}

<script>
    // 创建SVG容器
    const svg = d3.select("#visualization").append("svg")
        .attr("width", {self.width})
        .attr("height", {self.height});

    // 定义全局变量
    let groups;  // SVG组，用于绑定正方形和文本
    let data;    // 数组数据
    const squareSize = 50; // 正方形边长
    const gap = 10;       // 正方形间距
    
    // 控制变量
    let isPaused = true;
    let currentStep = 0;
    let timer = null;

    // 操作队列
    const queue = {json_content};

    // 操作函数：创建数组
    async function createArray(operationData) {{
        // 清除现有元素
        svg.selectAll("*").remove();

        // 初始化数据
        data = operationData.array;

        // 创建组并绑定数据
        groups = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d, i) => `translate(${{i * (squareSize + gap)}}, 0)`);

        // 在组中添加正方形
        groups.append("rect")
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("fill", "white")
            .attr("stroke", "black");

        // 在组中添加文本
        groups.append("text")
            .attr("x", squareSize / 2)
            .attr("y", squareSize / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .text(d => d);
    }}

    // 操作函数：交换元素
    async function swapElements(operationData) {{
        const [i, j] = operationData.indices;
        
        // 交换数据数组中的值
        [data[i], data[j]] = [data[j], data[i]];

        // 获取当前位置信息 - 只用于动画过渡
        const positionI = i * (squareSize + gap);
        const positionJ = j * (squareSize + gap);

        // 通过动画显示交换过程
        groups.filter((d, idx) => idx === i)
            .transition()
            .duration(1000)
            .attr("transform", `translate(${{positionJ}}, 0)`);
            
        groups.filter((d, idx) => idx === j)
            .transition()
            .duration(1000)
            .attr("transform", `translate(${{positionI}}, 0)`);

        // 等待动画完成
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 重新绑定数据和更新视图，确保索引和元素一致
        svg.selectAll("g").remove();
        
        // 重新创建组并绑定新的数据顺序
        groups = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d, i) => `translate(${{i * (squareSize + gap)}}, 0)`);

        // 在组中添加正方形
        groups.append("rect")
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("fill", "white")
            .attr("stroke", "black");

        // 在组中添加文本
        groups.append("text")
            .attr("x", squareSize / 2)
            .attr("y", squareSize / 2)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .text(d => d);
    }}

    // 操作函数：高亮元素
    async function highlight(operationData) {{
        groups.filter((d, i) => operationData.indices.includes(i))
            .select("rect")
            .transition()
            .duration(500)
            .attr("fill", "red");

        // 等待动画完成
        await new Promise(resolve => setTimeout(resolve, 500));
    }}

    // 操作函数：取消高亮元素
    async function unhighlight(operationData) {{
        groups.filter((d, i) => operationData.indices.includes(i))
            .select("rect")
            .transition()
            .duration(500)
            .attr("fill", "white");

        // 等待动画完成
        await new Promise(resolve => setTimeout(resolve, 500));
    }}

    // 执行单步操作
    async function executeStep() {{
        if (currentStep >= queue.length) {{
            document.getElementById("currentOperation").textContent = "可视化完成";
            return false;
        }}
        
        const operation = queue[currentStep];
        document.getElementById("currentOperation").textContent = operation.metadata || "执行操作";
        
        switch (operation.operation) {{
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
            default:
                console.warn(`未知操作: ${{operation.operation}}`);
        }}
        
        currentStep++;
        return true;
    }}
    
    // 执行队列
    async function executeQueue() {{
        while (!isPaused && currentStep < queue.length) {{
            const success = await executeStep();
            if (!success) break;
        }}
    }}
    
    // 重置可视化
    function resetVisualization() {{
        isPaused = true;
        currentStep = 0;
        if (timer) clearTimeout(timer);
        svg.selectAll("*").remove();
        document.getElementById("currentOperation").textContent = "已重置";
    }}
    
    // 按钮事件处理
    document.getElementById("startBtn").addEventListener("click", () => {{
        isPaused = false;
        executeQueue();
    }});
    
    document.getElementById("pauseBtn").addEventListener("click", () => {{
        isPaused = true;
    }});
    
    document.getElementById("stepBtn").addEventListener("click", async () => {{
        isPaused = true;
        executeStep();
    }});
    
    document.getElementById("resetBtn").addEventListener("click", () => {{
        resetVisualization();
    }});
</script>
</body>
</html>"""

