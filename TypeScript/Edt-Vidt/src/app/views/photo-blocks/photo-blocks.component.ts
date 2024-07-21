import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Sizes } from '../../../../../Shared/vidt/sizes';
import { Shapes } from '../../../../../Shared/vidt/shapes';
import { Actions$ } from '../../../../../Shared/actions/actions';

@Component({
  selector: 'edt-photo-blocks',
  templateUrl: './photo-blocks.component.html',
  styleUrl: './photo-blocks.component.scss'
})
export class PhotoBlocksComponent implements OnInit, OnDestroy {
    public sizeClass: string = '';
    public shapeClass: string = '';

    public size: Sizes = Sizes.normal;
    public shape: Shapes = Shapes.square;
    public blocks: number[] = Array(50).map((x, i) => i + 1);

    public src: string = '';

    private readonly destroyed = new Subject();

    public ngOnInit() {
        Actions$.shape
            .pipe(takeUntil(this.destroyed))
            .subscribe((shape: Shapes) => {
                this.shape = shape;
                this.shapeClass = 'photo-blocks--' + this.shape;
            })

        Actions$.size
            .pipe(takeUntil(this.destroyed))
            .subscribe((size: Sizes) => {
                this.size = size;
                this.sizeClass = 'photo-blocks--' + this.size;
                const amount = this.size === 'small' ? 75 : 50;
                this.blocks = Array(amount).map((x, i) => i + 1);
            })

        Actions$.imageSrc
            .pipe(takeUntil(this.destroyed))
            .subscribe(photo => {
                this.setSrc(photo);
            });
    }

    public setSrc(src: string) {
        this.src = `./assets/media-by-group/${ src }`;
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
