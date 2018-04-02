import VueRouter from 'vue-router';
import { ScreensaveBouncer } from '../presets/screensave-bouncer/screensave-bouncer.component';
import { Logo } from '../presets/logo/logo.component';

export const router = new VueRouter({
    base:'',
    routes: [
        { path: '/',component: Logo },
        { path: '/logo', component: Logo },
        { path: '/screensave-bouncer', component: ScreensaveBouncer },
        { path: '*', redirect: '/' },

    ]
});