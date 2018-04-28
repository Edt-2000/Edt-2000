import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {IControlPresetMsg} from '../../../../../Shared/types';
import {SocketService} from '../../socket.service';
import {PresetActions} from '../../../../../Shared/actions';

@Component({
    selector: 'app-preset-switcher',
    template: `
        <div class="card">
            <header class="card-header"
                (click)="changePreset(preset.modifier, !preset.state)"
                [class.has-text-success]="preset.state">
                <p class="card-header-title">
                    {{preset.title}} ({{preset.modifier}})
                </p>
                <div class="card-header-icon">
                    <span class="icon">
                        <i class="fa fa-toggle-off"></i>
                    </span>
                </div>
            </header>
            <div class="card-footer">
                <ng-container [ngSwitch]="preset.config.type">
                    <ng-container *ngSwitchCase="'select'">
                        <div *ngFor="let select of preset.config.select"
                            class="card-footer-item"
                            [class.is-active]="select.value === preset.modifier"
                            [class.is-success]="preset.state && select.value === preset.modifier"
                            (click)="changePreset(select.value, true)">
                            {{select.label}}
                        </div>
                    </ng-container>
                    <ng-container *ngSwitchCase="'continuous'">
                        
                    </ng-container>
                </ng-container>
            </div>
        </div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetSwitcherComponent implements OnInit {
    @Input() preset: IControlPresetMsg;

    constructor(private socket: SocketService) {
    }

    ngOnInit() {
    }

    changePreset(modifier = 127, state) {
        this.socket.toSledt(PresetActions.presetChange({
            preset: this.preset.preset,
            state,
            modifier,
        }));
    }
}
