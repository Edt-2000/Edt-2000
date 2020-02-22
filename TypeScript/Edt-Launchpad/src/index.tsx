import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
import { fromEvent } from 'rxjs';
import { filter, map, withLatestFrom } from 'rxjs/operators';

const Launchpad = require('launchpad-mini');
const socket = require('socket.io-client')('http://localhost:8898/launchpad', {
    origins: '*:*',
    transports: ['websocket'],
});

const pad = new Launchpad();

socket.on('connect', () => console.log('Connected to Edt-Sledt!'));
socket.on('toLaunchpad', action => nextActionFromMsg(action));

interface Pad {
    x: number;
    y: number;
    pressed: boolean;
    id: symbol;
}

pad.connect().then(() => {
    pad.reset();
    const key$ = fromEvent<Pad>(pad, 'key').pipe(
        filter(p => p.pressed),
    );

    key$.pipe(
        withLatestFrom(Actions$.colorPalette),
        filter(([key]) => key.y === 7),
        map(([key, palette]) => {
            if (palette[key.x]) {
                sendToSledt(Actions.singleColor(palette[key.x]));
            }
        }),
    ).subscribe();

    key$.pipe(
        withLatestFrom(Actions$.contentGroup),
        filter(([key]) => key.y === 6),
        map(([key, { images }]) => {
            if (images[key.x]) {
                sendToSledt(Actions.imageSrc(images[key.x]));
            }
        }),
    ).subscribe();

}).catch(() => {
    console.log('NO LAUNCHPAD CONNECTED!');
    process.exit(1);
});

function sendToSledt(msg: Actions) {
    socket.emit('fromLaunchpad', msg);
}
