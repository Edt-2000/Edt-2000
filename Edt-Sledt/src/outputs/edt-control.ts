import {fromEvent} from "rxjs/observable/fromEvent";
import {Actions, Actions$, nextActionFromMsg} from "../../../Shared/actions";
import {take, takeUntil} from "rxjs/operators";
import {controlSocket$} from "../communication/sockets";
import * as SocketIO from "socket.io";

controlSocket$.subscribe(socket => {
    const disconnected$ = fromEvent<SocketIO.Socket>(socket, 'disconnect');

    console.log('Controller connected!', socket.id);

    disconnected$.pipe(take(1)).subscribe(() => {
        console.log('Controller disconnected!', socket.id);
    });

    Actions$.presetState.pipe(takeUntil(disconnected$)).subscribe(state => {
        socket.emit('toControl', Actions.presetState(state))
    });
    Actions$.cueList.pipe(takeUntil(disconnected$)).subscribe(list => {
        socket.emit('toControl', Actions.cueList(list));
    });
    Actions$.videoList.pipe(takeUntil(disconnected$)).subscribe(list => {
        socket.emit('toControl', Actions.videoList(list));
    });

    socket.on('fromControl', nextActionFromMsg);
});


export const EdtControlSetup = 'EdtControlSetup';
