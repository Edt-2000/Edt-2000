'use strict';
/**
 * Socket Server
 */
import express = require('express');
import http = require('http');
import socket = require('socket.io');

const app = express();
const server = http.createServer(app);

import {socketPort} from '../../../SharedTypes/socket';
// init
export const io = socket(server);

/**
 * Socket management
 */
io.on('connection', (client) => {
    console.log('Display connected');
    client.on('disconnect', () => {
        console.log('Display disconnected');
    });

    client.on('message', (message: any) => {
        console.log('socket: ', message);
    });
});

server.listen(socketPort);
