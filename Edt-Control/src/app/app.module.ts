import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {SocketIoModule} from 'ngx-socket-io';
import {socketConfig} from '../../../SharedTypes/socket';

import {AppComponent} from './app.component';
import {CommunicationService} from './communication.service';
import {PageSwitcherComponent} from './pages/page-switcher.component';
import {PresetControllerComponent} from './pages/preset-controller/preset-controller.component';
import {ColorControllerComponent} from './pages/color-controller/color-controller.component';
import {pages} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PageSwitcherComponent,
    PresetControllerComponent,
    ColorControllerComponent
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
