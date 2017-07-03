"use strict";
/**
 * Socket Server
 */
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

module.exports = {
    connect: connect,
    send: send,
    getDisplaysConnected: (): number => {
        "use strict";
        return activeSockets.length;
    }
};

/**
 * Socket management
 */
let activeSockets: any[] = [];

function connect(): void {
    "use strict";
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
}

/**
 * Send a message to all sockets
 * @param message
 */
function send(message: any): void {
    activeSockets.forEach(socket => {
        socket.emit('message', message);
    });
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
