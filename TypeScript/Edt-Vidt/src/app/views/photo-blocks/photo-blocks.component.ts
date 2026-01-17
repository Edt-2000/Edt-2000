import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Sizes } from '../../../../../Shared/vidt/sizes';
import { Shapes } from '../../../../../Shared/vidt/shapes';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
    selector: 'edt-photo-blocks',
    templateUrl: './photo-blocks.component.html',
    styleUrl: './photo-blocks.component.scss',
})
export class PhotoBlocksComponent implements OnInit, OnDestroy {
    public sizeClass: string = '';
    public shapeClass: string = '';

    public size: string = Sizes[Sizes.normal];
    public shape: string = Sizes[Shapes.square];
    public blocks: number[] = Array(50).map((x, i) => i + 1);

    public src: string = '';

    private readonly destroyed = new Subject();

    public ngOnInit() {
        Actions$.shape.pipe(takeUntil(this.destroyed)).subscribe((shape: Shapes) => {
            this.shape = Shapes[shape];
            this.shapeClass = 'photo-blocks--' + this.shape;
        });

        Actions$.size.pipe(takeUntil(this.destroyed)).subscribe((size: Sizes) => {
            this.size = Sizes[size];
            this.sizeClass = 'photo-blocks--' + this.size;
            const amount = this.size === Sizes[Sizes.small] ? 75 : 50;
            this.blocks = createFilledArray(amount);
        });

        Actions$.imageSrc.pipe(takeUntil(this.destroyed)).subscribe((photo) => {
            this.setSrc(photo);
        });
    }

    public setSrc(src: string) {
        this.src = `./assets/media-by-group/${src}`;
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
