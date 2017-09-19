"use strict";
import {io} from '../communication/sockets';

/**
 * Send a message to EdtVidt
 * @param message
 */
export function sendToVidt(message: any): void {
    console.log('Emitting socket to Edt-Vidt: ', message);
    io.emit('message', message);
}
