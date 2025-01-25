import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../Shared/actions/actions";
import {
    BehaviorSubject,
    combineLatest,
    debounceTime,
    filter,
    fromEvent,
    interval,
    map,
    startWith,
    switchMap,
    tap,
    withLatestFrom,
} from "rxjs";
import { LaunchpadColor } from "../../Shared/actions/types";
import { launchpadSingleActions } from "../../Edt-Sledt/config/launchpad";

// These libs don't support ES6 imports :/
// tslint:disable-next-line:no-var-requires
const Launchpad = require("launchpad-mini");
// tslint:disable-next-line:no-var-requires
const socketClient = require("socket.io-client");

const [, , launchpadInPortArg, launchpadOutPortArg, edtSledtIP] = process.argv;
const socket = socketClient(
    `http://${edtSledtIP ? edtSledtIP : "localhost"}:8898/launchpad`,
    {
        origins: "*:*",
        transports: ["websocket"],
    },
);

const launchpadInPort = +launchpadInPortArg || 0;
const launchpadOutPort = +launchpadOutPortArg || +launchpadInPort;

const pad = new Launchpad();

console.log("Launchpads", pad.availablePorts);

const key$ = fromEvent<Pad>(pad, "key");

interface Pad {
    x: number;
    y: number;
    pressed: boolean;
    id: symbol;
}

const launchpadPage$ = Actions$.launchpadPageIndex.pipe(
    map((pageIndex) => pageIndex[socket.id]),
    startWith(0),
);

const connected$ = new BehaviorSubject(false);

const activePage$ = combineLatest([
    Actions$.launchpadPages,
    launchpadPage$,
]).pipe(
    map(([pages, page]) =>
        pages[page] ? pages[page] : { title: "", triggers: [] },
    ),
);

const launchpadCommands$ = combineLatest([activePage$, launchpadPage$]).pipe(
    map(([page, pageNumber]) => {
        const activePage = [pageNumber, 8, Launchpad.Colors.red];
        return page.triggers
            ? [
                  activePage,
                  ...page.triggers.reduce((acc, row, y) => {
                      return [
                          ...acc,
                          ...row.map(({ color }, x) => [
                              x,
                              y,
                              Launchpad.Colors[color],
                          ]),
                      ];
                  }, []),
              ]
            : [];
    }),
    map((triggers) => {
        return [
            ...triggers,
            ...launchpadSingleActions.map((trigger, index) => [
                8,
                index,
                Launchpad.Colors[trigger.color],
            ]),
        ];
    }),
);

const commands$ = connected$.pipe(
    switchMap((connection) => {
        console.log("connection", connection);
        if (connection) {
            return launchpadCommands$;
        } else {
            return interval(500).pipe(
                map((count) => {
                    const onOff = !(count % 2);
                    return [[8, 7, Launchpad.Colors[onOff ? "yellow" : "off"]]];
                }),
            );
        }
    }),
);

pad.connect(launchpadInPort, launchpadOutPort)
    .then(() => {
        console.log(`Launchpad ${launchpadInPort} connected!`);
        pad.reset();
        // Color the buttons so you know which buttons do something
        commands$.pipe(debounceTime(100)).subscribe(async (commands) => {
            await pad.reset();
            await pad.setColors(commands);
        });

        key$.pipe(
            // If it's one of the top-buttons, we send launchPadPageNr
            tap((key) => {
                if (key.y === 8 && key.pressed) {
                    sendToSledt(
                        Actions.launchpadPageChange({
                            launchpad: socket.id,
                            page: key.x,
                        }),
                    );
                }
            }),
        ).subscribe();

        // Handle key events and send correct messages
        key$.pipe(
            tap((key) => {
                if (key.x === 8) {
                    const action = launchpadSingleActions[key.y];
                    if (action && key.pressed && action.triggerAction) {
                        sendToSledt(action.triggerAction);
                    } else if (action && action.releaseAction) {
                        sendToSledt(action.releaseAction);
                    }
                }
            }),
            withLatestFrom(activePage$),
            map(([key, launchpadPage]) => ({
                key,
                trigger:
                    launchpadPage.triggers[key.y] &&
                    launchpadPage.triggers[key.y][key.x],
            })),
            filter(({ trigger }) => !!trigger),
            tap(
                ({
                    key,
                    trigger: {
                        color,
                        title,
                        triggerType,
                        triggerAction,
                        releaseAction,
                    },
                }) => {
                    if (key.pressed && triggerAction) {
                        sendToSledt(triggerAction);
                    }
                    if (!key.pressed && releaseAction) {
                        sendToSledt(releaseAction);
                    }
                    const newColor = key.pressed
                        ? getContraColor(color)
                        : color;
                    pad.col(Launchpad.Colors[newColor], key);
                },
            ),
        ).subscribe();
    })
    .catch((e: any) => {
        console.log("NO LAUNCHPAD CONNECTED!", e);
        process.exit(1);
    });

function sendToSledt(msg: Actions) {
    if (socket.connected) {
        console.log("Sending: ", msg);
        socket.emit("fromLaunchpad", msg);
    }
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
        case LaunchpadColor.off:
            return LaunchpadColor.off;
    }
}

socket.on("connect", () => {
    connected$.next(true);
    // Reset launchpad page change to page 0
    sendToSledt(
        Actions.launchpadPageChange({
            launchpad: socket.id,
            page: 0,
        }),
    );
});
socket.on("disconnect", () => {
    connected$.next(false);
    console.log("Connection lost!");
});

socket.on("toLaunchpad", (action) => nextActionFromMsg(action));
