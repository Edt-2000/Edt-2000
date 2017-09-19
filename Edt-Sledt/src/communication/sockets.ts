"use strict";
/**
 * Socket Server
 */
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

export const io = require('socket.io')(server);

/**
 * Socket management
 */
io.on('connection', function (display: any): void {
    console.log('Display connected');
    display.on('disconnect', function (): void {
        console.log('Display disconnected');
    });
});

server.listen(8988);
