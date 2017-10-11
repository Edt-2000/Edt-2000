import {Component, Input, OnInit, OnDestroy, ElementRef} from '@angular/core';
import {CommunicationService} from "../../communication.service";
import {ITrackMsg} from "../../../../../SharedTypes/socket";

@Component({
    selector: 'app-glitch-text-component',
    templateUrl: 'glitch-text.component.html',
    styleUrls: ['glitch-text.component.scss']
})
export class GlitchTextComponent implements OnInit, OnDestroy {
    @Input() glitchText: string;
    @Input() glitchModifier: glitchModifiers;
    private amount = 8;

    constructor(private element: ElementRef, private communicationService: CommunicationService) {

    }

    ngOnInit() {
        this.animateColor();
        this.communicationService.track.subscribe((track) => {
            this.amount = Math.max(8, track.right.z);
            this.animateColor();
        });
    }

    animateColor() {
        const colorElems = this.element.nativeElement.getElementsByClassName('glitch__color');
        for (const colorElem of colorElems) {
            colorElem.animate(
                [
                    {
                        transform: `translate(0)`,
                    },
                    {
                        transform: `translate(-${this.amount}px, ${this.amount}px)`
                    },
                    {
                        transform: `translate(-${this.amount}px, -${this.amount}px)`
                    },
                    {
                        transform: `translate(${this.amount}px, ${this.amount}px)`
                    },
                    {
                        transform: `translate(${this.amount}px, -${this.amount}px)`
                    },
                    {
                        transform: `translate(0)`
                    }
                ], {
                    direction: (colorElem.classList.contains('glitch__color--second')) ? "reverse" : "normal",
                    duration: 300,
                    delay: (colorElem.classList.contains('glitch__color--third')) ? 100 : 0,
                    iterations: Infinity,
                    easing: "cubic-bezier(.25, .46, .45, .94)"
                }
            )
        }

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
