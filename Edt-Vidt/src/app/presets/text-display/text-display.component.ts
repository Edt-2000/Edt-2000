import {Component, Inject, OnInit} from '@angular/core';
import {CommunicationService} from 'app/communication.service';
import {ICenteredText} from '../../../../../Shared/socket';

@Component({
    selector: 'app-centered-text-display',
    template: `
        {{text}}
    `,
    styles: [`
        :host {
            position: fixed;
            display: flex;
            height: 100%;
            top: 0;
            left: 0;
            align-items: center;
            justify-content: center;
            font-size: 30vh;
        }
    `]
})
export class TextDisplayComponent implements OnInit {
    text: string;

    constructor(@Inject(CommunicationService) private _communicationService: CommunicationService) {
    }

    ngOnInit() {
        this._communicationService.color.subscribe((msg: ICenteredText) => {
            this.text = msg.textValue;
        });
    }

}
