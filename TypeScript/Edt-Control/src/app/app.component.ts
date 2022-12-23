import { Component } from '@angular/core';
import { pages } from './app.routes';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  pages = pages.filter(page => !page.excludeFromMenu);

  constructor(public socket: SocketService) {
  }

}
