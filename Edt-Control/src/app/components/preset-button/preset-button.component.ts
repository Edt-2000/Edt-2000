import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IControlPresetMsg} from '../../../../../Shared/types';
import {CommunicationService} from '../../communication.service';
import {Actions} from '../../../../../Shared/actions';

@Component({
    selector: 'app-preset-button',
    template: `        
        <ng-container [ngSwitch]="preset.config.type">
            <ng-container *ngSwitchCase="none">
                <button class="button is-large is-light" [class.is-success]="preset.state" (click)="changePreset(0)">
                    {{preset.title}}
                </button>
            </ng-container>
            <ng-container *ngSwitchCase="select">
                <ul>
                    <li *ngFor="let select of preset.config.select">
                        <button class="button is-large is-light" (click)="changePreset(select.value)">
                            {{select.value}}: {{select.label}}
                        </button>
                    </li>
                </ul>
            </ng-container>
            <ng-container *ngSwitchCase="continuous"></ng-container>
        </ng-container>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetButtonComponent implements OnInit {
    @Input() preset: IControlPresetMsg;

    constructor(private communicationService: CommunicationService) {}

    ngOnInit() {
    }

    changePreset(modifier) {
        this.communicationService.toSledt(Actions.presetChange({
            preset: this.preset.preset,
            modifier,
            state: !this.preset.state,
        }));
    }
}
