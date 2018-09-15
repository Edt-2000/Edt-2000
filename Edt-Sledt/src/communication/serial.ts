import SerialPort = require('serialport');
import {Arduinos, OSCDevices,} from '../../../Shared/config';
import {convertToOSC, OSC$,} from './osc';
import {filter, map,} from 'rxjs/operators';

const serialports: SerialPort[] = Arduinos.map(portName => {
    console.log('Setting up serial port for Arduino', portName);
    return new SerialPort(portName, { baudRate: 57600 });
});

serialports.forEach(port => port.on('error', function(err) {
    console.log(`Serial port ${port.path} error! Restart Edt-Sledt if needed.`);
}));

export function sendToSerial(device: string, strip: number, params: number[] = []): void  {
    const msg = convertToOSC([device, (strip === 0 ? '?' : strip).toString()], params); // if strip === 0, convert to '?'

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
        sendToSerial(OSCDevices.EdtRGBLed, 0, OSCMsg.values);
    }),
).subscribe();

OSC$.pipe(
    filter(OSCMsg => OSCMsg.addresses.indexOf('F?') !== -1),
    map((OSCMsg) => {
        sendToSerial(OSCDevices.EdtFastLed, 0, OSCMsg.values);
    }),
).subscribe();

export const EdtSerialModule = 'EdtSerialModule';
