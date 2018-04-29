import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Actions$} from '../../../../../Shared/actions';

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
    cueList$ = Actions$.cueList.asObservable();

    constructor() {
    }

    ngOnInit() {
    }

}
