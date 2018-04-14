import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';
import {Note} from '../../../../../Shared/midi';

@Component({
    selector: 'app-color-controller',
    template: ``,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorControllerComponent implements OnInit {

    constructor(public communicationService: CommunicationService) {

    }

    ngOnInit(): void {
    }

    send(preset: Note, state: boolean) {

    }
}
