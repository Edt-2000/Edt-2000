import Vue from 'vue';
import Component from 'vue-class-component';

import {router} from '../services/router.service';
import * as io from 'socket.io-client';
import {DeviceIPs, socketPort} from '../../../../Shared/config';
import {Actions$, nextActionFromMsg} from '../../../../Shared/actions';
import Socket = SocketIOClient.Socket;
import {vidtPresets} from '../../../../Shared/vidt-presets';

@Component({
    name: 'app',
    template: require('./app.template'),
    router: router,
})
export default class App extends Vue {
    private socket: Socket;

    constructor() {
        super();
        this.socket = io(`${DeviceIPs.edtSledt}:${socketPort}`, { transports : ['websocket'] });

        this.socket.on('connection', () => {
            console.log('socket connectioned');
        });

        this.socket.on('toVidt', nextActionFromMsg);
    }

    mounted() {
        Actions$.prepareVidt.subscribe((presetNr) => {
            if (vidtPresets.has(presetNr)) {
                router.push(vidtPresets.get(presetNr) || '');
            } else {
                console.error('Unknown preset');
            }
        });
    }

    destroyed() {

    }

}

