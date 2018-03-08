import {Component, ElementRef, OnInit} from '@angular/core';
import {IPhotoAsset, photoAssets} from '../../../data/assets';

@Component({
  selector: 'app-photo-bounce',
  templateUrl: './photo-bounce.component.html',
  styleUrls: ['./photo-bounce.component.scss']
})
export class PhotoBounceComponent implements OnInit {

    public photo: IPhotoAsset;

    constructor(private element: ElementRef) {
    }

    ngOnInit() {
        this.switchPhoto(1);
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
