import { vidtSocket$ } from '../communication/sockets';
import { fromEvent } from 'rxjs/observable/fromEvent';
import * as SocketIO from 'socket.io';
import { take, takeUntil } from 'rxjs/operators';
import { Actions, Actions$ } from '../../../Shared/actions';
import { BehaviorSubject } from 'rxjs';

export const connectedVidtSubject$ = new BehaviorSubject<string[]>([]);

vidtSocket$.subscribe(socket => {
    connectedVidtSubject$.next(Object.keys(socket.nsp.sockets));

    const disconnected$ = fromEvent<SocketIO.Socket>(socket, 'disconnect');

    disconnected$.pipe(take(1)).subscribe(() => {
        connectedVidtSubject$.next(Object.keys(socket.nsp.sockets));
    });

    Actions$.animationType.pipe(takeUntil(disconnected$)).subscribe(type => {
        socket.emit('toVidt', Actions.animationType(type));
    });
    Actions$.imageSrc.pipe(takeUntil(disconnected$)).subscribe(src => {
        socket.emit('toVidt', Actions.imageSrc(src));
    });
    Actions$.videoSrc.pipe(takeUntil(disconnected$)).subscribe(src => {
        socket.emit('toVidt', Actions.videoSrc(src));
    });
    Actions$.prepareVidt.pipe(takeUntil(disconnected$)).subscribe(preset => {
        socket.emit('toVidt', Actions.prepareVidt(preset));
    });
    Actions$.mainText.pipe(takeUntil(disconnected$)).subscribe(text => {
        socket.emit('toVidt', Actions.mainText(text));
    });
    Actions$.vidtDrum.pipe(takeUntil(disconnected$)).subscribe(drum => {
        socket.emit('toVidt', Actions.vidtDrum(drum));
    });
    Actions$.vidtBeat.pipe(takeUntil(disconnected$)).subscribe(beat => {
        socket.emit('toVidt', Actions.vidtBeat(beat));
    });
    Actions$.vidtSingleColor.pipe(takeUntil(disconnected$)).subscribe(color => {
        socket.emit('toVidt', Actions.vidtSingleColor(color));
    });
    Actions$.vidtMultiColor.pipe(takeUntil(disconnected$)).subscribe(multi => {
        socket.emit('toVidt', Actions.vidtMultiColor(multi));
    });
    Actions$.glitchIntensity
        .pipe(takeUntil(disconnected$))
        .subscribe(intensity => {
            socket.emit('toVidt', Actions.glitchIntensity(intensity));
        });
});

export const connectedVidt$ = connectedVidtSubject$.asObservable();
