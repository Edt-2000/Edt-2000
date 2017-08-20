import {Component, Input, OnInit, OnDestroy} from '@angular/core';

export enum glitchModifiers {
    idle = 'glitch--idle',
    level1 = 'glitch--level1',
    level2 = 'glitch--level2',
    level3 = 'glitch--level3',
    level4 = 'glitch--level4'
}

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
