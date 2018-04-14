import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IControlPresetMsg} from '../../../../../Shared/types';
import {CommunicationService} from '../../communication.service';
import {Actions} from '../../../../../Shared/actions';

@Component({
    selector: 'app-preset-button',
    template: `
        <button class="button is-large is-light" [class.is-success]="preset.state" (click)="changePreset()">
            {{preset.title}}
        </button>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetButtonComponent implements OnInit {
    @Input() preset: IControlPresetMsg;

    constructor(private communicationService: CommunicationService) {}

    ngOnInit() {
    }

    changePreset() {
        this.communicationService.toSledt(Actions.presetChange({
            preset: this.preset.preset,
            modifier: 0,
            state: !this.preset.state,
        }));
    }
}
