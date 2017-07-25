import {Component, Inject, OnInit} from '@angular/core';
import {CommunicationService} from 'app/communication.service';
import {centeredText} from '../../../../SharedTypes/socket';

@Component({
    selector: 'app-centered-text-display',
    template: `
        {{text}}
    `,
    styles: [`
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30vh;
            height: 100%;
        }
    `]
})
export class TextDisplayComponent implements OnInit {
    text: string;

    constructor(@Inject(CommunicationService) private _communicationService: CommunicationService) {
    }

    ngOnInit() {
        this._communicationService.color.subscribe((msg: centeredText) => {
            this.text = msg.textValue;
        });
    }

}
