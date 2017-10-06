import {deviceIPs, oscInPort, oscOutPort} from '../../../SharedTypes/config';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

const osc = require('osc-min');
const dgram = require('dgram');
const sock = dgram.createSocket('udp4', processOscMessage);

sock.bind(oscInPort);

export function sendToOSC(device: deviceIPs, addresses: string[], params: number[] = []): void {
    console.log('Send to OSC', addresses, params);
    let buf = osc.toBuffer({
        address: '/' + addresses.join('/'),
        args: params.map((param) => {
            return {
                type: 'integer',
                value: param
            }
        })
    });
    return sock.send(buf, 0, buf.length, oscOutPort, device);
}

// Use a subject to be able to push new OSC messages
const OSCSubject: Subject<OSCMessage> = new Subject();

export const OSC$: Observable<OSCMessage> = OSCSubject.asObservable();

export interface OSCMessage {
    addresses: string[],
    values: number[]
}

/**
 * Convert OSC buffer to an OSC message which is sent to the OSCSubject
 * @param msg
 * @param rinfo
 */
function processOscMessage(msg, rinfo) {
    try {
        let oscMessage = osc.fromBuffer(msg);
        if (oscMessage.oscType === 'message') {
            // Convert OSC input to a next on the OSCMessage Subject
            let addresses: string[] = oscMessage.address.split('/');
            addresses.shift();

            if (addresses.length > 0) {
                // Send to OSCSubject observable for further processing
                OSCSubject.next({
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
