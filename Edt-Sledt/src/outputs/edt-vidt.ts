'use strict';
import {io} from '../communication/sockets';

export function sendToVidt(message: any): void {
    // console.log('Emitting socket to Edt-Vidt: ', message);
    io.emit('message', message);
}
