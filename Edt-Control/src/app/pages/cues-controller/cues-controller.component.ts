import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SocketService} from '../../socket.service';

@Component({
    selector: 'app-cues-controller',
    template: `
        <ul *ngIf="(sock.cueList$ | async) as cues">
            <li *ngFor="let cue of cues">
                <h1>{{cue.title}}</h1>
                <p>{{cue.description}}</p>
            </li>
        </ul>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CuesControllerComponent implements OnInit {

    constructor(public sock: SocketService) {
    }

    ngOnInit() {
    }

}
