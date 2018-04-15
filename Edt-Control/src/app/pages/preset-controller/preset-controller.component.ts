import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';
import {PRESET_STATE} from '../../../../../Shared/actions';

@Component({
    selector: 'app-preset-controller',
    template: `
        <ul *ngIf="(presetState$ | async) as presets">
            <li *ngFor="let preset of presets;">
                <app-preset-button [preset]="preset" (presetChange)="presetChange($event)"></app-preset-button>
            </li>
        </ul>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetControllerComponent implements OnInit {
    presetState$ = this.communicationService.actions$[PRESET_STATE];

    constructor(public communicationService: CommunicationService) {}

    ngOnInit(): void {

    }
}
