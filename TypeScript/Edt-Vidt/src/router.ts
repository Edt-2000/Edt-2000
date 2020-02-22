import Vue from 'vue';
import Router from 'vue-router';
import { VidtPresets } from '../../Shared/vidt-presets';
import LogoComponent from './views/logo/logo.component.vue';
import BluescreenComponent from './views/bluescreen/bluescreen.component.vue';
import ColorBackgroundComponent from './views/color-background/color-background.component.vue';
import GridscapeComponent from './views/gridscape/gridscape.component.vue';
import HackingComponent from './views/hacking/hacking.component.vue';
import PhotoBouncerComponent from './views/photo-bouncer/photo-bouncer.component.vue';
import PhotoGlitcherComponent from './views/photo-glitcher/photo-glitcher.component.vue';
import TextBouncerComponent from './views/text-bouncer/text-bouncer.component.vue';
import ShutdownComponent from './views/shutdown/shutdown.component.vue';
import VistaComponent from './views/vista/vista.component.vue';
import ColorTwinkleComponent from './views/color-twinkle/color-twinkle.component.vue';
import KaraokeComponent from './views/karaoke/karaoke.component.vue';
import ColorBlocksComponent from './views/color-blocks/color-blocks.component.vue';

Vue.use(Router);

export default new Router({
    routes: [
        { path: '/' + VidtPresets[VidtPresets.logo] || '', component: LogoComponent },
        { path: '/' + VidtPresets[VidtPresets.bluescreen] || '', component: BluescreenComponent },
        { path: '/' + VidtPresets[VidtPresets.color] || '', component: ColorBackgroundComponent },
        // {path: '/' + VidtPresets[VidtPresets.multicolor] || '', component: MultiColorBackgroundComponent},
        { path: '/' + VidtPresets[VidtPresets.gridscape] || '', component: GridscapeComponent },
        { path: '/' + VidtPresets[VidtPresets.hacking] || '', component: HackingComponent },
        { path: '/' + VidtPresets[VidtPresets.photobouncer] || '', component: PhotoBouncerComponent },
        { path: '/' + VidtPresets[VidtPresets.photoglitcher] || '', component: PhotoGlitcherComponent },
        { path: '/' + VidtPresets[VidtPresets.textBouncer] || '', component: TextBouncerComponent },
        { path: '/' + VidtPresets[VidtPresets.shutdown] || '', component: ShutdownComponent },
        // {path: '/' + VidtPresets[VidtPresets.video] || '', component: VideoPlayerComponent},
        { path: '/' + VidtPresets[VidtPresets.vista] || '', component: VistaComponent },
        { path: '/' + VidtPresets[VidtPresets.colorTwinkle] || '', component: ColorTwinkleComponent },
        { path: '/' + VidtPresets[VidtPresets.karaoke] || '', component: KaraokeComponent },
        { path: '/' + VidtPresets[VidtPresets.colorBlocks] || '', component: ColorBlocksComponent },
        { path: '*', redirect: '/' + VidtPresets[VidtPresets.logo] || '' },
    ],
});
