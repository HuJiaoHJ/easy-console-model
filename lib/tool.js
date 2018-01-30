export function getDate(time) {
    let d = time > 0 ? new Date(time) : new Date();
    let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate(),
        month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1),
        year = d.getFullYear(),
        hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
        minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes(),
        second = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds(),
        millisecond = d.getMilliseconds() < 10 ? '0' + d.getMilliseconds() : d.getMilliseconds();
    if (millisecond < 100) {
        millisecond = '0' + millisecond;
    }
    return {
        time: (+d),
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        second: second,
        millisecond: millisecond
    };
}

export function isNumber(value) {
    return Object.prototype.toString.call(value) == '[object Number]';
}
export function isString(value) {
    return Object.prototype.toString.call(value) == '[object String]';
}
export function isArray(value) {
    return Object.prototype.toString.call(value) == '[object Array]';
}
export function isBoolean(value) {
    return Object.prototype.toString.call(value) == '[object Boolean]';
}
export function isUndefined(value) {
    return Object.prototype.toString.call(value) == '[object Undefined]';
}
export function isNull(value) {
    return Object.prototype.toString.call(value) == '[object Null]';
}
export function isSymbol(value) {
    return Object.prototype.toString.call(value) == '[object Symbol]';
}
export function isObject(value) {
    return (
        Object.prototype.toString.call(value) == '[object Object]' ||
        (!isNumber(value) &&
            !isString(value) &&
            !isBoolean(value) &&
            !isArray(value) &&
            !isNull(value) &&
            !isFunction(value) &&
            !isUndefined(value) &&
            !isSymbol(value)
        )
    );
}
export function isFunction(value) {
    return Object.prototype.toString.call(value) == '[object Function]';
}
export function isElement(value) {
    return (
        typeof HTMLElement === 'object' ? value instanceof HTMLElement : //DOM2
        value && typeof value === 'object' && value !== null && value.nodeType === 1 && typeof value.nodeName === 'string'
    );
}
export function isWindow(value) {
    var toString = Object.prototype.toString.call(value);
    return toString == '[object global]' || toString == '[object Window]' || toString == '[object DOMWindow]';
}

export function isPlainObject(obj) {
    let hasOwn = Object.prototype.hasOwnProperty;
    if (!obj || typeof obj !== 'object' || obj.nodeType || isWindow(obj)) {
        return false;
    }
    try {
        if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false;
        }
    } catch (e) {
        return false;
    }
    let key;
    return key === undefined || hasOwn.call(obj, key);
}

export function htmlEncode(text) {
    return document.createElement('a').appendChild(document.createTextNode(text)).parentNode.innerHTML;
}