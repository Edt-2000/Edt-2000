import VueRouter from 'vue-router';
import { ScreensaveBouncerComponent } from '../presets/screensave-bouncer/screensave-bouncer.component';
import { LogoComponent } from '../presets/logo/logo.component';
import { ShutdownComponent } from '../presets/shutdown/shutdown.component';
import { BluescreenComponent } from '../presets/bluescreen/bluescreen.component';
import { VistaComponent } from '../presets/vista/vista.component';
import { HackingComponent } from '../presets/hacking/hacking.component';
import { GridscapeComponent } from '../presets/gridscape/gridscape.component';

export const router = new VueRouter({
    base:'',
    routes: [
        { path: '/',component: LogoComponent },
        { path: '/bluescreen', component: BluescreenComponent },
        { path: '/gridscape', component: GridscapeComponent },
        { path: '/hacking', component: HackingComponent },
        { path: '/logo', component: LogoComponent },
        { path: '/screensave-bouncer', component: ScreensaveBouncerComponent },
        { path: '/shutdown', component: ShutdownComponent },
        { path: '/vista', component: VistaComponent },
        { path: '*', redirect: '/' },
    ]
});