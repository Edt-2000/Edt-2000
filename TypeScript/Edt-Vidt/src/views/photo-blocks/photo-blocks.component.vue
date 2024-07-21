<template>
    <div class="photo-blocks" v-bind:class="[sizeClass, shapeClass]">
        <ul class="photo-blocks__list">
            <li class="photo-blocks__item" v-for="block in blocks">
                <div class="photo-blocks__block">
                    <img class="photo-blocks__front" v-bind:src="src">
                    <img class="photo-blocks__back" v-bind:src="src">
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import './photo-blocks.scss';
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { Actions$ } from '../../../../Shared/actions/actions';
import { Sizes } from '../../../../Shared/vidt/sizes';
import { Shapes } from '../../../../Shared/vidt/shapes';
import { Subject } from 'rxjs';

@Component
export default class PhotoBlocksComponent extends Vue {
    public sizeClass: string = '';
    public shapeClass: string = '';

    public size: Sizes = Sizes.normal;
    public shape: Shapes = Shapes.square;
    public blocks: number[] = Array(50).map((x, i) => i + 1);

    public src: string = '';

    private onDestroyed: Subject<any> = new Subject();

    @Watch('size', { immediate: true })
    public setCssSizeClass() {
        this.sizeClass = 'photo-blocks--' + this.size;
        const amount = this.size === 'small' ? 75 : 50;
        this.blocks = Array(amount).map((x, i) => i + 1);
    }

    @Watch('shape', { immediate: true })
    public setCssTypeClass() {
        this.shapeClass = 'photo-blocks--' + this.shape;
    }

    mounted() {
        Actions$.shape
            .pipe(takeUntil(this.onDestroyed))
            .subscribe((shape: Shapes) => {
                this.shape = shape;
            })

        Actions$.size
            .pipe(takeUntil(this.onDestroyed))
            .subscribe((size: Sizes) => {
                this.size = size;
            })

        Actions$.imageSrc
            .pipe(takeUntil(this.onDestroyed))
            .subscribe(photo => {
                this.setSrc(photo);
            });
    }

    setSrc(src: string) {
        this.src = `./assets/media-by-group/${ src }`;
    }

    destroyed() {
        this.onDestroyed.next();
        this.onDestroyed.complete();
    }
}
</script>
