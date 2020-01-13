import { fromEvent } from 'rxjs/observable/fromEvent';
import { Actions$, nextActionFromMsg } from '../../../Shared/actions';
import { take, takeUntil } from 'rxjs/operators';
import { controlSocket$ } from '../communication/sockets';
import * as SocketIO from 'socket.io';
import { BehaviorSubject, merge } from 'rxjs';

const connectedControlsSubject$ = new BehaviorSubject<string[]>([]);

controlSocket$.subscribe(socket => {
    connectedControlsSubject$.next(Object.keys(socket.nsp.sockets));

    const disconnected$ = fromEvent<SocketIO.Socket>(socket, 'disconnect');

    disconnected$.pipe(take(1)).subscribe(() => {
        connectedControlsSubject$.next(Object.keys(socket.nsp.sockets));
    });

    merge(
        Actions$.presetState,
        Actions$.cueList,
        Actions$.colorPalette,
        Actions$.contentGroups,
        Actions$.contentGroup,
    ).pipe(
        takeUntil(disconnected$),
    ).subscribe(msg => socket.emit('toControl', msg));

    socket.on('fromControl', nextActionFromMsg);
});

export const connectedControls$ = connectedControlsSubject$.asObservable();
