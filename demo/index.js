import Vue from 'vue';
import RemoteConsole from '../lib';

new Vue({
    el: '#app',
    data: {
        test: 'test',
        RemoteConsole,
    },
    created () {
        window.axios.get('./index.html')
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
});