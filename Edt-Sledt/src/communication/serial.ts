import SerialPort = require('serialport');
import {
    Arduinos,
    DeviceIPs,
    OSCDevices,
} from '../../../Shared/config';
import {
    convertToOSC,
    OSC$,
    sendToOSC,
} from './osc';
import {
    filter,
    map,
} from 'rxjs/operators';

const serialports: SerialPort[] = Arduinos.map(portName => {
    return new SerialPort(portName, { baudRate: 57600 });
});

serialports.forEach(port => port.on('error', function(err) {
    console.log('Serial error: ', err.message);
}));

export function sendToSerial(device: string, strip: number | '?', params: number[] = []): void  {
    const msg = convertToOSC([device, strip.toString()], params);

    // console.log('msg', device, strip.toString(), ...params);
    serialports.forEach(port => {
        port.write(msg);
    });

    // TEMPORARY ALSO SEND TO DMX WHEN RGBLED
    if(device === OSCDevices.EdtRGBLed) {
        sendToOSC(DeviceIPs.edtRemoteDMX, ['R', '?'], params);
    }
}

/**
 * OSC - SERIAL BRIDGE
 * @type {string}
 */

OSC$.pipe(
    filter(OSCMsg => OSCMsg.addresses.indexOf('R?') !== -1),
    map((OSCMsg) => {
        sendToSerial(OSCDevices.EdtRGBLed, '?', OSCMsg.values);
    }),
).subscribe();

OSC$.pipe(
    filter(OSCMsg => OSCMsg.addresses.indexOf('F?') !== -1),
    map((OSCMsg) => {
        sendToSerial(OSCDevices.EdtFastLed, '?', OSCMsg.values);
    }),
).subscribe();

export const EdtSerialModule = 'EdtSerialModule';
