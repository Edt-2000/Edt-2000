import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CommunicationService} from './communication.service';

import {SocketIoModule} from 'ngx-socket-io';
import {TextDisplayComponent} from './presets/text-display/text-display.component';
import {RouterModule, Routes} from '@angular/router';
import {VidtPresets} from '../../../SharedTypes/socket';

import {GlitchTextComponent} from './components/glitch-text-component/glitch-text.component';
import {GridscapeComponent} from './presets/gridscape/gridscape.component';
import {LogoIdleComponent} from './presets/logo-idle-component/logo-idle.component';
import {HackingAnimationComponent} from './presets/hacking-animation/hacking-animation.component';
import {ShutdownComponent} from './presets/shutdown/shutdown.component';
import {VideoTvEffectComponent} from './components/video-tv-effect/video-tv-effect.component';
import {BluescreenComponent} from './presets/bluescreen/bluescreen.component';
import {VideoPlayerComponent} from './presets/video-player/video-player.component';
import {VistaComponent} from './presets/vista/vista.component';

import {socketConfig} from '../../../SharedTypes/socket';
import { PhotoGlitcherComponent } from './presets/photo-glitcher/photo-glitcher.component';

const appRoutes = <Routes>[{
    path: VidtPresets.Gridscape,
    component: GridscapeComponent,
}, {
    path: VidtPresets.LogoIdle,
    component: LogoIdleComponent
}, {
    path: VidtPresets.TextDisplay,
    component: TextDisplayComponent
}, {
    path: VidtPresets.HackingAnimation,
    component: HackingAnimationComponent
}, {
    path: VidtPresets.Shutdown,
    component: ShutdownComponent
}, {
    path: VidtPresets.Bluescreen,
    component: BluescreenComponent
}, {
    path: VidtPresets.VideoPlayer,
    component: VideoPlayerComponent
}, {
    path: VidtPresets.PhotoGlitcher,
    component: PhotoGlitcherComponent
}, {
    path: VidtPresets.Vista,
    component: VistaComponent
}, {
    path: '**',
    redirectTo: VidtPresets.LogoIdle,
}];

@NgModule({
    declarations: [
        AppComponent,
        GlitchTextComponent,
        LogoIdleComponent,
        TextDisplayComponent,
        HackingAnimationComponent,
        ShutdownComponent,
        VideoTvEffectComponent,
        VideoPlayerComponent,
        BluescreenComponent,
        VistaComponent,
        GridscapeComponent,
        PhotoGlitcherComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        ),
        BrowserModule,
        SocketIoModule.forRoot(socketConfig)
    ],
    providers: [
        CommunicationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
