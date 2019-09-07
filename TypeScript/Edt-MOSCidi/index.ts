import { DeviceIPs, MOSCIDIPort, OSCInPort } from '../Shared/config';
import { isMidiMessage, isMidiNoteMessage } from '../Shared/helpers/midi';
import { convertToOSC } from '../Shared/helpers/utils';
import { IOSCMessage } from '../Shared/helpers/types';
import easymidi = require('easymidi');
import dgram = require('dgram');
import osc = require('osc-min');

console.log('MIDI devices', easymidi.getInputs());

const virtualInput = new easymidi.Input('EdtMIDI-Input', true);
const virtualOutput = new easymidi.Output('EdtMIDI-Output', true);

const hardwareInput = new easymidi.Input('Scarlett 2i4 USB');

dgram.createSocket('udp4', processOscMessage).bind(MOSCIDIPort);
const outSocket = dgram.createSocket('udp4');

hardwareInput.on('noteon', msg => {
    console.log('Getting Midi Hardware, sending it to OSC: ', msg);
    sendToOSC(DeviceIPs.edtSledt, OSCInPort, ['midi', 'note'], [msg.channel, msg.note, msg.velocity]);
});

hardwareInput.on('noteoff', msg => {
    console.log('Getting Midi hardware, sending it to OSC: ', msg);
    sendToOSC(DeviceIPs.edtSledt, OSCInPort, ['midi', 'note'], [msg.channel, msg.note, 0]);
});

virtualInput.on('noteon', msg => {
    console.log('Getting Midi, sending it to OSC: ', msg);
    sendToOSC(DeviceIPs.edtSledt, OSCInPort, ['midi', 'note'], [msg.channel, msg.note, msg.velocity]);
});

virtualInput.on('noteoff', msg => {
    console.log('Getting Midi, sending it to OSC: ', msg);
    sendToOSC(DeviceIPs.edtSledt, OSCInPort, ['midi', 'note'], [msg.channel, msg.note, 0]);
});

console.log('READY, Waiting for MIDI or OSC;');

function processOscMessage(msg) {
    try {
        const oscMessage = osc.fromBuffer(msg);
        if (oscMessage.oscType === 'message') {
            const addresses = oscMessage.address.split('/');
            const values = oscMessage.args.map(arg => arg.value);
            addresses.shift();

            const OSCMsg: IOSCMessage = {
                addresses,
                values,
            };
            if (addresses.length > 0) {
                if (isMidiMessage(OSCMsg) && isMidiNoteMessage(OSCMsg)) {
                    const MidiMsg = {
                        note: OSCMsg.values[1],
                        velocity: OSCMsg.values[2],
                        channel: OSCMsg.values[0] - 1,
                    };
                    if (MidiMsg.velocity > 0) {
                        virtualOutput.send('noteon', MidiMsg);
                    } else {
                        virtualOutput.send('noteoff', MidiMsg);
                    }
                    console.log('Sending MIDI:', MidiMsg);
                }
            }
        } else {
            console.error('Unsupported OSC format:', oscMessage);
        }
    } catch (error) {
        return console.error('Invalid OSC:', error);
    }
}

function sendToOSC(
    device: DeviceIPs,
    port: number,
    addresses: string[],
    params: number[] = [],
): void {
    const buf = osc.toBuffer(convertToOSC(addresses, params));
    return outSocket.send(buf, 0, buf.length, port, device);
}
