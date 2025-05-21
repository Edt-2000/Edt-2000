import { Component, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { createFilledArray } from '../../../../../Shared/utils/utils';

interface Circle {
    rgb: number[];
}

@Component({
    selector: 'edt-circles',
    templateUrl: './circles.component.html',
    styleUrl: './circles.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class CirclesComponent {
    public circles = createFilledArray(5);

    public baseTime$: Observable<number> =
        Actions$.glitchIntensity.pipe(
            map((intensity) => {
                return 3;
                // return Math.max((9.5 - intensity), 1.5);
            }),
            startWith(4),
        )

    public subCircles$: Observable<Circle[]> =
        Actions$.vidtMultiColor.pipe(
            map((colors) => {
                return [
                    { rgb: [255,23,154] },
                    { rgb: [255,71,0] },
                    { rgb: [255,255,5] },
                    { rgb: [5,243,254] },
                    { rgb: [53,3,168] },
                ]

                if (!colors || colors.length === 0) {
                    return [
                        { rgb: [255,23,154] },
                        { rgb: [255,71,0] },
                        { rgb: [255,255,5] },
                        { rgb: [5,243,254] },
                        { rgb: [53,3,168] },
                    ]
                }

                const amount = 5;
                const circles: Circle[] = [];

                for (let i = 0; i <= 4; i++) {
                    const colorIndex = i % colors.length;
                    circles.push({
                        rgb: ColorHelper.hsv2rgb(colors[colorIndex]),
                    });
                }

                return circles;

                // TODO
                // Colors
                // Glitch intensity: faster of meer overlap / groter ala desktop?
            }),
            startWith([
                { rgb: [255,23,154] },
                { rgb: [255,71,0] },
                { rgb: [255,255,5] },
                { rgb: [5,243,254] },
                { rgb: [53,3,168] },
            ]),
        )
}
