import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Actions, Actions$} from '../../../../../Shared/actions';
import {ICue} from '../../../../../Shared/types';
import {SocketService} from '../../socket.service';

@Component({
    selector: 'app-cues-controller',
    template: `
    <ul class="list" *ngIf="(cueList$ | async) as cues">
        <li class="list__item" *ngFor="let cue of cues">
            <button class="button" (click)="activateCue(cue)">{{cue.label}}</button>
        </li>
    </ul>
    `,
    styleUrls: ['./cues-controller.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CuesControllerComponent {
    cueList$ = Actions$.cueList.asObservable();

    constructor(private socket: SocketService) {
    }

    activateCue(cue: ICue) {
        console.log('sending cue: ', cue.label);
        cue.actions.forEach(action => {
            this.socket.toSledt(action);
        })
    }
}
