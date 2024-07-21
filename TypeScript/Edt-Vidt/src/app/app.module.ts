import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlitchTextComponent } from './components/glitch-text/glitch-text.component';
import { BluescreenComponent } from './views/bluescreen/bluescreen.component';
import { LogoComponent } from './views/logo/logo.component';
import { ShutdownComponent } from './views/shutdown/shutdown.component';
import { VideoPlayerComponent } from './views/video-player/video-player.component';
import { VistaComponent } from './views/vista/vista.component';
import { WheelComponent } from './views/wheel/wheel.component';
import { HackingComponent } from './views/hacking/hacking.component';
import { GridscapeComponent } from './views/gridscape/gridscape.component';
import { KaleidoComponent } from './views/kaleido/kaleido.component';
import { KaraokeComponent } from './views/karaoke/karaoke.component';
import { ColorTwinkleComponent } from './views/color-twinkle/color-twinkle.component';
import { ColorGlitchComponent } from './views/color-glitch/color-glitch.component';
import { ColorBackgroundComponent } from './views/color-background/color-background.component';
import { ColorBlocksComponent } from './views/color-blocks/color-blocks.component';
import { PhotoBlocksComponent } from './views/photo-blocks/photo-blocks.component';
import { PhotoBouncerComponent } from './views/photo-bouncer/photo-bouncer.component';
import { PhotoGlitcherComponent } from './views/photo-glitcher/photo-glitcher.component';
import { TextBouncerComponent } from './views/text-bouncer/text-bouncer.component';

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
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
