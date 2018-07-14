import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SocketService} from '../../socket.service';
import {Actions} from '../../../../../Shared/actions';
import { IPhotoAsset, photoAssets, IVideoAsset, videoAssets } from '../../../../../Shared/assets';
import {vidtPresets} from '../../../../../Shared/vidt-presets';
import {words} from '../../../../../Shared/words';

@Component({
    selector: 'app-vidt-controller',
    templateUrl: './vidt-controller.component.html',
    styleUrls: ['./vidt-controller.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VidtControllerComponent implements OnInit {
    photoAssets = photoAssets;
    videoAssets = videoAssets;
    vidtPages = Array.from(vidtPresets, ([preset, label]) => ({preset, label}));
    wordsArray = words;

    constructor(private socket: SocketService) {
    }

    ngOnInit() {

    }

    formatLabel(slug: string) {
        return slug.replace('/', '');
    }


    sendBeat() {
        this.socket.toSledt(Actions.mainBeat(127));
    }

    sendPhotoAsset(asset: IPhotoAsset) {
        this.socket.toSledt(Actions.imageSrc(asset));
    }

    sendVideoAsset(asset: IVideoAsset) {
        this.socket.toSledt(Actions.videoSrc(asset));
    }

    sendVidtPreset({preset}) {
        this.socket.toSledt(Actions.prepareVidt(preset));
    }

    sendText(main: string) {
        this.socket.toSledt(Actions.mainText(main));
    }
}
