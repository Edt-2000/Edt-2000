import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IControlPresetMsg} from '../../../../../Shared/types';
import {SocketService} from '../../socket.service';
import {Actions} from '../../../../../Shared/actions';
import {Note} from '../../../../../Shared/midi';

@Component({
    selector: 'app-preset-switcher',
    templateUrl: './preset-switcher.component.html',
    styleUrls: ['./preset-switcher.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetSwitcherComponent implements OnInit {
    @Input() preset: IControlPresetMsg;
    noteName: string;

    constructor(private socket: SocketService) {
    }

    ngOnInit() {
        this.noteName = Note[this.preset.preset].replace('_', '-').replace('$', '#');
    }

    changePreset(modifier = 127, state) {
        this.socket.toSledt(Actions.presetChange({
            preset: this.preset.preset,
            state,
            modifier,
        }));
    }
}
