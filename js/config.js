// 应用程序全局配置
const CONFIG = {
    // 动画相关配置
    animation: {
        defaultSpeed: 5,
        minSpeed: 1,
        maxSpeed: 10
    },
    
    // 可视化元素相关配置
    visualization: {
        // 数组可视化配置
        array: {
            squareSize: 50,
            gap: 10,
            defaultHighlightColor: "#FF9999"
        },
        
        // 链表可视化配置
        linkedList: {
            nodeRadius: 12,
            highlightedNodeRadius: 15,
            horizontalSpacing: 80,
            verticalSpacing: 60
        },
        
        // 树可视化配置
        tree: {
            nodeRadius: 12,
            highlightedNodeRadius: 15
        },

        // 图可视化配置
        graph: {
            nodeRadius: 12,
            highlightedNodeRadius: 15,
            linkWidth: 2,
            highlightedLinkWidth: 4
        }
    },
    
    // SVG容器配置
    svgContainer: {
        width: 1000,
        arrayHeight: 160,
        linkedListHeight: 300,
        treeHeight: 500,
        graphHeight: 800
    },
    
    // 延迟时间（毫秒）
    delay: {
        standard: 1000,
        highlight: 500,
        transition: 300
    }
}; 