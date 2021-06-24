<template>
    <div class="page">
        <div class="kaleido" v-bind:style="styles">
            <div class="kaleido__inner">
                <div class="hex hex--1">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1"></div>
                        <div class="hex__sub hex__sub--2"></div>
                        <div class="hex__sub hex__sub--3"></div>
                    </div>
                </div>
                <div class="hex hex--2">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1"></div>
                        <div class="hex__sub hex__sub--2"></div>
                        <div class="hex__sub hex__sub--3"></div>
                    </div>
                </div>
                <div class="hex hex--3">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1"></div>
                        <div class="hex__sub hex__sub--2"></div>
                        <div class="hex__sub hex__sub--3"></div>
                    </div>
                </div>
                <div class="hex hex--4">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1"></div>
                        <div class="hex__sub hex__sub--2"></div>
                        <div class="hex__sub hex__sub--3"></div>
                    </div>
                </div>
                <div class="hex hex--5">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1"></div>
                        <div class="hex__sub hex__sub--2"></div>
                        <div class="hex__sub hex__sub--3"></div>
                    </div>
                </div>
                <div class="hex hex--6">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1"></div>
                        <div class="hex__sub hex__sub--2"></div>
                        <div class="hex__sub hex__sub--3"></div>
                    </div>
                </div>
                <div class="hex hex--7">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1"></div>
                        <div class="hex__sub hex__sub--2"></div>
                        <div class="hex__sub hex__sub--3"></div>
                    </div>
                </div>
                <div class="hex hex--8">
                    <div class="hex__inner">
                        <div class="hex__sub hex__sub--1"></div>
                        <div class="hex__sub hex__sub--2"></div>
                        <div class="hex__sub hex__sub--3"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import './kaleido.scss';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { combineLatest } from 'rxjs';
import { Actions$ } from '../../../../Shared/actions/actions';
import { startWith } from 'rxjs/operators';

@Component
export default class KaleidoComponent extends Vue {
    public subscription: any;
    public styles: Object = {};

    mounted() {
        this.subscription = combineLatest([
            // As MainBeat is 'hot' we need startWith to kick off conmbineLatest
            Actions$.mainBeat.pipe(startWith(0)),
            Actions$.glitchIntensity,
        ]).subscribe(([beat, intensity]) => {
            this.styles = {
                '--animation-time': `${intensity * 4}s`,
            };
        });
    }


}
</script>
