'use strict';
/**
 * Socket Server
 */
import {socketPort} from '../../../Shared/config';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subject} from 'rxjs/Subject';
import {Actions} from '../../../Shared/actions';

const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    origins: '*:*',
    transports: ['websocket'],
});

export const ctrlSocketIn$ = new BehaviorSubject({} as Actions);
export const ctrlSocketOut$: Subject<Actions> = new Subject();

ctrlSocketOut$.subscribe(msg => {
    io.emit('toControl', msg);
});

io.on('connection', (socket) => {
    console.log('Controller connected!');
    // TODO: SEND ALONG STATE OF ALL SUBJECTS ETC

    socket.on('disconnect', () => {
        console.log('Controller disconnected!');
    });

    socket.on('fromControl', (action: Actions) => {
        ctrlSocketIn$.next(action);
    });
});

server.listen(socketPort);
console.log('Socket active!');
