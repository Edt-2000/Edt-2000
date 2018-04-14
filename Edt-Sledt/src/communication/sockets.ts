'use strict';
import {socketPort} from '../../../Shared/config';

const app = require('express')();
const server = require('http').createServer(app);
export const io = require('socket.io')(server, {
    origins: '*:*',
    transports: ['websocket'],
});

server.listen(socketPort);
