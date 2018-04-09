import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';
import {Note} from '../../../../../Shared/midi';
import {Actions} from '../../../../../Shared/actions';

@Component({
    selector: 'app-color-controller',
    template: `
        <p>
            <button (click)="send('C0', true)">D0</button>
            <button (click)="send('C0', false)">D0</button>
        </p>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorControllerComponent implements OnInit {

    constructor(public communicationService: CommunicationService) {

    }

    ngOnInit(): void {
    }

    send(preset: Note, state: boolean) {
        this.communicationService.toSledt(Actions.presetOn({
                preset: Note[Note[preset]],
                modifier: 0,
                state,
            })
        );
    }
}
