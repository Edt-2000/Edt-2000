import {Component, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-screensavebouncer',
    templateUrl: './screensavebouncer.component.html',
    styleUrls: ['./screensavebouncer.component.scss']
})
export class ScreensavebouncerComponent implements OnInit {
    @ViewChild('item') item: any;
    public y = 0;
    public x = 0;
    public minX = 0;
    public minY = 0;
    public maxX: number;
    public maxY: number;
    public directionX = 1;
    public directionY = 1;
    public speed = 4;

    constructor() {
    }

    ngOnInit() {
        this.maxX = window.innerWidth - this.item.nativeElement.offsetWidth;
        this.maxY = window.innerHeight - this.item.nativeElement.offsetHeight;
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

        this.x = this.x + this.directionX * this.speed;
        console.log(this.maxX, this.maxY);
        this.item.nativeElement.style.transform = `translate(${this.x}px,${this.y}px)`;

        requestAnimationFrame(() => {
            this.bounce();
        });
    }

}

// Animate.
function animate(highResTimestamp) {
    requestAnimationFrame(animate);
    // Animate something...
}

// Start the animation.
requestAnimationFrame(animate);
