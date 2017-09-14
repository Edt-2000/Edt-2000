import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CommunicationService} from './communication.service';

import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {TextDisplayComponent} from './presets/text-display/text-display.component';
import {RouterModule, Routes} from '@angular/router';
import {VidtPresets} from '../../../SharedTypes/socket';

import {GlitchTextComponent} from './components/glitch-text-component/glitch-text.component';
import {LogoIdleComponent} from './presets/logo-idle-component/logo-idle.component';
import {HackingAnimationComponent} from './presets/hacking-animation/hacking-animation.component';
import {TvShutdownComponent} from './presets/tv-shutdown/tv-shutdown.component';
import {VideoTvEffectComponent} from './components/video-tv-effect/video-tv-effect.component';
import {BluescreenComponent} from './presets/bluescreen/bluescreen.component';
import {VideoPlayerComponent} from './presets/video-player/video-player.component';
import {VistaComponent} from './presets/vista/vista.component';

const config: SocketIoConfig = {
    url: '10.0.0.200:8988',
    options: {}
};

const appRoutes = <Routes>[{
    path: VidtPresets.LogoIdle,
    component: LogoIdleComponent
}, {
    path: VidtPresets.TextDisplay,
    component: TextDisplayComponent
}, {
    path: VidtPresets.HackingAnimation,
    component: HackingAnimationComponent
}, {
    path: VidtPresets.TvShutdown,
    component: TvShutdownComponent
}, {
    path: VidtPresets.Bluescreen,
    component: BluescreenComponent
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
        TvShutdownComponent,
        VideoTvEffectComponent,
        VideoPlayerComponent,
        BluescreenComponent,
        VistaComponent
    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: true} // <-- debugging purposes only
        ),
        BrowserModule,
        SocketIoModule.forRoot(config)
    ],
    providers: [
        CommunicationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
