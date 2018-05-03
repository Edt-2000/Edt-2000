import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Actions$} from '../../../../../Shared/actions';

@Component({
    selector: 'app-preset-controller',
    template: `
        <div class="columns is-multiline" *ngIf="(presetState$ | async) as presets">
            <div class="column is-fullwidth" *ngFor="let preset of presets;">
                <app-preset-switcher [preset]="preset"></app-preset-switcher>
            </div>
        </div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetControllerComponent implements OnInit {
    presetState$ = Actions$.presetState.asObservable();

    constructor() {
    }

    ngOnInit(): void {

    }
}
