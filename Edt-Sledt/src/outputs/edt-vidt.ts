import {vidtSocket$} from "../communication/sockets";
import {fromEvent} from "rxjs/observable/fromEvent";
import * as SocketIO from "socket.io";
import {take, takeUntil} from "rxjs/operators";
import {Actions, Actions$} from "../../../Shared/actions";

vidtSocket$.subscribe(socket => {
    const disconnected$ = fromEvent<SocketIO.Socket>(socket, 'disconnect');

    console.log('Vidt instance connected!', socket.id);

    disconnected$.pipe(take(1)).subscribe(() => {
        console.log('Vidt instance disconnected!', socket.id);
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
    Actions$.vidtMultiColor.pipe(takeUntil(disconnected$)).subscribe(multi => {
        socket.emit('toVidt', Actions.vidtMultiColor(multi));
    });
    Actions$.vidtBeat.pipe(takeUntil(disconnected$)).subscribe(beat => {
        socket.emit('toVidt', Actions.vidtBeat(beat));
    });
    Actions$.vidtSingleColor.pipe(takeUntil(disconnected$)).subscribe(color => {
        socket.emit('toVidt', Actions.vidtSingleColor(color));
    });
});

export const EdtVidtSetup = 'EdtVidtSetup';
