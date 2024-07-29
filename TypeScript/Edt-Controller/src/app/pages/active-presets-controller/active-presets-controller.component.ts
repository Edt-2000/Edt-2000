import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { mermaidOutput$ } from './mermaid';
import { Subject, switchMap, takeUntil } from 'rxjs';

declare const mermaid: any;

@Component({
  selector: 'app-active-presets-controller',
  template: `
    <div #mermaid></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ActivePresetsControllerComponent implements OnInit {
  destroy$ = new Subject<boolean>();
  @ViewChild('mermaid', { static: true }) mermaidDiv: ElementRef | undefined;
  mermaid$ = mermaidOutput$.pipe(
    switchMap(async graph => {
      console.log('Rendering:\n\n', graph);
      if (this.mermaidDiv) {
        await mermaid.render('graphDiv', graph, this.mermaidDiv.nativeElement);
        // @ts-ignore
        this.mermaidDiv.nativeElement.innerHTML = graph.svg;
      } else {
        console.error('Mermaid is not initialized!');
      }
    }),
  );

  ngOnInit(): void {
    mermaid.initialize({
      securityLevel: 'loose',
      startOnLoad: false,
      theme: 'dark',
    });
    this.mermaid$.pipe(takeUntil(this.destroy$)).subscribe();
  }
}

