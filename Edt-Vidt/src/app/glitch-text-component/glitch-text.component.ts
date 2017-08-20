import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-glitch-text-component',
    templateUrl: 'glitch-text.component.html',
    styleUrls: ['glitch-text.component.scss']
})

export class GlitchTextComponent implements OnInit {

    @Input() glitchText: string;

    constructor() { }

    ngOnInit() {
    }

}
