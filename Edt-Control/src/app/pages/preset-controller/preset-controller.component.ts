import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';
import {PRESET_STATE} from '../../../../../Shared/actions';

@Component({
    selector: 'app-preset-controller',
    template: `
        <div class="columns" *ngIf="(presetState$ | async) as presets">
            <div class="column" *ngFor="let preset of presets;">
                <app-preset-switcher [preset]="preset"></app-preset-switcher>
            </div>
        </div>
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
