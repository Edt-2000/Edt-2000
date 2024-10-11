import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { mermaidOutput$ } from './mermaid';
import { map, Observable, startWith, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ColorHelper } from '../../../../../Shared/colors/converters';

declare const mermaid: any;

@Component({
  selector: 'app-active-presets-controller',
  template: `
    <div
      [class.mainBeat--active]="timeredMainBeat$ | async"
      [innerHTML]="mermaid$ | async"
    ></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe],
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .mainBeat--active .node__BEAT > rect {
        fill: red !important;
      }

      .node__COLOR > rect {
        fill: var(--singleColor) !important;
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

  // Mermaid visuals -------
  timeredMainBeat$ = Actions$.mainBeat.pipe(applyTimeredMainBeat);

  constructor(private sanitizer: DomSanitizer) {}

  ngAfterViewInit() {
    mermaid.initialize({
      securityLevel: 'loose',
      startOnLoad: false,
      theme: 'dark',
    });

    Actions$.singleColor
      .pipe(map((color) => ColorHelper.getRGBString([color])))
      .subscribe((color) => {
        document.documentElement.style.setProperty('--singleColor', color);
      });
  }
}

// Define a pipe function that handles the transformation
function applyTimeredMainBeat<T>(
  velocity$: Observable<T>,
): Observable<number | T> {
  return velocity$.pipe(
    switchMap((velocity) =>
      timer(50).pipe(
        map(() => 0),
        startWith(velocity),
      ),
    ),
  );
}
