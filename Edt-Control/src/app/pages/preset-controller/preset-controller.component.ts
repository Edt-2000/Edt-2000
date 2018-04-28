import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SocketService} from '../../socket.service';

@Component({
    selector: 'app-preset-controller',
    template: `
        <div class="columns" *ngIf="(sock.presetState$ | async) as presets">
            <div class="column" *ngFor="let preset of presets;">
                <app-preset-switcher [preset]="preset"></app-preset-switcher>
            </div>
        </div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetControllerComponent implements OnInit {

    constructor(public sock: SocketService) {
    }

    ngOnInit(): void {

    }
}
