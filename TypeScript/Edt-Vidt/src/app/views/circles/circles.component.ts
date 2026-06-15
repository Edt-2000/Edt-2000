import { Component, ViewEncapsulation } from '@angular/core';
import { map, Observable, startWith } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { createFilledArray } from '../../../../../Shared/utils/utils';
import { AnimationTypes } from '../../../../../Shared/vidt/animation';

interface Circle {
    hwb: string;
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
                    { hwb: '326 9% 0%' },
                    { hwb: '17 0% 0%' },
                    { hwb: '60 2% 0%' },
                    { hwb: '183 2% 0%' },
                    { hwb: '258 1% 34%' },
                ];
            }

            const amount = 5;
            const circles: Circle[] = [];

            for (let i = 0; i <= amount; i++) {
                const colorIndex = i % colors.length;
                circles.push({
                    hwb: ColorHelper.hsv2hwb(colors[colorIndex]),
                });
            }

            return circles;
        }),
        startWith([
            { hwb: '326 9% 0%' },
            { hwb: '17 0% 0%' },
            { hwb: '60 2% 0%' },
            { hwb: '183 2% 0%' },
            { hwb: '258 1% 34%' },
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
