import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';
import {PRESET_STATE} from '../../../../../Shared/actions';

@Component({
    selector: 'app-preset-controller',
    template: `
        <section class="section">
            <div class="columns" *ngIf="(presetState$ | async) as presets">
                <div class="column" *ngFor="let preset of presets;">
                    <app-preset-button [preset]="preset" (presetChange)="presetChange($event)"></app-preset-button>
                </div>
            </div>
        </section>
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
