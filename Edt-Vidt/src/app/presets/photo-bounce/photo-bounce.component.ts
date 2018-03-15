import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IPhotoAsset, photoAssets} from '../../../data/assets';
import {Subscription} from 'rxjs/Subscription';
import {CommunicationService} from '../../communication.service';

@Component({
    selector: 'app-photo-bounce',
    templateUrl: './photo-bounce.component.html',
    styleUrls: ['./photo-bounce.component.scss']
})
export class PhotoBounceComponent implements OnInit {

    @ViewChild('img') img: any;

    public photo: IPhotoAsset;
    private _track$: Subscription;
    public animation;

    constructor(private communicationService: CommunicationService) {
    }

    ngOnInit() {
        this.switchPhoto(8   );

        this.animation = this.img.nativeElement.animate(
            [
                {
                    transform: 'scale(1)'
                },
                {
                    transform: 'scale(1.5)'
                },
                {
                    transform: 'scale(1)'
                }
            ], {
                easing: 'linear',
                duration: 200
            }
        );

        this._track$ = this.communicationService.intensity
            .subscribe(() => {
                this.animate();
            });

        document.onkeypress = () => {
            this.animate();
        }
    }

    animate() {
        requestAnimationFrame(() => {
            if (this.animation.playState === 'running') {
                this.animation.cancel();
            }

            requestAnimationFrame(() => {
                this.animation.play();
            });
        });
    }

    switchPhoto(photoIndex: number) {
        const photo = photoAssets[photoIndex];
        if (!photo) {
            this.photo = photoAssets[0];
        } else {
            this.photo = photo;
        }
    }
}
