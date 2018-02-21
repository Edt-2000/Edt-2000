import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommunicationService } from '../../communication.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-logo-idle-component',
    templateUrl: 'logo-idle.component.html',
    styleUrls: ['logo-idle.component.scss']
})

export class LogoIdleComponent implements OnInit, OnDestroy {

    public stars = Array(64).map((x, i) => i + 1);
    public glitchClass = "glitch--idle";
    private _track$: Subscription;


    constructor(private communicationService: CommunicationService) {
    }

    ngOnInit() {
        this._track$ = this.communicationService.intensity.subscribe(({intensity}) => {
            const level = Math.round(this.mapInput(intensity, 0, 127, 1, 5));
            console.log(intensity);
            this.glitchClass = `glitch--level${level}`;
        });
    }

    ngOnDestroy() {
        if (typeof this._track$ !== 'undefined') {
            this._track$.unsubscribe();
        }
    }

    mapInput(input: number, inputMin: number, inputMax: number, outputMin: number, outputMax: number) {
        const deltaInput = inputMax - inputMin;
        const deltaOutput = outputMax - outputMin;

        return ((((input - inputMin) / deltaInput) * deltaOutput) + outputMin);
    }
}
