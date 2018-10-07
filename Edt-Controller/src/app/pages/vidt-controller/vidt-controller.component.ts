import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SocketService} from '../../socket.service';
import {photoAssets, videoAssets} from '../../../../../Shared/assets';
import {animationTypes, vidtPresets,} from '../../../../../Shared/vidt-presets';
import {words, wordSets} from '../../../../../Shared/words';

@Component({
    selector: 'app-vidt-controller',
    templateUrl: './vidt-controller.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VidtControllerComponent implements OnInit {
    photoAssets = photoAssets;
    videoAssets = videoAssets;
    vidtPages = Array.from(vidtPresets, ([preset, label]) => ({preset, label}));
    wordsArray = words;
    wordSets = wordSets;

    animations = [
        animationTypes.stretch,
        animationTypes.spin,
        animationTypes.rotate,
        animationTypes.bounce,
    ];

    constructor(
      public socket: SocketService
    ) {}

    ngOnInit() {

    }
}
