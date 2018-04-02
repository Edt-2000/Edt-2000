import Vue from 'vue';
import VueRouter from 'vue-router';
import { Logo } from './presets/logo/logo.component';
import { ScreensaveBouncer } from './presets/screensave-bouncer/screensave-bouncer.component';
import App from './app/app.component';
import { communicationService } from './services/communication.service';

Vue.use(VueRouter);

const router = new VueRouter({
    base:'',
    routes: [
        { path: '/',component: Logo },
        { path: '/logo', component: Logo },
        { path: '/screensave-bouncer', component: ScreensaveBouncer },
        { path: '*', redirect: '/' },

    ]
});

const app = new Vue({
    el: '#app',
    router: router,
    provide: {
        communicationService: communicationService
    },
    template: '<app />',
    components: {
        App
    }
});
