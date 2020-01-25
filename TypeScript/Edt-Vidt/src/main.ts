import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueSocketIO from 'vue-socket.io';

Vue.config.productionTip = false;

let params = new URLSearchParams(document.location.search.substring(1));
let sledtIp = params.get('ip') || 'localhost';

const vidtSocketConfig = {
    url: `http://${sledtIp}:8898/vidt`,
    options: {
        transports: ['websocket'],
    },
};

Vue.use(new VueSocketIO({
    connection: vidtSocketConfig.url,
    options: vidtSocketConfig.options,
}));

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
