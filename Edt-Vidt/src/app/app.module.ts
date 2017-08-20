import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CommunicationService} from './communication.service';

import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {TextDisplayComponent} from './text-display/text-display.component';
import {RouterModule, Routes} from '@angular/router';
import {VidtPresets} from '../../../SharedTypes/socket';
import { LogoIdleComponent } from './logo-idle-component/logo-idle.component';
import {GlitchTextComponent} from "./glitch-text-component/glitch-text.component";

const config: SocketIoConfig = {
    url: '192.168.2.16:8988',
    options: {}
};

const appRoutes = <Routes>[
    {
        path: VidtPresets.LogoIdle,
        component: LogoIdleComponent
    },
    {
        path: VidtPresets.TextDisplay,
        component: TextDisplayComponent
    },
    {
        path: '**',
        redirectTo: VidtPresets.LogoIdle,
    }
];

@NgModule({
    declarations: [
        AppComponent,
        GlitchTextComponent,
        LogoIdleComponent,
        TextDisplayComponent
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
