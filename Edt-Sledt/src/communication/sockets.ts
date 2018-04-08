'use strict';
/**
 * Socket Server
 */
import {socketPort} from '../../../SharedTypes/config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    origins: '*:*',
    transports: ['websocket'],
});

interface ctrlState {
    presets?: string[],
}

export const ctrlSocketIn$ = new BehaviorSubject({} as ctrlState);
export const ctrlSocketOut$: Subject<any> = new Subject();

ctrlSocketOut$.subscribe(msg => {
    io.emit('toControl', msg);
});

io.on('connection', (socket) => {
    console.log('Controller connected!');
    // TODO: SEND ALONG STATE OF ALL SUBJECTS ETC

    socket.on('disconnect', () => {
        console.log('Controller disconnected!');
    });

    socket.on('fromControl', (message: any) => {
        ctrlSocketIn$.next(message);
    });
});

server.listen(socketPort);
console.log('Socket active!');
