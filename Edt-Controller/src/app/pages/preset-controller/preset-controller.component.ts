import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Actions$} from '../../../../../Shared/actions';

@Component({
    selector: 'app-preset-controller',
    templateUrl: './preset-controller.component.html',
    styleUrls: ['./preset-controller.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetControllerComponent implements OnInit {
    presetState$ = Actions$.presetState.asObservable();

    constructor() {
    }

    ngOnInit(): void {

    }
}
