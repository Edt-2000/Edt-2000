'use strict';

import {Actions} from '../../../Shared/actions';
import {io} from '../communication/sockets';
import {BeatMain} from '../subjects/triggers';
import {mainColor} from '../subjects/colors';
import {animationType, imageSrc, videoSrc} from '../subjects/vidtSettings';

export function toVidt(msg: Actions): void {
    console.log('Edt-Vidt: ', msg);
    io.emit('toVidt', msg);
}

BeatMain.subscribe(velocity => {
    toVidt(Actions.mainBeat(velocity));
});

mainColor.subscribe(color => {
    toVidt(Actions.singleColor(color));
});

animationType.subscribe(type => {
    toVidt(Actions.animationType(type));
});

imageSrc.subscribe(src => {
    toVidt(Actions.imageSrc(src));
});

videoSrc.subscribe(src => {
    toVidt(Actions.videoSrc(src));
});
