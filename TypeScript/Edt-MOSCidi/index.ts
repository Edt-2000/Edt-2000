import { DeviceIPs, MOSCIDIPort, OSCInPort } from '../Shared/config';
import { convertOSCToMIDICCMessage, convertOSCToMIDINoteMessage, isMidiCCMessage, isMidiMessage, isMidiNoteMessage } from '../Shared/helpers/midi';
import { convertToOSC } from '../Shared/helpers/utils';
import { IOSCMessage } from '../Shared/helpers/types';
import easymidi = require('easymidi');
import dgram = require('dgram');
import osc = require('osc-min');

const hardwareInputs = easymidi.getInputs();
const virtualInput = new easymidi.Input('EdtMIDI-Input', true);
const virtualOutput = new easymidi.Output('EdtMIDI-Output', true);

dgram.createSocket('udp4', processOscMessage).bind(MOSCIDIPort);
const outSocket = dgram.createSocket('udp4');

virtualInput.on('noteon', handleNote('virtual'));
virtualInput.on('noteoff', handleNote('virtual'));
virtualInput.on('cc', handleCC('virtual'));

hardwareInputs.forEach(inputName => {
    console.log('Connecting to MIDI device: ', inputName);
    try {
        const hardwareInput = new easymidi.Input(inputName);

        hardwareInput.on('noteon', handleNote(inputName));
        hardwareInput.on('noteoff', handleNote(inputName));
        hardwareInput.on('cc', handleCC(inputName));

    } catch (e) {
        console.log('Failure to connect to ' + inputName);
    }
});

console.log('READY, Waiting for MIDI or OSC;');

function handleNote(name) {
    return msg => {
        console.info(`MIDI from ${name}`, msg);
        return sendToOSC(DeviceIPs.edtSledt, OSCInPort, ['midi', 'note'], [msg.channel, msg.note, msg.velocity]);
    };
}

function handleCC(name) {
    return msg => {
        console.info(`MIDI CC from ${name}`, msg);
        return sendToOSC(DeviceIPs.edtSledt, OSCInPort, ['midi', 'cc'], [msg.channel, msg.controller, msg.value]);
    };
}

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
                    const MidiMsg = convertOSCToMIDINoteMessage(OSCMsg, -1);
                    if (MidiMsg.velocity > 0) {
                        virtualOutput.send('noteon', MidiMsg);
                    } else {
                        virtualOutput.send('noteoff', MidiMsg);
                    }
                    console.log('Sending MIDI:', MidiMsg);
                }

                if (isMidiMessage(OSCMsg) && isMidiCCMessage(OSCMsg)) {
                    const MidiCCMsg = convertOSCToMIDICCMessage(OSCMsg, -1);
                    virtualOutput.send('cc', MidiCCMsg);

                    console.log('Sending MIDI CC:', MidiCCMsg);
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
    values: number[] = [],
): void {
    const buf = osc.toBuffer(convertToOSC({addresses, values}));
    return outSocket.send(buf, 0, buf.length, port, device);
}
