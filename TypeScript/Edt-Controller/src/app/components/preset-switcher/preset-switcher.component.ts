import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { SocketService } from '../../socket.service';
import { Note } from '../../../../../Shared/midi/midi';
import { IControlPresetMsg } from '../../../../../Shared/actions/types';

@Component({
    selector: 'app-preset-switcher',
    template: `
        <div class="preset-switcher">
            <button
                class="text-button text-button--white-outline preset-switcher__main"
                (click)="
                    socket.changePreset(
                        preset.preset,
                        !preset.state,
                        preset.modifier
                    )
                "
                [class.is-active]="preset.state"
            >
                <span
                    >{{ noteName }}: {{ preset.title }} ({{
                        preset.modifier
                    }})</span
                >
            </button>
            <ul class="list">
                @if (preset.config.select) {
                    @for (select of preset.config.select; track $index) {
                        <li class="list__item">
                            <button
                                class="text-button button--white preset-switcher__sub"
                                [class.is-selected]="
                                    select.value === preset.modifier
                                "
                                [class.is-active]="
                                    preset.state &&
                                    select.value === preset.modifier
                                "
                                (click)="
                                    socket.changePreset(
                                        preset.preset,
                                        true,
                                        select.value
                                    )
                                "
                            >
                                <span
                                    >{{ select.label }} ({{
                                        select.value
                                    }})</span
                                >
                            </button>
                        </li>
                    }
                }
            </ul>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [],
})
export class PresetSwitcherComponent implements OnInit {
    @Input({ required: true }) preset!: IControlPresetMsg;
    noteName!: string;

    constructor(public socket: SocketService) {}

    ngOnInit() {
        this.noteName = Note[this.preset.preset]
            .replace('_', '-')
            .replace('$', '#');
    }
}
