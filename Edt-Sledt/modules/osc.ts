import {deviceIPs, oscPort} from '../../SharedTypes/config';

const osc = require('osc-min');
const dgram = require('dgram');
const udp = dgram.createSocket("udp4");

export function sendToOSC(adress: string, params: number[]): void {
    let buf;
    buf = osc.toBuffer({
        address: adress,
        args: params.map((param) => {
            return {
                type: 'integer',
                value: param
            }
        })
    });
    return udp.send(buf, 0, buf.length, oscPort, deviceIPs.tweedt);
}

// /TP/* 4 0 31 0 127 127