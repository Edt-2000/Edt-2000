'use strict';
/**
 * Socket Server
 */
import express = require('express');
import http = require('http');
const app = express();
const server = http.createServer(app);

export import io = require('socket.io');
// init
io(server);

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
