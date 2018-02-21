import { Component, Input, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-glitch-text-component',
    templateUrl: 'glitch-text.component.html',
    styleUrls: ['glitch-text.component.scss']
})
export class GlitchTextComponent implements OnInit, OnDestroy {
    @Input() glitchText: string;
    @Input() glitchClass: string;

    constructor() {

    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }
}