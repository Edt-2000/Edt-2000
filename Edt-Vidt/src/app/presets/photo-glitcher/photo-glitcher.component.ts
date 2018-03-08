import {Component, ElementRef, OnInit} from '@angular/core';
import {IPhotoAsset, photoAssets} from '../../../data/assets';


@Component({
    selector: 'app-photo-glitcher',
    templateUrl: './photo-glitcher.component.html',
    styleUrls: ['./photo-glitcher.component.scss']
})
export class PhotoGlitcherComponent implements OnInit {

    public photo: IPhotoAsset;

    constructor() {
   }

    ngOnInit() {
        this.switchPhoto(4);
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
