import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-page-switcher></app-page-switcher>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
}
