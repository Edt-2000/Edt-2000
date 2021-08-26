import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
import { combineLatest, fromEvent } from 'rxjs';
import { debounceTime, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import {LaunchpadColor} from '../../Shared/actions/types';

// These libs don't support ES6 imports :/
// tslint:disable-next-line:no-var-requires
const Launchpad = require('launchpad-mini');
// tslint:disable-next-line:no-var-requires
const socketClient = require('socket.io-client');

const [, , edtSledtIP] = process.argv;
const socket = socketClient(`http://${edtSledtIP ? edtSledtIP : 'localhost'}:8898/launchpad`, {
    origins: '*:*',
    transports: ['websocket'],
});

const pad = new Launchpad();

socket.on('connect', () => console.log('Connected to Edt-Sledt!'));
socket.on('disconnect', () => {
    console.log('Connection lost!');
});
socket.on('toLaunchpad', action => nextActionFromMsg(action));

const key$ = fromEvent<Pad>(pad, 'key');

interface Pad {
    x: number;
    y: number;
    pressed: boolean;
    id: symbol;
}

const activePage$ = combineLatest([Actions$.launchpadPages, Actions$.launchpadActivePage]).pipe(
    map(([pages, pageNumber]) => pages[pageNumber] ? pages[pageNumber] : { title: '', triggers: [] }),
);

const commands$ = combineLatest([activePage$, Actions$.launchpadActivePage]).pipe(
    map(([page, pageNumber]) => {
        const activePage = [pageNumber, 8, Launchpad.Colors.red];
        return page.triggers ? [
            activePage,
            ...page.triggers.reduce((acc, row, y) => {
                return [
                    ...acc,
                    ...row.map(({color}, x) => [x, y, Launchpad.Colors[color]]),
                ];
            }, []),
        ] : [];
    }),
);

pad.connect().then(() => {
    console.log('Launchpad connected!');
    pad.reset();
    // Color the buttons so you know which buttons do something
    commands$.pipe(debounceTime(100)).subscribe(async commands => {
        // console.log('commands', commands);
        await pad.reset();
        await pad.setColors(commands);
    });

    // Handle key events and send correct messages
    key$.pipe(
        // If it's one of the top-buttons, we send launchPadPageNr
        tap(key => (key.y === 8 && key.pressed) && sendToSledt(Actions.launchpadActivePage(key.x))),
        withLatestFrom(activePage$),
        map(([key, launchpadPage]) => ({
            key,
            trigger: launchpadPage.triggers[key.y] && launchpadPage.triggers[key.y][key.x],
        })),
        filter(({ trigger }) => !!trigger),
        tap(({ key, trigger: { color, title, triggerType, triggerAction, releaseAction }}) => {
            if (key.pressed) {
                sendToSledt(triggerAction);
            } else if (releaseAction) {
                sendToSledt(releaseAction);
            }
            pad.col(Launchpad.Colors[key.pressed ? color : getContraColor(color)], key);
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

function getContraColor(color: LaunchpadColor): LaunchpadColor {
    switch (color) {
        case LaunchpadColor.red:
            return LaunchpadColor.yellow;
        case LaunchpadColor.amber:
            return LaunchpadColor.green;
        case LaunchpadColor.yellow:
            return LaunchpadColor.red;
        case LaunchpadColor.green:
            return LaunchpadColor.amber;
    }
}
