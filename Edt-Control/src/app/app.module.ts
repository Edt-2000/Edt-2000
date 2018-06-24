import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SocketIoModule} from 'ngx-socket-io';
import {socketConfig} from '../../../Shared/config';
import {AppComponent} from './app.component';
import {PresetControllerComponent} from './pages/preset-controller/preset-controller.component';
import {ColorControllerComponent} from './pages/color-controller/color-controller.component';
import {pages} from './app.routes';
import {PresetSwitcherComponent} from './components/preset-switcher/preset-switcher.component';
import {CuesControllerComponent} from './pages/cues-controller/cues-controller.component';
import {SocketService} from './socket.service';
import { VidtControllerComponent } from './pages/vidt-controller/vidt-controller.component';

@NgModule({
    declarations: [
        AppComponent,
        PresetControllerComponent,
        ColorControllerComponent,
        PresetSwitcherComponent,
        CuesControllerComponent,
        VidtControllerComponent
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
        SocketService
    ],
    bootstrap: [
        AppComponent
    ],
    exports: []
})
export class AppModule {
}
