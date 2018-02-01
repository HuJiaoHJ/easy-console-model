import Vue from 'vue';
import easyConsole from 'easy-console-model';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import vMain from './components/main.vue';

new Vue({
    el: '#app',
    data: {
        test: 'test',
        easyConsoleData: easyConsole.data,
    },
    components: {
        vMain,
    },
    created () {
        // console
        console.log('log');
        console.info('info');
        console.debug('debug');
        console.warn('warn');
        console.error('error');
        // network
        window.axios.get('./index.html')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // storage
        document.cookie = 'cookie1=cookie1';
        document.cookie = 'cookie2=cookie2';
        document.cookie = 'cookie3=cookie3';
        console.log(document.cookie);
        window.localStorage.setItem('localStorage1', 'localStorage1');
        window.localStorage.setItem('localStorage2', 'localStorage2');
        window.localStorage.setItem('localStorage3', 'localStorage3');
        console.log(window.localStorage);
    },
    mounted () {
        easyConsole.updateData();
    },
});