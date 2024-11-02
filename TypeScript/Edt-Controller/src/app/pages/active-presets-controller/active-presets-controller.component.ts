import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { mermaidOutput$ } from './mermaid';
import { map, merge, Observable, startWith, switchMap, tap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { mapInput } from '../../../../../Shared/utils/map-input';

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
    takeUntilDestroyed(),
  );

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    mermaid.initialize({
      securityLevel: 'loose',
      startOnLoad: false,
      theme: 'dark',
    });
  }

  ngOnInit() {
    Actions$.mainBeat
      .pipe(
        timeredMainBeat,
        map((velocity) => {
          const brightness = mapInput(velocity, 0, 127, 0, 255);
          return ColorHelper.getRGBString([{ h: 255, b: brightness, s: 255 }]);
        }),
        tap((color) => {
          document.documentElement.style.setProperty('--node__MAINBEAT', color);
        }),
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
      )
      .subscribe();
  }
}

function timeredMainBeat<T>(velocity$: Observable<T>): Observable<number | T> {
  return velocity$.pipe(
    switchMap((velocity) =>
      timer(50).pipe(
        map(() => 0),
        startWith(velocity),
      ),
    ),
  );
}
