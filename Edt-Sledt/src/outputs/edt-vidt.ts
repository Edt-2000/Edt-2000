'use strict';

import {Actions, Actions$} from '../../../Shared/actions';
import {io} from '../communication/sockets';

export function toVidt(msg: Actions): void {
    io.emit('toVidt', msg);
}

// There are a number of actions we always want to send to the Edt-Vidt

Actions$.mainBeat.subscribe(velocity => {
    toVidt(Actions.mainBeat(velocity));
});

Actions$.singleColor.subscribe(color => {
    toVidt(Actions.singleColor(color));
});

Actions$.animationType.subscribe(type => {
    toVidt(Actions.animationType(type));
});

Actions$.imageSrc.subscribe(src => {
    toVidt(Actions.imageSrc(src));
});

Actions$.videoSrc.subscribe(src => {
    toVidt(Actions.videoSrc(src));
});
