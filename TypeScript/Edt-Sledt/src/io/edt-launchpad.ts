import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../../Shared/actions/actions";
import { launchpadSocket$ } from "../communication/sockets";
import * as SocketIO from "socket.io";
import { BehaviorSubject, fromEvent, map, merge, take, takeUntil } from "rxjs";

const connectedLaunchpadSubject$ = new BehaviorSubject<string[]>([]);

launchpadSocket$.subscribe((socket) => {
    connectedLaunchpadSubject$.next(
        Array.from(socket.nsp.sockets.keys()).map((id) => `launchpad-${id}`),
    );

    const disconnected$ = fromEvent<SocketIO.Socket>(socket, "disconnect");

    disconnected$.pipe(take(1)).subscribe(() => {
        connectedLaunchpadSubject$.next(Object.keys(socket.nsp.sockets));
    });

    merge(
        Actions$.launchpadPages.pipe(map(Actions.launchpadPages)),
        Actions$.launchpadPageChange.pipe(map(Actions.launchpadPageChange)),
    )
        .pipe(takeUntil(disconnected$))
        .subscribe((msg) => socket.emit("toLaunchpad", msg));

    socket.on("fromLaunchpad", nextActionFromMsg);
});

export const connectedLaunchpad$ = connectedLaunchpadSubject$.asObservable();
