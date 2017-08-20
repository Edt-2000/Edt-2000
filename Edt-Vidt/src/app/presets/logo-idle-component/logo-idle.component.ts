import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';
import {glitchModifiers} from '../../components/glitch-text-component/glitch-text.component';

@Component({
    selector: 'app-logo-idle-component',
    templateUrl: 'logo-idle.component.html',
    styleUrls: ['logo-idle.component.scss']
})

export class LogoIdleComponent implements OnInit, OnDestroy {
    glitchState: string;

    private _intensity$;

    constructor(
        @Inject(CommunicationService) private _communicationService: CommunicationService
    ) {}

    ngOnInit() {
        // Idle is default
        this.glitchState = glitchModifiers[0];

        this._intensity$ = this._communicationService.intensity.subscribe((msg) => {
            console.log('Intensity', msg);
            this.glitchState = glitchModifiers[msg.intensity]
        });
    }

    ngOnDestroy() {
        if (typeof this._intensity$ !== 'undefined') {
            this._intensity$.unsubscribe();
        }
    }

}
