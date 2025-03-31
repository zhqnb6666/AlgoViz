import os
import webbrowser
from algorithms import bubble_sort, selection_sort, insertion_sort, ALGORITHM_INFO
from visualization_generator import VisualizationGenerator

def create_html_with_json(json_content, output_file="visualization.html"):
    """
    创建包含JSON数据的HTML文件
    
    参数:
        json_content: JSON操作队列
        output_file: 输出HTML文件名
    """
    # 使用与index.html相同的D3可视化代码，但将JSON队列嵌入到页面中
    html_content = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>算法可视化</title>
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
    <h1>算法可视化</h1>
    
    <div class="controls">
        <button id="startBtn">开始</button>
        <button id="pauseBtn">暂停</button>
        <button id="stepBtn">下一步</button>
        <button id="resetBtn">重置</button>
    </div>
    
    <div id="visualization"></div>
    
    <div class="metadata" id="currentOperation">准备就绪</div>

<script>
    // 创建SVG容器
    const svg = d3.select("#visualization").append("svg")
        .attr("width", 800)  // 宽度足够容纳数组
        .attr("height", 200); // 高度容纳正方形

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
        
        // 获取当前位置信息
        const transformI = groups.filter((d, idx) => idx === i).attr("transform");
        const transformJ = groups.filter((d, idx) => idx === j).attr("transform");

        // 移动元素组
        groups.filter((d, idx) => idx === i)
            .transition()
            .duration(1000)
            .attr("transform", transformJ);
            
        groups.filter((d, idx) => idx === j)
            .transition()
            .duration(1000)
            .attr("transform", transformI);

        // 等待动画完成
        await new Promise(resolve => setTimeout(resolve, 1000));

        // 交换数据并更新显示
        [data[i], data[j]] = [data[j], data[i]];
        
        // 更新文本内容
        groups.filter((d, idx) => idx === i)
            .select("text")
            .text(data[i]);
            
        groups.filter((d, idx) => idx === j)
            .select("text")
            .text(data[j]);
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
</html>
"""

    # 创建HTML文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    return output_file

def main():
    """主函数，展示如何使用算法可视化工具"""
    # 创建可视化生成器
    viz = VisualizationGenerator()
    
    # 示例1：冒泡排序
    print("生成冒泡排序可视化...")
    queue = bubble_sort([4, 3, 7, 1, 9, 2])
    viz.show_visualization(
        queue.get_queue(),
        "bubble_sort.html",
        ALGORITHM_INFO["bubble_sort"]
    )
    
    # 示例2：选择排序
    print("生成选择排序可视化...")
    queue = selection_sort([8, 5, 2, 6, 3, 1])
    viz.show_visualization(
        queue.get_queue(),
        "selection_sort.html",
        ALGORITHM_INFO["selection_sort"]
    )
    
    # 示例3：插入排序
    print("生成插入排序可视化...")
    queue = insertion_sort([8, 4, 9, 3, 1, 6])
    viz.show_visualization(
        queue.get_queue(),
        "insertion_sort.html",
        ALGORITHM_INFO["insertion_sort"]
    )

if __name__ == "__main__":
    main() 