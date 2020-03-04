import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
import { fromEvent } from 'rxjs';
import { debounceTime, map, shareReplay, tap, withLatestFrom } from 'rxjs/operators';

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

const launchpadPage$ = Actions$.launchpadPage.pipe(
    map(({ triggers }) => {
        console.time('test');
        let indexOffset = 0;
        return triggers.reduce((acc, row, y) => {
            const commands = row.map(([defaultColor, pressedColor, action], x) => {
                return {
                    x,
                    y: y + indexOffset,
                    defaultColor: Launchpad.Colors[defaultColor],
                    pressedColor: Launchpad.Colors[pressedColor],
                    action,
                };
            });
            // If there are more buttons than 8,
            // add to indexOffset so the next row will skip the overflow
            indexOffset += Math.floor(row.length / 8);
            return [...acc, ...commands];
        }, [] as Array<{
            x: number;
            y: number;
            defaultColor: 'red' | 'green' | 'amber' | 'yellow' | 'off';
            pressedColor: 'red' | 'green' | 'amber' | 'yellow' | 'off';
            action: Actions
        }>);
    }),
    tap(() => console.timeEnd('test')),
    shareReplay(1), // Prevent from doing the calculations over and over again
);

pad.connect().then(() => {
    console.log('Launchpad connected!');
    pad.reset();
    // Color the buttons so you know which buttons do something
    launchpadPage$.pipe(debounceTime(100)).subscribe(async commands => {
        console.log('commands', commands);
        await pad.reset();
        await pad.setColors(commands.map(({ x, y, defaultColor }) => [x, y, defaultColor]));
    });

    // Handle key events and send correct messages
    key$.pipe(
        withLatestFrom(launchpadPage$),
        tap(([key, launchpadPage]) => {
            const pressed = launchpadPage.find(({ x, y }) => key.x === x && key.y === y);
            console.log('press:', pressed, pad);
            pad.col(key.pressed ? pressed.pressedColor : pressed.defaultColor, key);
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
