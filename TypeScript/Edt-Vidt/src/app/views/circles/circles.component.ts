import { Component, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { createFilledArray } from '../../../../../Shared/utils/utils';
import { AnimationTypes } from '../../../../../Shared/vidt/animation';

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
    public pools = createFilledArray(6);

    public baseTime$: Observable<number> = Actions$.glitchIntensity.pipe(
        map((intensity) => {
            return Math.max(8.5 - intensity, 1);
        }),
        startWith(4),
    );

    public subCircles$: Observable<Circle[]> = Actions$.vidtMultiColor.pipe(
        map((colors) => {
            if (!colors || colors.length === 0) {
                return [
                    { rgb: [255, 23, 154] },
                    { rgb: [255, 71, 0] },
                    { rgb: [255, 255, 5] },
                    { rgb: [5, 243, 254] },
                    { rgb: [53, 3, 168] },
                ];
            }

            const amount = 5;
            const circles: Circle[] = [];

            for (let i = 0; i <= amount; i++) {
                const colorIndex = i % colors.length;
                circles.push({
                    rgb: ColorHelper.hsv2rgb(colors[colorIndex]),
                });
            }

            return circles;
        }),
        startWith([
            { rgb: [255, 23, 154] },
            { rgb: [255, 71, 0] },
            { rgb: [255, 255, 5] },
            { rgb: [5, 243, 254] },
            { rgb: [53, 3, 168] },
        ]),
    );

    public animationType$: Observable<string> = Actions$.animationType.pipe(
        map((type) => {
            if (type === AnimationTypes.alternate) {
                return 'alternate';
            } else {
                return 'default';
            }
        }),
        startWith('default'),
    );

    public getDelay(poolIndex: number, circleIndex: number, type: string | null): string {
        if (type === 'alternate') {
            return (poolIndex / 2) * -1 + circleIndex / 1.2 + 's';
        } else {
            return circleIndex / 1.2 + 's';
        }
    }
}
