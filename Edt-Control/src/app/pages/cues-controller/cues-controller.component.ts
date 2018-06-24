import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Actions$} from '../../../../../Shared/actions';

@Component({
    selector: 'app-cues-controller',
    templateUrl: './cues-controller.component.html',
    styleUrls: ['./cues-controller.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CuesControllerComponent implements OnInit {
    cueList$ = Actions$.cueList.asObservable();

    constructor() {
    }

    ngOnInit() {
    }

}
