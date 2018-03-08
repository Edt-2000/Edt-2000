import {Component, ElementRef, OnInit} from '@angular/core';
import {IPhotoAsset, photoAssets} from '../../../data/assets';
import {Subscription} from 'rxjs/Subscription';
import {CommunicationService} from '../../communication.service';

@Component({
  selector: 'app-photo-bounce',
  templateUrl: './photo-bounce.component.html',
  styleUrls: ['./photo-bounce.component.scss']
})
export class PhotoBounceComponent implements OnInit {

    public photo: IPhotoAsset;
    public bounce: boolean;
    private _track$: Subscription;

    constructor(private communicationService: CommunicationService) {
    }

    ngOnInit() {
        this.switchPhoto(1);

        this._track$ = this.communicationService.intensity
            .subscribe(() => {
                this.bounce = false;
                this.bounce = true;
                //
                // // todo replace by animation frame js native
                // setTimeout(() => {
                //     this.bounce = false;
                // }, 100);
            })
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
