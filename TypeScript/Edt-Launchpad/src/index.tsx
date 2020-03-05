import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
import { fromEvent } from 'rxjs';
import { debounceTime, filter, map, tap, withLatestFrom } from 'rxjs/operators';

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

interface Pad {
    x: number;
    y: number;
    pressed: boolean;
    id: symbol;
}

const commands$ = Actions$.launchpadPage.pipe(
    map(({ pageNumber, pageAmount, triggers }) => {
        const pages = [...new Array(pageAmount)]
            .map((_, index) => index)
            .map(index => {
                return [index, 8, Launchpad.Colors.green];
            });
        const activePage = [pageNumber - 1, 8, Launchpad.Colors.red];
        return [
            ...pages,
            activePage, // ActivePage needs to go after so it can overwrite the pages
            ...triggers.reduce((acc, row, y) => {
                return [
                    ...acc,
                    ...row.map(([color], x) => [x, y, Launchpad.Colors[color]]),
                ];
            }, []),
        ];
    }),
);

pad.connect().then(() => {
    console.log('Launchpad connected!');
    pad.reset();
    // Color the buttons so you know which buttons do something
    commands$.pipe(debounceTime(100)).subscribe(async commands => {
        await pad.reset();
        await pad.setColors(commands);
    });

    // Handle key events and send correct messages
    key$.pipe(
        withLatestFrom(Actions$.launchpadPage),
        map(([key, launchpadPage]) => ({
            key,
            trigger: launchpadPage.triggers[key.y] && launchpadPage.triggers[key.y][key.x],
        })),
        filter(({ trigger }) => !!trigger),
        tap(({ key, trigger: [defaultColor, pressedColor, label, action, releaseAction] }) => {
            if (key.pressed) {
                sendToSledt(action);
            } else if (releaseAction) {
                sendToSledt(releaseAction);
            }
            pad.col(Launchpad.Colors[key.pressed ? pressedColor : defaultColor], key);
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
