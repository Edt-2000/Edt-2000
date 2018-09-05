import Vue from 'vue';
import Component from 'vue-class-component';

import { router } from '../services/router.service';
import * as io from 'socket.io-client';
import { DeviceIPs, socketPort } from '../../../../Shared/config';
import { Actions$, nextActionFromMsg } from '../../../../Shared/actions';
import { vidtPresets } from '../../../../Shared/vidt-presets';
import Socket = SocketIOClient.Socket;

@Component({
    name: 'app',
    template: require('./app.template'),
    router: router,
})
export default class App extends Vue {
    private socket: Socket;
    public subscription: any;

    constructor() {
        super();
        this.socket = io(`${DeviceIPs.edtSledt}:${socketPort}`, { transports : ['websocket'] });

        this.socket.on('connection', () => {
            console.log('socket connectioned');
        });

        this.socket.on('toVidt', nextActionFromMsg);
    }

    mounted() {
        this.subscription = Actions$.prepareVidt.subscribe((presetNr: number) => {
            if (vidtPresets.has(presetNr)) {
                router.push(vidtPresets.get(presetNr) || '');
            } else {
                console.error('Unknown preset');
            }
        });
    }

    destroyed() {
        if (typeof this.subscription !== 'undefined') {
            this.subscription.unsubscribe();
        }
    }
}

