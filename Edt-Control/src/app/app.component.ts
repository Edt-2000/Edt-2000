import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>test: {{title}}</p>
  `
})
export class AppComponent {
  title = 'app';
}
