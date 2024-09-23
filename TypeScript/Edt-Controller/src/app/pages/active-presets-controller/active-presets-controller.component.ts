import { ChangeDetectionStrategy, Component } from '@angular/core';
import { mermaidOutput$ } from './mermaid';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

declare const mermaid: any;

@Component({
  selector: 'app-active-presets-controller',
  template: ` <div [innerHTML]="mermaid$ | async"></div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe],
})
export class ActivePresetsControllerComponent {
  constructor(private sanitizer: DomSanitizer) {}

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

  ngAfterViewInit() {
    mermaid.initialize({
      securityLevel: 'loose',
      startOnLoad: false,
      theme: 'dark',
    });
  }
}
