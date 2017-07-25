import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {CommunicationService} from './communication.service';

import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {TextDisplayComponent} from './text-display/text-display.component';
import {RouterModule, Routes} from '@angular/router';
import {vidtPresets} from '../../../SharedTypes/socket';
import { LogoIdleComponent } from './logo-idle-component/logo-idle.component';

const config: SocketIoConfig = {
    url: '192.168.2.16:8988',
    options: {}
};

const appRoutes = <Routes>[
    {
        path: vidtPresets.LogoIdle,
        component: LogoIdleComponent
    },
    {
        path: vidtPresets.TextDisplay,
        component: TextDisplayComponent
    },
    {
        path: '**',
        redirectTo: vidtPresets.LogoIdle,
    }
];

@NgModule({
    declarations: [
        AppComponent,
        TextDisplayComponent,
        LogoIdleComponent
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
