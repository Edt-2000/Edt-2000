import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpectrumComponent } from 'app/views/spectrum/spectrum.component';
import { VidtPresets } from '../../../Shared/vidt-presets';
import { BluescreenComponent } from './views/bluescreen/bluescreen.component';
import { ColorBlocksComponent } from './views/color-blocks/color-blocks.component';
import { ColorTwinkleComponent } from './views/color-twinkle/color-twinkle.component';
import { ColorGlitchComponent } from './views/color-glitch/color-glitch.component';
import { ColorBackgroundComponent } from './views/color-background/color-background.component';
import { GridscapeComponent } from './views/gridscape/gridscape.component';
import { HackingComponent } from './views/hacking/hacking.component';
import { KaleidoComponent } from './views/kaleido/kaleido.component';
import { LogoComponent } from './views/logo/logo.component';
import { KaraokeComponent } from './views/karaoke/karaoke.component';
import { PhotoBouncerComponent } from './views/photo-bouncer/photo-bouncer.component';
import { PhotoBlocksComponent } from './views/photo-blocks/photo-blocks.component';
import { PhotoGlitcherComponent } from './views/photo-glitcher/photo-glitcher.component';
import { ShutdownComponent } from './views/shutdown/shutdown.component';
import { VideoPlayerComponent } from './views/video-player/video-player.component';
import { VistaComponent } from './views/vista/vista.component';
import { WheelComponent } from './views/wheel/wheel.component';
import { TextBouncerComponent } from './views/text-bouncer/text-bouncer.component';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: VidtPresets[VidtPresets.logo],
    },
    {
        path: VidtPresets[VidtPresets.bluescreen],
        component: BluescreenComponent,
    },
    {
        path: VidtPresets[VidtPresets.colorBlocks],
        component: ColorBlocksComponent,
    },
    {
        path: VidtPresets[VidtPresets.colorTwinkle],
        component: ColorTwinkleComponent,
    },
    {
        path: VidtPresets[VidtPresets.colorGlitch],
        component: ColorGlitchComponent,
    },
    {
        path: VidtPresets[VidtPresets.color],
        component: ColorBackgroundComponent,
    },
    {
        path: VidtPresets[VidtPresets.gridscape],
        component: GridscapeComponent,
    },
    {
        path: VidtPresets[VidtPresets.hacking],
        component: HackingComponent,
    },
    {
        path: VidtPresets[VidtPresets.kaleido],
        component: KaleidoComponent,
    },
    {
        path: VidtPresets[VidtPresets.karaoke],
        component: KaraokeComponent,
    },
    {
        path: VidtPresets[VidtPresets.logo],
        component: LogoComponent,
    },
    {
        path: VidtPresets[VidtPresets.photobouncer],
        component: PhotoBouncerComponent,
    },
    {
        path: VidtPresets[VidtPresets.photoBlocks],
        component: PhotoBlocksComponent,
    },
    {
        path: VidtPresets[VidtPresets.photoglitcher],
        component: PhotoGlitcherComponent,
    },
    {
        path: VidtPresets[VidtPresets.shutdown],
        component: ShutdownComponent,
    },
    {
        path: VidtPresets[VidtPresets.spectrum],
        component: SpectrumComponent,
    },
    {
        path: VidtPresets[VidtPresets.textBouncer],
        component: TextBouncerComponent,
    },
    {
        path: VidtPresets[VidtPresets.videoPlayer],
        component: VideoPlayerComponent,
    },
    {
        path: VidtPresets[VidtPresets.vista],
        component: VistaComponent,
    },
    {
        path: VidtPresets[VidtPresets.wheel],
        component: WheelComponent,
    },
    {
        path: '**',
        redirectTo: VidtPresets[VidtPresets.logo],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
