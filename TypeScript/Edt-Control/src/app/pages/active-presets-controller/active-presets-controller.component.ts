import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { mermaidOutput$ } from './mermaid';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

declare const mermaid: any;

@Component({
    selector: 'app-active-presets-controller',
    template: `
        <div #mermaid></div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivePresetsControllerComponent implements OnInit {
    destroy$ = new Subject<boolean>();
    mermaid$ = mermaidOutput$.pipe(
        switchMap(graph => {
            console.log('Rendering:\n\n', graph);
            return mermaid.render('graphDiv', graph, this.mermaidDiv.nativeElement);
        }),
        tap<{ svg: string }>(graph => this.mermaidDiv.nativeElement.innerHTML = graph.svg),
    );

    @ViewChild('mermaid', { static: true }) mermaidDiv: ElementRef;

    ngOnInit(): void {
        mermaid.initialize({
            securityLevel: 'loose',
            startOnLoad: false,
            theme: 'dark',
        });
        this.mermaid$.pipe(takeUntil(this.destroy$)).subscribe();
    }
}

