import {Component, Inject, OnInit} from '@angular/core';
import {glitchModifiers} from '../../components/glitch-text-component/glitch-text.component';
import {CommunicationService} from '../../communication.service';

@Component({
    selector: 'app-logo-idle-component',
    templateUrl: 'logo-idle.component.html',
    styleUrls: ['logo-idle.component.scss']
})

export class LogoIdleComponent implements OnInit {
    glitchState: glitchModifiers;

    constructor(
        @Inject(CommunicationService) private _communicationService: CommunicationService
    ) {}

    ngOnInit() {

    }

}
