import { fromEvent } from "rxjs/observable/fromEvent";
import { Actions, Actions$, nextActionFromMsg } from "../../../Shared/actions";
import { take, takeUntil } from "rxjs/operators";
import { controlSocket$ } from "../communication/sockets";
import * as SocketIO from "socket.io";
import { BehaviorSubject } from "rxjs";

const connectedControlsSubject$ = new BehaviorSubject<string[]>([]);

controlSocket$.subscribe(socket => {
    connectedControlsSubject$.next(Object.keys(socket.nsp.sockets));

    const disconnected$ = fromEvent<SocketIO.Socket>(socket, "disconnect");

    disconnected$.pipe(take(1)).subscribe(() => {
        connectedControlsSubject$.next(Object.keys(socket.nsp.sockets));
    });

    Actions$.presetState.pipe(takeUntil(disconnected$)).subscribe(state => {
        socket.emit("toControl", Actions.presetState(state));
    });
    Actions$.cueList.pipe(takeUntil(disconnected$)).subscribe(list => {
        socket.emit("toControl", Actions.cueList(list));
    });
    Actions$.videoList.pipe(takeUntil(disconnected$)).subscribe(list => {
        socket.emit("toControl", Actions.videoList(list));
    });
    Actions$.imageList.pipe(takeUntil(disconnected$)).subscribe(list => {
        socket.emit("toControl", Actions.imageList(list));
    });

    socket.on("fromControl", nextActionFromMsg);
});

export const connectedControls$ = connectedControlsSubject$.asObservable();
