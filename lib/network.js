import * as tool from './tool';

class Network {
    constructor () {
        this.reqList = {};
        this.reqListLength = 0;
        this._open = undefined;
        this._send = undefined;

        this.mockAjax();
    }

    mockAjax () {
        let _XMLHttpRequest = window.XMLHttpRequest;
        if (!_XMLHttpRequest) {
            return;
        }

        let that = this;
        let _open = window.XMLHttpRequest.prototype.open,
            _send = window.XMLHttpRequest.prototype.send;
        that._open = _open;
        that._send = _send;

        window.XMLHttpRequest.prototype.open = function () {
            let XMLReq = this;
            let args = [].slice.call(arguments),
                method = args[0],
                url = args[1],
                id = that.getUniqueID();
            let timer = null;

            XMLReq._ajaxRequestID = id;
            XMLReq._method = method;
            XMLReq._url = url;

            let _onreadystatechange = XMLReq.onreadystatechange || function () {};
            let onreadystatechange = () => {

                let item = that.reqList[id] || {};

                item.readyState = XMLReq.readyState;
                item.status = XMLReq.status;
                item.responseType = XMLReq.responseType;

                switch (Number(XMLReq.readyState)) {
                    case 0 || 1:
                        // UNSENT OPENED
                        if (!item.startTime) {
                            item.startTime = (+new Date());
                        }
                        break;
                    case 2: {
                        // HEADERS_RECEIVED
                        item.header = {};
                        let header = XMLReq.getAllResponseHeaders() || '',
                            headerArr = header.split('\n');
                        
                        for (let i = 0; i < headerArr.length; i++) {
                            let line = headerArr[i];
                            if (!line) {
                                continue;
                            }
                            let arr = line.split(': ');
                            let key = arr[0],
                                value = arr.slice(1).join(': ');
                            item.header[key] = value;
                        }
                        break;
                    }
                    case 3: 
                        // LOADING
                        break;
                    case 4:
                        // DONE
                        clearInterval(timer);
                        item.endTime = +new Date(),
                        item.costTime = item.endTime - (item.startTime || item.endTime);
                        item.response = XMLReq.response;
                        break;
                    default:
                        clearInterval(timer);
                }

                if (!XMLReq._noConsole) {
                    that.updateRequest(XMLReq._ajaxRequestID, item);
                }
                return _onreadystatechange.apply(XMLReq, arguments);
            };

            XMLReq.onreadystatechange = onreadystatechange;

            let preState = -1;
            timer = setInterval(function () {
                if (preState !== Number(XMLReq.readyState)) {
                    preState = Number(XMLReq.readyState);
                    onreadystatechange.call(XMLReq);
                }
            }, 10);

            return _open.apply(XMLReq, args);
        };

        window.XMLHttpRequest.prototype.send = function () {
            let XMLReq = this;
            let args = [].slice.call(arguments),
                data = args[0];
    
            let item = that.reqList[XMLReq._ajaxRequestID] || {};
            item.method = XMLReq._method.toUpperCase();

            let query = XMLReq._url.split('?');
            item.url = query.shift();

            if (query.length > 0) {
                item.getData = {};
                query = query.join('?');
                query = query.split('&');
                for (let q of query) {
                    q = q.split('=');
                    item.getData[q[0]] = q[1];
                }
            }

            if (item.method == 'POST') {

                if (tool.isString(data)) {
                    let arr = data.split('&');
                    item.postData = {};
                    for (let q of arr) {
                        q = q.split('=');
                        item.postData[q[0]] = q[1];
                    }
                } else if (tool.isPlainObject(data)) {
                    item.postData = data;
                }

            }

            if (!XMLReq._noConsole) {
                that.updateRequest(XMLReq._ajaxRequestID, item);
            }

            return _send.apply(XMLReq, args);
        };

    }
    
    updateRequest (id, data) {
        let item = this.reqList[id] || {};
        for (let key in data) {
            item[key] = data[key];
        }
        this.reqList[id] = item;
        this.reqListLength = Object.keys(this.reqList).length;
    }

    getUniqueID() {
        let id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
        return id;
    }
}

export default Network;