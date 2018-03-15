import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-screensavebouncer',
    templateUrl: './screensavebouncer.component.html',
    styleUrls: ['./screensavebouncer.component.scss']
})
export class ScreensavebouncerComponent implements AfterViewInit {
    @ViewChild('item') item: any;
    public y = 0;
    public x = 0;
    public minX = 0;
    public minY = 0;
    public maxX: number;
    public maxY: number;
    public directionX = 1;
    public directionY = 1;
    public speed = 6;

    constructor() {
    }

    // ngOnInit(){}

    ngAfterViewInit() {
        this.maxX = window.innerWidth - this.item.nativeElement.clientWidth;
        this.maxY = window.innerHeight - this.item.nativeElement.clientHeight;
        requestAnimationFrame(() => {
            this.bounce();
        });
    }

    bounce() {
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

        this.item.nativeElement.style.transform = `translate(${this.x}px,${this.y}px)`;

        requestAnimationFrame(() => {
            this.bounce();
        });
    }

}