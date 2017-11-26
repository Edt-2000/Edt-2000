import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-logo-idle-component',
    templateUrl: 'logo-idle.component.html',
    styleUrls: ['logo-idle.component.scss']
})

export class LogoIdleComponent implements OnInit, OnDestroy {

    public stars = Array(64).map((x,i) => i + 1);

    constructor() {}

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
