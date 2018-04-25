import VueRouter from 'vue-router';
import { LogoComponent } from '../presets/logo/logo.component';
import { ShutdownComponent } from '../presets/shutdown/shutdown.component';
import { BluescreenComponent } from '../presets/bluescreen/bluescreen.component';
import { VistaComponent } from '../presets/vista/vista.component';
import { HackingComponent } from '../presets/hacking/hacking.component';
import { GridscapeComponent } from '../presets/gridscape/gridscape.component';
import { PhotoGlitcherComponent } from '../presets/photo-glitcher/photo-glitcher.component';
import { PhotoBouncerComponent } from '../presets/photo-bouncer/photo-bouncer.component';
import { VideoPlayerComponent } from '../presets/video-player/video-player.component';
import { TextBouncerComponent } from '../presets/text-bouncer/text-bouncer.component';
import { ColorBackgroundComponent } from '../presets/color-background/color-background.component';

export const router = new VueRouter({
    base:'',
    routes: [
        { path: '/',component: LogoComponent },
        { path: '/bluescreen', component: BluescreenComponent },
        { path: '/color-background', component: ColorBackgroundComponent },
        { path: '/gridscape', component: GridscapeComponent },
        { path: '/hacking', component: HackingComponent },
        { path: '/logo', component: LogoComponent },
        { path: '/photo-bouncer', component: PhotoBouncerComponent },
        { path: '/photo-glitcher', component: PhotoGlitcherComponent },
        { path: '/text-bouncer', component: TextBouncerComponent },
        { path: '/shutdown', component: ShutdownComponent },
        { path: '/video-player', component: VideoPlayerComponent },
        { path: '/vista', component: VistaComponent },
        { path: '*', redirect: '/' },
    ]
});