class Console {
    constructor () {
        this.console = {};
        this.logList = [];
        this.mockConsole();
    }
    mockConsole () {
        const methodList = ['log', 'info', 'warn', 'debug', 'error'];
    
        if (!window.console) {
            window.console = {};
        } else {
            methodList.map( method => {
                this.console[method] = window.console[method];
            });
            this.console.clear = window.console.clear;
        }
    
        methodList.map( method => {
            window.console[method] = (...args) => {
                this.printLog({
                    logType: method,
                    logs: args,
                    time: new Date(),
                });
            };
        });
    
        window.console.clear = (...args) => {
            this.logList = [];
            this.console.clear.apply(window.console, args);
        };
    }
    printLog (opt) {
        this.console[opt.logType].apply(window.console, opt.logs);
        this.logList.push(opt);
    }
}

export default Console;