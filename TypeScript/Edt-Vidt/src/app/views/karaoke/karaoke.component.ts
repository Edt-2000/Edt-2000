import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IColor } from '../../../../../Shared/colors/types';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { Actions$ } from '../../../../../Shared/actions/actions';

@Component({
    selector: 'edt-karaoke',
    templateUrl: './karaoke.component.html',
    styleUrl: './karaoke.component.scss',
})
export class KaraokeComponent implements OnInit, OnDestroy {
    public cssClass: string = '';
    public styles: Object = {};
    public text: string = 'bounce';
    @ViewChild('text') textRef?: ElementRef<HTMLPreElement>;
    private readonly destroyed = new Subject();

    public ngOnInit() {
        Actions$.mainText.pipe(takeUntil(this.destroyed)).subscribe((text) => {
            this.setText(text);
        });

        Actions$.vidtSingleColor.pipe(takeUntil(this.destroyed)).subscribe((color: IColor) => {
            this.setStyles([color]);
        });
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }

    public setText(text: string) {
        // if same bounce
        if (this.text === text) {
            this.text = text;
            // wait for text to be in dom
            requestAnimationFrame(() => {
                this.cssClass = 'is-hidden';

                window.setTimeout(() => {
                    this.cssClass = '';
                }, 150);
            });
        } else {
            this.text = text;
        }
    }

    public setStyles(colors: IColor[]) {
        const bcgColor = ColorHelper.getRGBString(colors);

        this.styles = {
            color: `${bcgColor}`,
        };
    }
}
