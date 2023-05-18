import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { pages } from './app.routes';
import { SocketService } from './socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    constructor(
        public socket: SocketService,
        public router: Router,
    ) {
    }

    pages = pages;
}
