import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {CommunicationService} from "../../communication.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-glitch-text-component',
    templateUrl: 'glitch-text.component.html',
    styleUrls: ['glitch-text.component.scss']
})
export class GlitchTextComponent implements OnInit, OnDestroy {
    @Input() glitchText: string;
    public glitchClass = "glitch--idle";
    private _track$: Subscription;

    constructor(private communicationService: CommunicationService) {

    }

    ngOnInit() {
        this._track$ = this.communicationService.track.subscribe((track) => {
            const level = Math.round(this.map(track.right.z, 0, 127, 1, 5));
            this.glitchClass = `glitch--level${level}`;
        });
    }

    ngOnDestroy() {
        if (typeof this._track$ !== 'undefined') {
            this._track$.unsubscribe();
        }
    }

    map(input: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) {
        const deltaInput = inputMax - inputMin;
        const deltaOutput = outputMax - outputMin;

        return ((((input - inputMin) / deltaInput) * deltaOutput) + outputMin);
    }

}