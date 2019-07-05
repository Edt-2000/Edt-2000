import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DeviceIPs, OSCInPort } from '../../../Shared/config';
import dgram = require('dgram');
import osc = require('osc-min');

const sock = dgram.createSocket('udp4', processOscMessage);

sock.bind(OSCInPort);

export const OSCOutput$ = new Subject<string>();

export function convertToOSC(addresses: string[], params: number[]) {
    // TODO: remove 0 -> ? conversion and implement 0 in all receivers
    const thomasAddress = '/' + addresses.join('/').replace('0', '?');

    return osc.toBuffer({
        address: thomasAddress,
        args: params.map(param => {
            return {
                type: 'integer',
                value: param,
            };
        }),
    });
}

export function sendToOSC(
    device: DeviceIPs,
    port: number,
    addresses: string[],
    params: number[] = [],
): void {
    OSCOutput$.next(`OSC: ${addresses.join('/')} ${params.join(' ')}`);
    const buf = convertToOSC(addresses, params);
    return sock.send(buf, 0, buf.length, port, device);
}

// Use a subject to be able to push new OSC messages
const OSCSubject: Subject<IOSCMessage> = new Subject();

export const OSC$: Observable<IOSCMessage> = OSCSubject.asObservable();

export interface IOSCMessage {
    addresses: string[];
    values: number[];
}

/**
 * Convert OSC buffer to an OSC message which is sent to the OSCSubject
 * @param msg
 * @param rinfo
 */
function processOscMessage(msg, rinfo) {
    try {
        const oscMessage = osc.fromBuffer(msg);
        if (oscMessage.oscType === 'message') {
            // Convert OSC input to a next on the IOSCMessage Subject
            const addresses: string[] = oscMessage.address.split('/');
            addresses.shift();

            if (addresses.length > 0) {
                // Send to OSCSubject observable for further processing
                OSCSubject.next({
                    addresses,
                    values: oscMessage.args.map(arg => arg.value),
                });
            }
        } else {
            console.error('Unsupported OSC format:', oscMessage);
        }
    } catch (error) {
        return console.error('Invalid OSC:', error);
    }
}
