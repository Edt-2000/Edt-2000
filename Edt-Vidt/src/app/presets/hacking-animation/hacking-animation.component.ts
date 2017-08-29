import {Component, OnInit, ElementRef} from '@angular/core';

@Component({
    selector: 'app-hacking-animation',
    templateUrl: './hacking-animation.component.html',
    styleUrls: ['./hacking-animation.component.scss']
})
export class HackingAnimationComponent implements OnInit {

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        const response = fetch(new Request("./assets/data/stevencode.txt"));

        response.then((value) => {
            value.text().then((textString) => {
                const textArray: string[] = textString.split('');
                const textElem: Element = this.element.nativeElement.getElementsByClassName('hacking-animation__text')[0];
                const characterElem = this.element.nativeElement.getElementsByClassName('hacking-animation__character')[0];
                let count: number = 0;

                setInterval(() => {
                    if (textArray[count] === "\n") {
                        textElem.appendChild(document.createElement("br"));
                    }
                    else {
                        let element = characterElem.cloneNode();
                        element.innerText = textArray[count];

                        textElem.appendChild(element);
                    }

                    count++;

                    if (count === textArray.length) {
                        count = 0;
                    }

                }, 30);
            });
        });
    }
}
