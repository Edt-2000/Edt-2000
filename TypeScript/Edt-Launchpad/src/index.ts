import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions/actions';
import { combineLatest, debounceTime, filter, fromEvent, map, startWith, tap, withLatestFrom } from 'rxjs';
import { LaunchpadColor } from '../../Shared/actions/types';
import { launchpadSingleActions } from 'edt-sledt/config/launchpad';

// These libs don't support ES6 imports :/
// tslint:disable-next-line:no-var-requires
const Launchpad = require('launchpad-mini');
// tslint:disable-next-line:no-var-requires
const socketClient = require('socket.io-client');

const [, , launchpadInPortArg, launchpadOutPortArg, edtSledtIP] = process.argv;
const socket = socketClient(`http://${edtSledtIP ? edtSledtIP : 'localhost'}:8898/launchpad`, {
    origins: '*:*',
    transports: ['websocket'],
});

const launchpadInPort = +launchpadInPortArg || 0;
const launchpadOutPort = +launchpadOutPortArg || +launchpadInPort;

const pad = new Launchpad();

console.log('Launchpads', pad.availablePorts);

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

const launchpadPage$ = Actions$.launchpadPageChange.pipe(
    filter(pageChange => pageChange.launchpad === launchpadInPort),
    map(pageChange => pageChange.page),
    startWith(1),
);

const activePage$ = combineLatest([Actions$.launchpadPages, launchpadPage$]).pipe(
    map(([pages, page]) => pages[page] ? pages[page] : {title: '', triggers: []}),
);

const commands$ = combineLatest([activePage$, launchpadPage$]).pipe(
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
    map(triggers => {
        return [
            ...triggers,
            ...launchpadSingleActions.map((trigger, index) => [8, index, Launchpad.Colors[trigger.color]]),
        ];
    }),
);

pad.connect(launchpadInPort, launchpadOutPort).then(() => {
    console.log(`Launchpad ${launchpadInPort} connected!`);
    pad.reset();
    // Color the buttons so you know which buttons do something
    commands$.pipe(debounceTime(100)).subscribe(async commands => {
        await pad.reset();
        await pad.setColors(commands);
    });

    key$.pipe(
        // If it's one of the top-buttons, we send launchPadPageNr
        tap(key => {
            if (key.y === 8 && key.pressed) {
                sendToSledt(Actions.launchpadPageChange({launchpad: launchpadInPort, page: key.x}));
            }
        }),
    ).subscribe();

    // Handle key events and send correct messages
    key$.pipe(
        tap(key => {
            if (key.x === 8) {
                const action = launchpadSingleActions[key.y];
                if (action && key.pressed && action.triggerAction) {
                    sendToSledt(action.triggerAction);
                } else if (action && action.releaseAction) {
                    sendToSledt(action.releaseAction);
                }
            }
        } ),
        withLatestFrom(activePage$),
        map(([key, launchpadPage]) => ({
            key,
            trigger: launchpadPage.triggers[key.y] && launchpadPage.triggers[key.y][key.x],
        })),
        filter(({ trigger }) => !!trigger),
        tap(({ key, trigger: { color, title, triggerType, triggerAction, releaseAction }}) => {
            if (key.pressed && triggerAction) {
                sendToSledt(triggerAction);
            }
            if (!key.pressed && releaseAction) {
                sendToSledt(releaseAction);
            }
            const newColor = key.pressed ? getContraColor(color) : color;
            pad.col(Launchpad.Colors[newColor], key);
        }),
    ).subscribe();

}).catch((e: any) => {
    console.log('NO LAUNCHPAD CONNECTED!', e);
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
