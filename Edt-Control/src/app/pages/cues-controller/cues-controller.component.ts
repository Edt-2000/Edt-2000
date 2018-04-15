import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CUE_LIST} from '../../../../../Shared/actions';
import {CommunicationService} from '../../communication.service';

@Component({
    selector: 'app-cues-controller',
    template: `
        <ul *ngIf="(cueList$ | async) as cues">
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
    cueList$ = this.communicationService.actions$[CUE_LIST];

    constructor(public communicationService: CommunicationService) {
    }

    ngOnInit() {
    }

}
