import SerialPort = require('serialport');
import {Arduinos,} from '../../../Shared/config';
import {convertToOSC} from './osc';

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
}

export const EdtSerialModule = 'EdtSerialModule';
