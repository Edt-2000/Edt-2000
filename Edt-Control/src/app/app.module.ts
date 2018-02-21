import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SocketIoModule} from 'ngx-socket-io';
import {socketConfig} from '../../../SharedTypes/socket';


import { AppComponent } from './app.component';
import {CommunicationService} from './communication.service';
import { ColorFlashesComponent } from './pages/color-flashes/color-flashes.component';
import { ColoredTriggerComponent } from './components/colored-trigger/colored-trigger.component';


const appRoutes = <Routes>[
  {
    path: 'colorFlashes',
    component: ColorFlashesComponent
  },
  {
    path: '',
    redirectTo: 'colorFlashes',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ColorFlashesComponent,
    ColoredTriggerComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    SocketIoModule.forRoot(socketConfig)
  ],
  providers: [
    ColorFlashesComponent,
    ColoredTriggerComponent,
    CommunicationService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
