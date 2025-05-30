// 变量区模型
const VariableModel = {
    // 数据存储
    variables: {}, // 格式: {varName: value}
    history: {}, // 格式: {varName: [历史值列表]}
    
    // 初始化变量
    init() {
        // 确保数据结构存在
        if (!this.variables) {
            this.variables = {};
        }
        
        if (!this.history) {
            this.history = {};
        }
    },
    
    // 创建/更新变量
    setVariable(name, value) {
        this.init();
        
        // 如果变量不存在，为它创建历史记录
        if (!this.history[name]) {
            this.history[name] = [];
        }
        
        // 如果值发生变化，记录历史
        if (this.variables[name] !== value) {
            this.history[name].push({
                value: this.variables[name],
                timestamp: new Date()
            });
        }
        
        // 设置当前值
        this.variables[name] = value;
        
        return this.variables[name];
    },
    
    // 获取变量值
    getVariable(name) {
        this.init();
        return this.variables[name];
    },
    
    // 删除变量
    deleteVariable(name) {
        this.init();
        
        // 记录删除前的最后一个值
        if (this.variables[name] !== undefined) {
            if (!this.history[name]) {
                this.history[name] = [];
            }
            
            this.history[name].push({
                value: this.variables[name],
                timestamp: new Date(),
                action: 'deleted'
            });
        }
        
        // 删除变量但保留历史记录
        const oldValue = this.variables[name];
        delete this.variables[name];
        
        return oldValue;
    },
    
    // 获取变量历史
    getHistory(name) {
        this.init();
        return this.history[name] || [];
    },
    
    // 获取所有变量
    getAllVariables() {
        this.init();
        return { ...this.variables };
    },
    
    // 清空所有变量
    clearAllVariables() {
        this.init();
        // 记录所有删除的变量
        for (const name in this.variables) {
            if (this.variables[name] !== undefined) {
                if (!this.history[name]) {
                    this.history[name] = [];
                }
                
                this.history[name].push({
                    value: this.variables[name],
                    timestamp: new Date(),
                    action: 'deleted'
                });
            }
        }
        
        this.variables = {};
        return true;
    }
}; 