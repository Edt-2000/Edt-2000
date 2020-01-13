import { vidtSocket$ } from '../communication/sockets';
import { fromEvent } from 'rxjs/observable/fromEvent';
import * as SocketIO from 'socket.io';
import { take, takeUntil } from 'rxjs/operators';
import { Actions$ } from '../../../Shared/actions';
import { BehaviorSubject, merge } from 'rxjs';

export const connectedVidtSubject$ = new BehaviorSubject<string[]>([]);

vidtSocket$.subscribe(socket => {
    connectedVidtSubject$.next(Object.keys(socket.nsp.sockets));

    const disconnected$ = fromEvent<SocketIO.Socket>(socket, 'disconnect');

    disconnected$.pipe(take(1)).subscribe(() => {
        connectedVidtSubject$.next(Object.keys(socket.nsp.sockets));
    });

    merge(
        Actions$.animationType,
        Actions$.imageSrc,
        Actions$.videoSrc,
        Actions$.prepareVidt,
        Actions$.mainText,
        Actions$.mainDrum,
        Actions$.mainBeat,
        Actions$.vidtSingleColor,
        Actions$.vidtMultiColor,
        Actions$.glitchIntensity,
    ).pipe(
        takeUntil(disconnected$),
    ).subscribe(msg => socket.emit('toVidt', msg));
});

export const connectedVidt$ = connectedVidtSubject$.asObservable();
