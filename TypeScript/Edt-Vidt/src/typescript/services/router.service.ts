import VueRouter from 'vue-router';
import { PhotoGlitcherComponent } from '../presets/photo-glitcher/photo-glitcher.component';
import { BluescreenComponent } from '../presets/bluescreen/bluescreen.component';
import { HackingComponent } from '../presets/hacking/hacking.component';
import { VistaComponent } from '../presets/vista/vista.component';
import { LogoComponent } from '../presets/logo/logo.component';
import { PhotoBouncerComponent } from '../presets/photo-bouncer/photo-bouncer.component';
import { ColorBackgroundComponent } from '../presets/color-background/color-background.component';
import { TextBouncerComponent } from '../presets/text-bouncer/text-bouncer.component';
import { VideoPlayerComponent } from '../presets/video-player/video-player.component';
import { GridscapeComponent } from '../presets/gridscape/gridscape.component';
import { ShutdownComponent } from '../presets/shutdown/shutdown.component';
import { VidtPresets } from '../../../../Shared/vidt-presets';
import { ColorTwinkleComponent } from '../presets/color-twinkle/color-twinkle.component';
import { KaraokeComponent } from '../presets/karaoke/karaoke.component';

/**
 * We need to map the vidtPreset enum to Vue component routing;
 * we don't want cross imports between projects
 */
export const router = new VueRouter({
    base: '',
    routes: [
        {path: '/' + VidtPresets[VidtPresets.logo] || '', component: LogoComponent},
        {path: '/' + VidtPresets[VidtPresets.bluescreen] || '', component: BluescreenComponent},
        {path: '/' + VidtPresets[VidtPresets.color] || '', component: ColorBackgroundComponent},
        {path: '/' + VidtPresets[VidtPresets.gridscape] || '', component: GridscapeComponent},
        {path: '/' + VidtPresets[VidtPresets.hacking] || '', component: HackingComponent},
        {path: '/' + VidtPresets[VidtPresets.photobouncer] || '', component: PhotoBouncerComponent},
        {path: '/' + VidtPresets[VidtPresets.photoglitcher] || '', component: PhotoGlitcherComponent},
        {path: '/' + VidtPresets[VidtPresets.textBouncer] || '', component: TextBouncerComponent},
        {path: '/' + VidtPresets[VidtPresets.shutdown] || '', component: ShutdownComponent},
        {path: '/' + VidtPresets[VidtPresets.video] || '', component: VideoPlayerComponent},
        {path: '/' + VidtPresets[VidtPresets.vista] || '', component: VistaComponent},
        {path: '/' + VidtPresets[VidtPresets.colorTwinkle] || '', component: ColorTwinkleComponent},
        {path: '/' + VidtPresets[VidtPresets.karaoke] || '', component: KaraokeComponent},
        {path: '*', redirect: '/' + VidtPresets[VidtPresets.logo] || ''},
    ],
});
