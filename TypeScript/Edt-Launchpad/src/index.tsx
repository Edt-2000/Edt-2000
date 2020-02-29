import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
import { combineLatest, fromEvent } from 'rxjs';
import { debounceTime, map, tap, withLatestFrom } from 'rxjs/operators';
import { blackColor } from '../../Shared/colors/utils';
import { VidtPresets } from '../../Shared/vidt-presets';
import { AnimationTypes } from '../../Shared/vidt/animation';

// These libs don't support ES6 imports :/
const Launchpad = require('launchpad-mini');
const socketClient = require('socket.io-client');

const [, , edtSledtIP] = process.argv;
const socket = socketClient(`http://${edtSledtIP ? edtSledtIP : 'localhost'}:8898/launchpad`, {
    origins: '*:*',
    transports: ['websocket'],
});

socket.on('connect', () => console.log('Connected to Edt-Sledt!'));
socket.on('disconnect', () => console.log('Connection lost!'));
socket.on('toLaunchpad', action => nextActionFromMsg(action));

const pad = new Launchpad();
const key$ = fromEvent<Pad>(pad, 'key');

// key$.subscribe(key => console.log('key', key));

interface Pad {
    x: number;
    y: number;
    pressed: boolean;
    id: symbol;
}

const rows = {
    animationTypes: 2,
    wordSet: 4,
    images: 5,
    palletteInstant: 6,
    palette: 7,
};

pad.connect().then(() => {
    console.log('Launchpad connected!');
    pad.reset();
    // Color the buttons so you know which buttons do something
    combineLatest([
        Actions$.colorPalette,
        Actions$.contentGroup,
        Actions$.animationTypes,
        Actions$.vidtPresets,
    ]).pipe(
        map(([palette, { images, wordSet }, animationTypes, vidtPresets]) => {
            const firstRow = vidtPresets.slice(0, 9);
            const secondRow = vidtPresets.slice(9, vidtPresets.length);

            const vidtPresets1 = [...new Array(firstRow.length)]
                .map((_, i) => i)
                .map(x => [x, 0, Launchpad.Colors.amber]);
            const vidtPresets2 = [...new Array(secondRow.length)]
                .map((_, i) => i)
                .map(x => [x, 1, Launchpad.Colors.amber]);

            const wordSetButtons = [...new Array(wordSet.length)]
                .map((_, i) => i)
                .map(x => [x, rows.wordSet, Launchpad.Colors.amber]);

            const animationTypesButtons = [...new Array(animationTypes.length)]
                .map((_, i) => i)
                .map(x => [x, rows.animationTypes, Launchpad.Colors.yellow]);

            const imagesButtons = [...new Array(images.length)]
                .map((_, i) => i)
                .map(x => [x, rows.images, Launchpad.Colors.red]);

            const palletteInstantButtons = [...new Array(palette.length)]
                .map((_, i) => i)
                .map(x => [x, rows.palletteInstant, Launchpad.Colors.yellow]);

            const paletteButtons = [...new Array(palette.length)]
                .map((_, i) => i)
                .map(x => [x, rows.palette, Launchpad.Colors.yellow]);

            return [
                ...vidtPresets1,
                ...vidtPresets2,
                ...wordSetButtons,
                ...animationTypesButtons,
                ...imagesButtons,
                ...palletteInstantButtons,
                ...paletteButtons,
                [8, 3, Launchpad.Colors.red],
            ];
        }),
        debounceTime(500),
    ).subscribe(async commands => {
        await pad.reset();
        await pad.setColors(commands);
    });

    // Handle key events and send correct messages
    key$.pipe(
        withLatestFrom(
            Actions$.colorPalette,
            Actions$.contentGroup,
            Actions$.animationTypes,
            Actions$.vidtPresets,
        ),
        tap(([key, palette, { images, wordSet }, animationTypes, vidtPresets]) => {
            const firstRow = vidtPresets.slice(0, 9);
            const secondRow = vidtPresets.slice(9, vidtPresets.length);

            if (key.pressed) {
                if (key.x === 8 && key.y === 3) {
                    sendToSledt(Actions.mainBeat(127));
                }

                // VIDT Presets divided in 2 rows
                if (key.y === 0 && firstRow.length) {
                    if (VidtPresets[firstRow[key.x]]) {
                        sendToSledt(Actions.prepareVidt(VidtPresets[firstRow[key.x]]));
                    }
                }
                if (key.y === 1 && secondRow.length) {
                    if (VidtPresets[secondRow[key.x]]) {
                        sendToSledt(Actions.prepareVidt(VidtPresets[secondRow[key.x]]));
                    }
                }

                if (key.y === rows.animationTypes && animationTypes[key.x]) {
                    sendToSledt(Actions.animationType(AnimationTypes[animationTypes[key.x]]));
                }

                if (key.y === rows.wordSet && wordSet[key.x]) {
                    sendToSledt(Actions.mainText(wordSet[key.x]));
                }
                if (key.y === rows.images && images[key.x]) {
                    sendToSledt(Actions.imageSrc(images[key.x]));
                }
                if ((key.y === rows.palette || key.y === rows.palletteInstant) && palette[key.x]) {
                    sendToSledt(Actions.singleColor(palette[key.x]));
                }
            } else {
                if ((key.y === rows.palletteInstant) && palette[key.x]) {
                    sendToSledt(Actions.singleColor(blackColor));
                }
            }
        }),
    ).subscribe();

}).catch(() => {
    console.log('NO LAUNCHPAD CONNECTED!');
    process.exit(1);
});

function sendToSledt(msg: Actions) {
    console.log('Sending: ', msg);
    socket.emit('fromLaunchpad', msg);
}
