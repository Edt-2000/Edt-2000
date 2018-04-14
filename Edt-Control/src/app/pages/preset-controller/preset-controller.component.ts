import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';

@Component({
    selector: 'app-preset-controller',
    template: `
        <ul *ngIf="(presets$ | async) as presets">
            <li *ngFor="let preset of presets" [style.background-color]="preset.active ? 'orange' : 'green'">
                {{preset.title}}
            </li>
        </ul>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetControllerComponent implements OnInit {
    presets$ = this.communicationService.presets$;

    constructor(private communicationService: CommunicationService) {}

    ngOnInit(): void {

    }
}
