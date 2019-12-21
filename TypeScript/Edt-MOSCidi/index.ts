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

const edtSledtIP = 'localhost' as DeviceIPs;
// const edtSledtIP = '192.168.2.67'; // Will have delay!

dgram.createSocket('udp4', processOscMessage).bind(MOSCIDIPort);
const outSocket = dgram.createSocket('udp4');

virtualInput.on('noteon', handleNote('virtual', true));
virtualInput.on('noteoff', handleNote('virtual', false));
virtualInput.on('cc', handleCC('virtual'));
virtualInput.on('select', handleSongSelect('virtual'));

hardwareInputs.forEach(inputName => {
    console.log('Connecting to MIDI device: ', inputName);
    try {
        const hardwareInput = new easymidi.Input(inputName);

        hardwareInput.on('noteon', handleNote(inputName, true));
        hardwareInput.on('noteoff', handleNote(inputName, false));
        hardwareInput.on('cc', handleCC(inputName));
        hardwareInput.on('select', handleSongSelect(inputName));

    } catch (e) {
        console.log('Failure to connect to ' + inputName);
    }
});

console.log('READY, Waiting for MIDI or OSC;');

function handleSongSelect(name: string) {
    return ({song}) => {
        console.info(`MIDI select from ${name}`, song);
        sendToOSC(edtSledtIP, OSCInPort, ['midi', 'select'], [song]);
    };
}

function handleNote(name, isNoteOn: boolean) {
    return msg => {
        console.info(`MIDI from ${name}`, msg);
        sendToOSC(edtSledtIP, OSCInPort, ['midi', 'note'], [msg.channel, msg.note, isNoteOn ? msg.velocity : 0]);
    };
}

function handleCC(name) {
    return msg => {
        console.info(`MIDI CC from ${name}`, msg);
        sendToOSC(edtSledtIP, OSCInPort, ['midi', 'cc'], [msg.channel, msg.controller, msg.value]);
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
    console.log('Sending OSC:', addresses, values);
    const buf = osc.toBuffer(convertToOSC({addresses, values}));
    return outSocket.send(buf, 0, buf.length, port, device);
}
