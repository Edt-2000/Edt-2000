import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';

@Component({
    selector: 'app-color-controller',
    template: `
        <p>
            color-controller works!
        </p>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorControllerComponent implements OnInit {

    constructor(private communicationService: CommunicationService) {

    }

    ngOnInit(): void {
    }
}
