import { fromEvent } from 'rxjs/observable/fromEvent';
import { Actions, Actions$, nextActionFromMsg } from '../../../Shared/actions/actions';
import { map, take, takeUntil } from 'rxjs/operators';
import { launchpadSocket$ } from '../communication/sockets';
import * as SocketIO from 'socket.io';
import { BehaviorSubject, merge } from 'rxjs';

const connectedLaunchpadSubject$ = new BehaviorSubject<string[]>([]);

launchpadSocket$.subscribe(socket => {
    connectedLaunchpadSubject$.next(Object.keys(socket.nsp.sockets));

    const disconnected$ = fromEvent<SocketIO.Socket>(socket, 'disconnect');

    disconnected$.pipe(take(1)).subscribe(() => {
        connectedLaunchpadSubject$.next(Object.keys(socket.nsp.sockets));
    });

    merge(
        Actions$.colorPalette.pipe(map(Actions.colorPalette)),
        Actions$.contentGroup.pipe(map(Actions.contentGroup)),
        Actions$.vidtPresets.pipe(map(Actions.vidtPresets)),
        Actions$.animationTypes.pipe(map(Actions.animationTypes)),
        Actions$.cueList.pipe(map(Actions.cueList)),
    ).pipe(
        takeUntil(disconnected$),
    ).subscribe(msg => socket.emit('toLaunchpad', msg));

    socket.on('fromLaunchpad', nextActionFromMsg);
});

export const connectedLaunchpad$ = connectedLaunchpadSubject$.asObservable();
