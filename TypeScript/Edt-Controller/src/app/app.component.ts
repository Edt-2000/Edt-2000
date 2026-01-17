import { Component } from '@angular/core';
import {
    Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
} from '@angular/router';
import { SocketService } from './socket.service';
import { Actions$ } from '../../../Shared/actions/actions';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { pages } from './app.routes';

@Component({
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterLink, RouterOutlet, RouterLinkActive, AsyncPipe],
})
export class AppComponent {
    pages$ = Actions$.launchpadPageIndex.pipe(
        map((pageIndex) => Object.entries(pageIndex).map(([key]) => key)),
        map((ids) => {
            const launchpadPages = ids.map((id) => ({
                title: `Launchpad: ${id}`,
                path: `launchpad-controller/${id}`,
            }));
            return pages.concat(launchpadPages);
        }),
    );
    $songTitle = Actions$.contentGroup.pipe(
        map((contentGroup) => contentGroup.title),
    );

    constructor(
        public socket: SocketService,
        public router: Router,
    ) {}
}
