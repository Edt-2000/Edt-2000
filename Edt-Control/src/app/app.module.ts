import {CommonModule} from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import { AppComponent } from './app.component';
import { ColorFlashesComponent } from './pages/color-flashes/color-flashes.component';
import { ColoredTriggerComponent } from './components/colored-trigger/colored-trigger.component';


const appRoutes = <Routes>[{
  path: 'colorFlashes',
  component: ColorFlashesComponent
}];

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
  ],
  providers: [
    ColorFlashesComponent,
    ColoredTriggerComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
