"use strict";
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

io.on('connection', function (socket: any): void {
    // Add new display
    activeSockets.push(socket);
    console.log('New display connected! #', activeSockets.length);
    sendIdentify();

    socket.on('disconnect', function (): void {
        activeSockets.splice(activeSockets.indexOf(socket), 1);
        sendIdentify();
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

/**
 * Get the amount of displays currently available
 * @return {number}
 */
export function getDisplaysConnected(): number {
    return activeSockets.length;
}


// --------------------------------

/**
 * After each change in connected sockets, update all clients with their new ID
 */
function sendIdentify(): void {
    activeSockets.forEach(socket => {
        socket.emit('displayId', activeSockets.indexOf(socket) + 1);
    });
}
