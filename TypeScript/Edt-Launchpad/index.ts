import { DeviceIPs } from '../Shared/config';
import { convertToOSC } from '../Shared/helpers/utils';
import { IOSCMessage } from '../Shared/helpers/types';
import dgram = require('dgram');
import osc = require('osc-min');

const outSocket = dgram.createSocket('udp4');

function sendToOSC(
    device: DeviceIPs,
    port: number,
    msg: IOSCMessage,
): void {
    const buf = osc.toBuffer(convertToOSC(msg));
    return outSocket.send(buf, 0, buf.length, port, device);
}

const Launchpad = require('launchpad-mini');
const pad = new Launchpad();

pad.connect().then(() => {
    pad.reset(2);
    pad.on('key', k => {
        pad.col(k.pressed ? pad.red : pad.green, k);
    });
});
