import { nextActionFromMsg } from "../../../Shared/actions/actions";

import * as SocketIO from "socket.io";
import { BehaviorSubject, fromEvent, take } from "rxjs";
import { thomasSocket$ } from "../communication/sockets";

const thomasSubject$ = new BehaviorSubject<string[]>([]);

thomasSocket$.subscribe((socket) => {
    thomasSubject$.next(
        Array.from(socket.nsp.sockets.keys()).map((id) => `thomas-${id}`),
    );

    const disconnected$ = fromEvent<SocketIO.Socket>(socket, "disconnect");

    disconnected$.pipe(take(1)).subscribe(() => {
        thomasSubject$.next(
            Array.from(socket.nsp.sockets.keys()).map((id) => `thomas-${id}`),
        );
    });

    // merge(Actions$.colorPalette.pipe(map(Actions.colorPalette)))
    //     .pipe(takeUntil(disconnected$))
    //     .subscribe((msg) => socket.emit("toThomas", msg));

    socket.on("fromThomas", (data: any) => {
        nextActionFromMsg(data);
    });
});

export const connectedThomas$ = thomasSubject$.asObservable();
