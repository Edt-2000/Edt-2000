import VueRouter from 'vue-router';
import {PhotoGlitcherComponent} from '../presets/photo-glitcher/photo-glitcher.component';
import {BluescreenComponent} from '../presets/bluescreen/bluescreen.component';
import {HackingComponent} from '../presets/hacking/hacking.component';
import {VistaComponent} from '../presets/vista/vista.component';
import {LogoComponent} from '../presets/logo/logo.component';
import {PhotoBouncerComponent} from '../presets/photo-bouncer/photo-bouncer.component';
import {ColorBackgroundComponent} from '../presets/color-background/color-background.component';
import {TextBouncerComponent} from '../presets/text-bouncer/text-bouncer.component';
import {VideoPlayerComponent} from '../presets/video-player/video-player.component';
import {GridscapeComponent} from '../presets/gridscape/gridscape.component';
import {ShutdownComponent} from '../presets/shutdown/shutdown.component';
import {vidtPresets} from '../../../../Shared/vidt-presets';
import {ColorTwinkleComponent} from '../presets/color-twinkle/color-twinkle.component';
import {KaraokeComponent} from '../presets/karaoke/karaoke.component';

export const router = new VueRouter({
    base:'',
    routes: [
        { path: vidtPresets.get(1) || '',   component: LogoComponent },
        { path: vidtPresets.get(2) || '',   component: BluescreenComponent },
        { path: vidtPresets.get(3) || '',   component: ColorBackgroundComponent },
        { path: vidtPresets.get(4) || '',   component: GridscapeComponent },
        { path: vidtPresets.get(5) || '',   component: HackingComponent },
        { path: vidtPresets.get(6) || '',   component: PhotoBouncerComponent },
        { path: vidtPresets.get(7) || '',   component: PhotoGlitcherComponent },
        { path: vidtPresets.get(8) || '',   component: TextBouncerComponent },
        { path: vidtPresets.get(9) || '',   component: ShutdownComponent },
        { path: vidtPresets.get(10) || '',  component: VideoPlayerComponent },
        { path: vidtPresets.get(11) || '',  component: VistaComponent },
        { path: vidtPresets.get(12) || '',  component: ColorTwinkleComponent },
        { path: vidtPresets.get(13) || '',  component: KaraokeComponent },
        { path: '*', redirect: vidtPresets.get(1) || ''},
    ],
});
