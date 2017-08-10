"use strict";
import {connectMsg} from '../../SharedTypes/socket';
/**
 * Socket Server
 */
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

/**
 * Socket management
 */
let activeSockets: any[] = [];

// TODO: refactor to use 'rooms' for different areas of the Edt-Vidt (left, center, top, bottom, etc). Screens can then be defined to be in multiple rooms.

io.on('connection', function (socket: any): void {
    // Add new display
    activeSockets.push(socket);
    console.log('New display connected! #', activeSockets.length);

    socket.on('disconnect', function (): void {
        activeSockets.splice(activeSockets.indexOf(socket), 1);
        console.log('Display disconnected! #', activeSockets.length);
    });
});

server.listen(8988);

/**
 * Send a message to all sockets
 * @param message
 */
export function sendToVidt(message: any): void {
    console.log('Sending socket msg:', message);
    activeSockets.forEach(socket => {
        socket.emit('message', message);
    });
}