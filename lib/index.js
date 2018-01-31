import RConsole from './console';
const rConsole = new RConsole();
window.$rc = rConsole;

import RNetwork from './network';
const rNetwork = new RNetwork();
window.$rn = rNetwork;

import RStorage from './storage';
const rStorage = new RStorage();
window.$rs = rStorage;

let rElement = {
    html: document.documentElement.outerHTML,
    ele: document.documentElement,
};

window.$re = rElement;

const __EASY_CONSOLE = {
    data: {
        rConsole,
        rNetwork,
        rStorage,
        rElement,
    },
    updateData () {
        rStorage.getStorage();
        rElement.html = document.documentElement.outerHTML;
    },
};

window.__EASY_CONSOLE = __EASY_CONSOLE;

export default __EASY_CONSOLE;