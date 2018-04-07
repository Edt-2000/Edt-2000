import VueRouter from 'vue-router';
import { ScreensaveBouncerComponent } from '../presets/screensave-bouncer/screensave-bouncer.component';
import { LogoComponent } from '../presets/logo/logo.component';
import { ShutdownComponent } from '../presets/shutdown/shutdown.component';
import { BluescreenComponent } from '../presets/bluescreen/bluescreen.component';
import { VistaComponent } from '../presets/vista/vista.component';
import { HackingComponent } from '../presets/hacking/hacking.component';
import { GridscapeComponent } from '../presets/gridscape/gridscape.component';
import { PhotoGlitcherComponent } from '../presets/photo-glitcher/photo-glitcher.component';
import { PhotoBouncerComponent } from '../presets/photo-bouncer/photo-bouncer.component';
import { VideoPlayerComponent } from '../presets/video-player/video-player.component';

export const router = new VueRouter({
    base:'',
    routes: [
        { path: '/',component: LogoComponent },
        { path: '/bluescreen', component: BluescreenComponent },
        { path: '/gridscape', component: GridscapeComponent },
        { path: '/hacking', component: HackingComponent },
        { path: '/logo', component: LogoComponent },
        { path: '/photo-bouncer', component: PhotoBouncerComponent },
        { path: '/photo-glitcher', component: PhotoGlitcherComponent },
        { path: '/screensave-bouncer', component: ScreensaveBouncerComponent },
        { path: '/shutdown', component: ShutdownComponent },
        { path: '/video-player', component: VideoPlayerComponent },
        { path: '/vista', component: VistaComponent },
        { path: '*', redirect: '/' },
    ]
});