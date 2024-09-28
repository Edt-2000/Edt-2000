import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { stevenCode } from './stevencode';

@Component({
    selector: 'edt-hacking',
    templateUrl: './hacking.component.html',
    styleUrl: './hacking.component.scss',
    // We need this for the created HTML elements to work
    // TODO: we need a more angular-ly solution for this...
    encapsulation: ViewEncapsulation.None,
})
export class HackingComponent implements AfterViewInit, OnDestroy {
    public interval: number | undefined;

    @ViewChild('text') textRef?: ElementRef<HTMLPreElement>;

    public ngAfterViewInit() {
        const textArray: string[] = stevenCode.split('');
        let count: number = 0;

        this.interval = window.setInterval(() => {
            if (textArray[count] === '\n') {
                this.textRef?.nativeElement.appendChild(document.createElement('br'));
            } else {
                const element: HTMLElement = document.createElement('span');
                element.classList.add('hacking__character');
                element.innerHTML = textArray[count];
                this.textRef?.nativeElement.appendChild(element);
            }

            count++;

            if (count === textArray.length) {
                count = 0;
            }
        }, 30);
    }

    public ngOnDestroy() {
        clearInterval(this.interval);
    }
}
