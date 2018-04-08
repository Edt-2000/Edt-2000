import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SocketIoModule} from 'ngx-socket-io';
import {socketConfig} from '../../../Shared/socket';


import {AppComponent} from './app.component';
import {CommunicationService} from './communication.service';
import {ColorFlashesComponent} from './pages/color-flashes/color-flashes.component';
import {ColoredTriggerComponent} from './components/colored-trigger/colored-trigger.component';
import {PresetToggleComponent} from './components/preset-toggle/preset-toggle.component';
import {PresetTogglerComponent} from './pages/preset-toggler/preset-toggler.component';
import { PageSwitcherComponent } from './pages/page-switcher.component';


const appRoutes = <Routes>[
  {
    path: '',
    component: PageSwitcherComponent,
    children: [
      {
        path: 'colorFlashes',
        component: ColorFlashesComponent
      },
      {
        path: 'presetToggler',
        component: PresetTogglerComponent
      }
    ]
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
    ColoredTriggerComponent,
    PresetToggleComponent,
    PresetTogglerComponent,
    PageSwitcherComponent
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
  ],
  exports: []
})
export class AppModule {
}
