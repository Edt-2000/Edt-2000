import { convertOSCToMIDICCMessage, convertOSCToMIDINoteMessage, isMidiCCMessage, isMidiMessage, isMidiNoteMessage } from '../Shared/midi/midi';
import { convertToOSC } from '../Shared/utils/utils';
import { IOSCMessage } from '../Shared/osc/types';

import dgram = require('dgram');
import osc = require('osc-min');

import easymidi = require('easymidi');

const virtualInput = new easymidi.Input('EdtMIDI-Input', true);
const virtualOutput = new easymidi.Output('EdtMIDI-Output', true);

// const iControl = new easymidi.Input('Origin25');

// Extract the IP, OSC Midi in and Sledt OSC port
const [, , edtSledtIP, MOSCIDIPort, OSCInPort] = process.argv;

dgram.createSocket('udp4', processOscMessage).bind(+MOSCIDIPort);
const outSocket = dgram.createSocket('udp4');

virtualInput.on('noteon', handleNote('virtual', true));
virtualInput.on('noteoff', handleNote('virtual', false));
virtualInput.on('cc', handleCC('virtual'));
virtualInput.on('select', handleSongSelect('virtual'));

// iControl.on('noteon', handleNote('icontrol', true));
// iControl.on('noteoff', handleNote('icontrol', false));
// iControl.on('cc', handleCC('icontrol'));

console.log('READY, Waiting for MIDI or OSC;');

function handleSongSelect(name: string) {
    return ({ song }) => {
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
                        // @ts-ignore
                        virtualOutput.send('noteon', MidiMsg);
                    } else {
                        // @ts-ignore
                        virtualOutput.send('noteoff', MidiMsg);
                    }
                    console.log('Sending MIDI:', MidiMsg);
                }

                if (isMidiMessage(OSCMsg) && isMidiCCMessage(OSCMsg)) {
                    const MidiCCMsg = convertOSCToMIDICCMessage(OSCMsg, -1);
                    // @ts-ignore
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
    device: string,
    port: string,
    addresses: string[],
    values: number[] = [],
): void {
    console.log('Sending OSC:', addresses, values);
    const buf = osc.toBuffer(convertToOSC({ addresses, values }));
    return outSocket.send(buf, 0, buf.length, +port, device);
}
