import { Inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { nextActionFromMsg } from '../../../Shared/actions/actions';
import io from 'socket.io-client';
import { WINDOW } from './window.token';

@Injectable({ providedIn: 'root' })
export class SocketService {
    private socket;

    constructor(@Inject(WINDOW) private window: Window) {
        if (environment.solo) {
            return;
        }
        // We use the hostname,
        this.socket = io(`http://${window.location.hostname}:${8898}/vidt`, {
            transports: ['websocket'],
        });
        this.socket.on('connection', (event) => {
            console.log('Socket connected!', event);
        });
        this.socket.on('toVidt', (msg) => {
            nextActionFromMsg(msg);
        });
    }
}
