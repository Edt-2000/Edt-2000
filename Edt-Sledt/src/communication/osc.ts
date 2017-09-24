import {deviceIPs, oscInPort, oscOutPort} from '../../../SharedTypes/config';
import {Subject} from 'rxjs/Subject';

const osc = require('osc-min');
const dgram = require('dgram');
const sock = dgram.createSocket('udp4', processOscMessage);

sock.bind(oscInPort);

export function sendToEdtOscDevice(address: string, instance: number, params: number[]): void {
    sendToOSC(`/${address}/${instance}`, params);
}

export function sendToOSC(address: string, params: number[]): void {
    console.log('Send to OSC', address, params);
    let buf;
    buf = osc.toBuffer({
        address: address,
        args: params.map((param) => {
            return {
                type: 'integer',
                value: param
            }
        })
    });
    return sock.send(buf, 0, buf.length, oscOutPort, deviceIPs.tweedt);
}

export const OSCInput: Subject<OSCMessage> = new Subject();

// --------------------------------

export interface OSCMessage {
    addresses: string[],
    values: number[]
}

OSCInput.subscribe((msg) => {
    console.log('OSC:', msg.addresses, msg.values);
});

function processOscMessage(msg, rinfo) {
    try {
        let oscMessage = osc.fromBuffer(msg);
        if (oscMessage.oscType === 'message') {
            // Convert OSC input to a next on the OSCMessage Subject
            let addresses: string[] = oscMessage.address.split('/');
            addresses.shift();

            if (addresses.length > 0) {
                // Send to OSCInput observable for further processing
                OSCInput.next({
                    addresses: addresses,
                    values: oscMessage.args.map((arg) => arg.value)
                });
            }
        } else {
            console.log('Unsupported OSC format:', oscMessage);
        }
    } catch (error) {
        return console.log('Invalid OSC:', error);
    }
}
// /TP/* 4 0 31 0 127 127
