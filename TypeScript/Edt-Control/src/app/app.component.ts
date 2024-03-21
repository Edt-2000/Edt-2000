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

    pages = pages.map(page => {
        if (page.text === 'Launchpad') {
            return { text: 'Launchpad 0', path: 'launchpad-controller/0' };
        }
        return page;
    }).concat([{ text: 'Launchpad 1', path: 'launchpad-controller/1' }, {
        text: 'Launchpad 2',
        path: 'launchpad-controller/2',
    }]);
}
