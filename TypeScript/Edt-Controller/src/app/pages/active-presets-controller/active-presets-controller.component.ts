import {
    ChangeDetectionStrategy,
    Component,
    Renderer2,
    ViewEncapsulation,
} from '@angular/core';
import { mermaidOutput$ } from './mermaid';
import { map, Observable, startWith, switchMap, tap, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { mapInput } from '../../../../../Shared/utils/map-input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { enumToArray } from '../../../../../Shared/utils/utils';
import { DrumSounds } from '../../../../../Shared/midi/types';

declare const mermaid: any;

@Component({
    selector: 'app-active-presets-controller',
    template: ` <div [innerHTML]="mermaid$ | async"></div> `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe],
    encapsulation: ViewEncapsulation.None,
    styles: [
        `
            .node__MAINBEAT > rect {
                fill: var(--node__MAINBEAT) !important;
            }

            .node__SINGLECOLOR > rect {
                fill: var(--node__SINGLECOLOR) !important;
            }
        `,
    ],
})
export class ActivePresetsControllerComponent {
    mermaid$ = mermaidOutput$.pipe(
        switchMap(async (graph) => {
            try {
                const { svg } = await mermaid.render('state', graph);

                return this.sanitizer.bypassSecurityTrustHtml(svg);
            } catch (e) {
                console.error(e);
                return '';
            }
        }),
    );

    constructor(
        private sanitizer: DomSanitizer,
        private renderer: Renderer2,
    ) {
        Actions$.mainBeat
            .pipe(
                timeredToZero,
                map((velocity) => {
                    const brightness = mapInput(velocity, 0, 127, 0, 255);
                    return ColorHelper.getRGBString([
                        { h: 255, b: brightness, s: 255 },
                    ]);
                }),
                tap((color) => {
                    document.documentElement.style.setProperty(
                        '--node__MAINBEAT',
                        color,
                    );
                }),
                takeUntilDestroyed(),
            )
            .subscribe();

        Actions$.singleColor
            .pipe(
                map((color) => ColorHelper.getRGBString([color])),
                tap((color) => {
                    document.documentElement.style.setProperty(
                        '--node__SINGLECOLOR',
                        color,
                    );
                }),
                takeUntilDestroyed(),
            )
            .subscribe();

        Actions$.mainDrumSound
            .pipe(
                map(({ sound, velocity }) => {
                    const brightness = mapInput(velocity, 0, 127, 0, 255);
                    const color = ColorHelper.getRGBString([
                        { h: 255, b: brightness, s: 255 },
                    ]);
                    document.documentElement.style.setProperty(
                        `--node__${sound.toUpperCase()}`,
                        color,
                    );
                    setTimeout(() => {
                        document.documentElement.style.setProperty(
                            `--node__${sound.toUpperCase()}`,
                            'black',
                        );
                    }, 50);
                }),
                takeUntilDestroyed(),
            )
            .subscribe();
    }

    ngAfterViewInit() {
        mermaid.initialize({
            securityLevel: 'loose',
            startOnLoad: false,
            theme: 'dark',
        });
    }

    ngOnInit() {
        const style = this.renderer.createElement('style');

        style.textContent = enumToArray(DrumSounds)
            .map((sound) => {
                return `.node__${sound.toUpperCase()} > rect {
        fill: var(--node__${sound.toUpperCase()}) !important;
      }`;
            })
            .join('\n');

        this.renderer.appendChild(document.head, style);
    }
}

function timeredToZero<T>(
    endValue: Observable<T>,
    time: number = 50,
): Observable<number | T> {
    return endValue.pipe(
        switchMap((endValue) =>
            timer(time).pipe(
                map(() => 0),
                startWith(endValue),
            ),
        ),
    );
}
