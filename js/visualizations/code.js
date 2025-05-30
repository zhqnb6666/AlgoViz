// 代码可视化模块
const CodeVisualization = {
    svg: null,
    codeLines: [],
    highlightedLine: -1,
    
    // 初始化代码可视化
    init() {
        // 清空现有内容
        d3.select('#code-visualization').selectAll('*').remove();
        
        // 创建代码容器
        this.codeContainer = d3.select('#code-visualization')
            .append('pre')
            .attr('class', 'code-container');
            
        this.highlightedLine = -1;
        this.codeLines = [];
    },
    
    // 加载代码
    loadCode(codeText) {
        if (!codeText) return;
        
        this.init();
        this.codeLines = codeText.split('\n');
        
        // 创建代码行
        this.codeContainer.selectAll('div')
            .data(this.codeLines)
            .enter()
            .append('div')
            .attr('class', 'code-line')
            .attr('id', (d, i) => `code-line-${i}`)
            .html((d, i) => `<span class="line-number">${i + 1}</span><code>${this.escapeHtml(d)}</code>`);
    },
    
    // 高亮指定行
    highlightLine(lineNumber, animationSpeed = 1) {
        // 取消之前的高亮
        if (this.highlightedLine >= 0) {
            d3.select(`#code-line-${this.highlightedLine}`)
                .classed('highlighted', false);
        }
        
        // 设置新的高亮
        if (lineNumber >= 0 && lineNumber < this.codeLines.length) {
            const lineElement = d3.select(`#code-line-${lineNumber}`);
            lineElement.classed('highlighted', true);
            
            // 滚动到可见区域
            const codeContainer = document.getElementById('code-visualization');
            const lineElem = document.getElementById(`code-line-${lineNumber}`);
            
            if (lineElem && codeContainer) {
                // 计算滚动位置，使高亮行在视图中间
                const containerHeight = codeContainer.clientHeight;
                const lineTop = lineElem.offsetTop;
                const lineHeight = lineElem.clientHeight;
                
                codeContainer.scrollTop = lineTop - (containerHeight / 2) + lineHeight;
            }
            
            this.highlightedLine = lineNumber;
        }
        
        return Utils.delay(CONFIG.delay.short, animationSpeed);
    },
    
    // HTML转义，防止XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // 简单的语法高亮
            .replace(/\b(true|false|null|undefined)\b/g, '<span class="literal">$1</span>')
            .replace(/("[^"]*")|('[^']*')/g, '<span class="string">$1</span>')
            .replace(/\b(\d+)\b/g, '<span class="number">$1</span>');
    }
};

// 添加代码高亮的CSS样式
(function() {
    const style = document.createElement('style');
    style.textContent = `
        .code-line {
            padding: 2px 0;
            display: flex;
            white-space: pre;
        }
        .code-line.highlighted {
            background-color: rgba(255, 255, 0, 0.3);
        }
        .line-number {
            display: inline-block;
            width: 2em;
            text-align: right;
            padding-right: 1em;
            color: #888;
            user-select: none;
        }
        .keyword { color: #0000ff; }
        .string { color: #008000; }
        .number { color: #ff8c00; }
        .literal { color: #800080; }
    `;
    document.head.appendChild(style);
})(); 