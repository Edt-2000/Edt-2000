import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueSocketIO from 'vue-socket.io';
import { vidtSocketConfig } from '../../Shared/config';

Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
    connection: vidtSocketConfig.url,
    options: vidtSocketConfig.options,
}));

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
