import {
    Actions,
    Actions$,
    nextActionFromMsg,
} from "../../../Shared/actions/actions";
import { controlSocket$ } from "../communication/sockets";
import * as SocketIO from "socket.io";
import { BehaviorSubject, fromEvent, map, merge, take, takeUntil } from "rxjs";

const connectedControlsSubject$ = new BehaviorSubject<string[]>([]);

controlSocket$.subscribe((socket) => {
    connectedControlsSubject$.next(
        Array.from(socket.nsp.sockets.keys()).map((id) => `control-${id}`),
    );

    const disconnected$ = fromEvent<SocketIO.Socket>(socket, "disconnect");

    disconnected$.pipe(take(1)).subscribe(() => {
        connectedControlsSubject$.next(
            Array.from(socket.nsp.sockets.keys()).map((id) => `control-${id}`),
        );
    });

    merge(
        Actions$.launchpadPages.pipe(map(Actions.launchpadPages)),
        Actions$.launchpadPageChange.pipe(map(Actions.launchpadPageChange)),
        Actions$.presetState.pipe(map(Actions.presetState)),
        Actions$.cueList.pipe(map(Actions.cueList)),
        Actions$.colorPalette.pipe(map(Actions.colorPalette)),
        Actions$.contentGroups.pipe(map(Actions.contentGroups)),
        Actions$.contentGroup.pipe(map(Actions.contentGroup)),
        Actions$.animationTypes.pipe(map(Actions.animationTypes)),
        Actions$.shapes.pipe(map(Actions.shapes)),
        Actions$.sizes.pipe(map(Actions.sizes)),
        Actions$.vidtPresets.pipe(map(Actions.vidtPresets)),
    )
        .pipe(takeUntil(disconnected$))
        .subscribe((msg) => socket.emit("toControl", msg));

    socket.on("fromControl", nextActionFromMsg);
});

export const connectedControls$ = connectedControlsSubject$.asObservable();
