import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IControlPresetMsg} from '../../../../../Shared/types';
import {CommunicationService} from '../../communication.service';
import {Actions} from '../../../../../Shared/actions';

@Component({
    selector: 'app-preset-button',
    template: `
        <nav class="panel">
            <p
                class="panel-heading"
                (click)="changePreset(preset.modifier, !preset.state)"
                [class.has-text-success]="preset.state">
                {{preset.title}}
            </p>
            <ng-container [ngSwitch]="preset.config.type">
                <ng-container *ngSwitchCase="'select'">
                    <div class="panel-block">
                        <div class="buttons has-addons">
                            <button
                                *ngFor="let select of preset.config.select"
                                class="button"
                                [class.is-active]="select.value === preset.modifier"
                                [class.is-success]="preset.state && select.value === preset.modifier"
                                (click)="changePreset(select.value, true)">
                                {{select.value}}: {{select.label}}
                            </button>
                        </div>
                    </div>
                </ng-container>
                <ng-container *ngSwitchCase="'continuous'"></ng-container>
            </ng-container>
        </nav>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetButtonComponent implements OnInit {
    @Input() preset: IControlPresetMsg;

    constructor(private communicationService: CommunicationService) {
    }

    ngOnInit() {
    }

    changePreset(modifier = 127, state) {
        this.communicationService.toSledt(Actions.presetChange({
            preset: this.preset.preset,
            state,
            modifier,
        }));
    }
}
