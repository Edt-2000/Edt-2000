import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlitchTextComponent } from './components/glitch-text/glitch-text.component';
import { BluescreenComponent } from './views/bluescreen/bluescreen.component';
import { ColorBackgroundComponent } from './views/color-background/color-background.component';
import { ColorBlocksComponent } from './views/color-blocks/color-blocks.component';
import { ColorGlitchComponent } from './views/color-glitch/color-glitch.component';
import { ColorTwinkleComponent } from './views/color-twinkle/color-twinkle.component';
import { GridscapeComponent } from './views/gridscape/gridscape.component';
import { HackingComponent } from './views/hacking/hacking.component';
import { KaleidoComponent } from './views/kaleido/kaleido.component';
import { KaraokeComponent } from './views/karaoke/karaoke.component';
import { LogoComponent } from './views/logo/logo.component';
import { PhotoBlocksComponent } from './views/photo-blocks/photo-blocks.component';
import { PhotoBouncerComponent } from './views/photo-bouncer/photo-bouncer.component';
import { PhotoGlitcherComponent } from './views/photo-glitcher/photo-glitcher.component';
import { ShutdownComponent } from './views/shutdown/shutdown.component';
import { SpectrumComponent } from './views/spectrum/spectrum.component';
import { TextBouncerComponent } from './views/text-bouncer/text-bouncer.component';
import { VideoPlayerComponent } from './views/video-player/video-player.component';
import { VistaComponent } from './views/vista/vista.component';
import { WheelComponent } from './views/wheel/wheel.component';
import { CirclesComponent } from './views/circles/circles.component';

@NgModule({
    declarations: [
        AppComponent,
        BluescreenComponent,
        ColorBackgroundComponent,
        ColorBlocksComponent,
        ColorGlitchComponent,
        ColorTwinkleComponent,
        GlitchTextComponent,
        GridscapeComponent,
        HackingComponent,
        KaleidoComponent,
        KaraokeComponent,
        LogoComponent,
        PhotoBlocksComponent,
        PhotoBouncerComponent,
        PhotoGlitcherComponent,
        ShutdownComponent,
        VideoPlayerComponent,
        VistaComponent,
        WheelComponent,
        TextBouncerComponent,
        SpectrumComponent,
        CirclesComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, NgOptimizedImage],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
