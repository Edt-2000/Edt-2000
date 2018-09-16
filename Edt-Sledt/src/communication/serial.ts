import SerialPort = require('serialport');
import {arduinos,} from '../../../Shared/config';
import {convertToOSC, OSC$,} from './osc';
import {filter, map,} from 'rxjs/operators';

const serialports: SerialPort[] = arduinos.map(portName => {
    console.log('Setting up serial port for Arduino', portName);
    return new SerialPort(portName, { baudRate: 57600 });
});

serialports.forEach(port => port.on('error', function(err) {
    console.log(`Serial port ${port.path} error! Restart Edt-Sledt if needed.`);
}));

export function sendToSerial(addresses: string[], params: number[] = []): void  {
    const msg = convertToOSC(addresses, params);

    // console.log('Sending serial:', msg.toString());

    serialports.forEach(port => {
        port.write(msg);
    });
}

/**
 * OSC - SERIAL BRIDGE
 * @type {string}
 */

OSC$.pipe(
    filter(OSCMsg => OSCMsg.addresses.indexOf('R?') !== -1),
    map((OSCMsg) => {
        sendToSerial(OSCMsg.addresses, OSCMsg.values);
    }),
).subscribe();

OSC$.pipe(
    filter(OSCMsg => OSCMsg.addresses.indexOf('F?') !== -1),
    map((OSCMsg) => {
        sendToSerial(OSCMsg.addresses, OSCMsg.values);
    }),
).subscribe();

export const EdtSerialModule = 'EdtSerialModule';
