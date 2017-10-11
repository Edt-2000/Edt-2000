'use strict';
/**
 * Socket Server
 */
import express = require('express');
import http = require('http');
const app = express();
const server = http.createServer(app);

import socket = require('socket.io');
// init
export const io = socket(server);

/**
 * Socket management
 */
io.on('connection', (display) => {
    console.log('Display connected');
    display.on('disconnect', () => {
        console.log('Display disconnected');
    });
});

server.listen(8988);
