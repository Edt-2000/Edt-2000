import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SocketIoModule} from 'ngx-socket-io';
import {socketConfig} from '../../../Shared/config';

import {AppComponent} from './app.component';
import {CommunicationService} from './communication.service';
import {PresetControllerComponent} from './pages/preset-controller/preset-controller.component';
import {ColorControllerComponent} from './pages/color-controller/color-controller.component';
import {pages} from './app.routes';
import { PresetButtonComponent } from './components/preset-button/preset-button.component';
import { CuesControllerComponent } from './pages/cues-controller/cues-controller.component';

@NgModule({
    declarations: [
        AppComponent,
        PresetControllerComponent,
        ColorControllerComponent,
        PresetButtonComponent,
        CuesControllerComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot(
            [
                ...pages,
                {
                    path: '',
                    redirectTo: pages[0].path,
                    pathMatch: 'full'
                }
            ],
            {enableTracing: true} // <-- debugging purposes only
        ),
        SocketIoModule.forRoot(socketConfig)
    ],
    providers: [
        CommunicationService
    ],
    bootstrap: [
        AppComponent
    ],
    exports: []
})
export class AppModule {
}
