import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';

@Component({
    selector: 'app-preset-controller',
    template: `
        <ul *ngIf="(communicationService.presetState$ | async) as presets">
            <li *ngFor="let preset of presets;">
                <app-preset-button [preset]="preset" (presetChange)="presetChange($event)"></app-preset-button>
            </li>
        </ul>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetControllerComponent implements OnInit {
    constructor(public communicationService: CommunicationService) {}

    ngOnInit(): void {

    }
}
