import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';

@Component({
  selector: 'edt-text-bouncer',
  templateUrl: './text-bouncer.component.html',
  styleUrl: './text-bouncer.component.scss'
})
export class TextBouncerComponent implements OnInit, OnDestroy {
    public styles: Object = {};
    public text: string = 'bounce';

    public y: number = 0;
    public x: number = 0;
    public minX: number = 0;
    public minY: number = 0;
    public maxX: number = 0;
    public maxY: number = 0;
    public directionX: number = 1;
    public directionY: number = 1;
    public speed: number = 6;

    @ViewChild('textElem') textRef?: ElementRef<HTMLElement>;

    private readonly destroyed = new Subject();

    public ngOnInit() {
        Actions$.mainText
            .pipe(takeUntil(this.destroyed))
            .subscribe(text => {
                this.text = text;
                // wait for text to be in dom
                requestAnimationFrame(() => {
                    this.calculateBoundaries();
                });
            });

        this.calculateBoundaries();

        requestAnimationFrame(() => {
            this.bounce();
        });
    }

    public calculateBoundaries() {
        this.maxX = window.innerWidth - (this.textRef?.nativeElement.clientWidth ?? 0);
        this.maxY = window.innerHeight - (this.textRef?.nativeElement.clientHeight ?? 0);
    }

    public bounce() {
        if (this.x + 1 > this.maxX && this.directionX === 1) {
            this.directionX = -1;
        } else if (this.x - 1 < this.minX && this.directionX === -1) {
            this.directionX = 1;
        }

        if (this.y + 1 > this.maxY && this.directionY === 1) {
            this.directionY = -1;
        } else if (this.y - 1 < this.minY && this.directionY === -1) {
            this.directionY = 1;
        }

        this.x = this.x + this.directionX * this.speed;
        this.y = this.y + this.directionY * this.speed;

        this.styles = {
            transform: `translate(${this.x}px,${this.y}px)`,
        };

        requestAnimationFrame(() => {
            this.bounce();
        });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
