import {Component, Input, OnInit, OnDestroy} from '@angular/core';

@Component({
    selector: 'app-glitch-text-component',
    templateUrl: 'glitch-text.component.html',
    styleUrls: ['glitch-text.component.scss']
})
export class GlitchTextComponent implements OnInit, OnDestroy {
    @Input() glitchText: string;
    @Input() glitchModifier: glitchModifiers;

    constructor(
    ) {}

    ngOnInit() {
    }

    ngOnDestroy() {

    }
}

export enum glitchModifiers {
    'glitch--idle',
    'glitch--level1',
    'glitch--level2',
    'glitch--level3',
    'glitch--level4'
}
