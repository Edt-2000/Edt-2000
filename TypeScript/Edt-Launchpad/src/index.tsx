import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
import { combineLatest, fromEvent } from 'rxjs';
import { debounceTime, map, tap, withLatestFrom } from 'rxjs/operators';
import { blackColor } from '../../Shared/colors/utils';
import { VidtPresets, vidtPresetsArr } from '../../Shared/vidt-presets';
import { animationTypeArr, AnimationTypes } from '../../Shared/vidt/animation';

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

const rows = {
    animationTypes: 2,
    wordSet: 4,
    images: 5,
    palletteInstant: 6,
    palette: 7,
};

const firstRow = vidtPresetsArr.slice(0, 9);
const secondRow = vidtPresetsArr.slice(9, vidtPresetsArr.length);

pad.connect().then(() => {
    pad.reset();
    const key$ = fromEvent<Pad>(pad, 'key');
    // Color the buttons so you know which buttons do something
    combineLatest([
        Actions$.colorPalette,
        Actions$.contentGroup,
    ]).pipe(
        map(([palette, { images, wordSet }]) => {
            const vidtPresets1 = [...new Array(firstRow.length)]
                .map((_, i) => i)
                .map(x => [x, 0, Launchpad.Colors.amber]);
            const vidtPresets2 = [...new Array(secondRow.length)]
                .map((_, i) => i)
                .map(x => [x, 1, Launchpad.Colors.amber]);

            const wordSetButtons = [...new Array(wordSet.length)]
                .map((_, i) => i)
                .map(x => [x, rows.wordSet, Launchpad.Colors.amber]);

            const animationTypes = [...new Array(animationTypeArr.length)]
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
                ...animationTypes,
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
        ),
        tap(([key, palette, { images, wordSet }]) => {
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

                if (key.y === rows.animationTypes && animationTypeArr[key.x]) {
                    sendToSledt(Actions.animationType(AnimationTypes[animationTypeArr[key.x]]));
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
