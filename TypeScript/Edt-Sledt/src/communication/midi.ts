import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { OSC$ } from './osc';
import { convertOSCToMIDICCMessage, convertOSCToMIDINoteMessage, convertOSCToMidiSongMessage, isMidiCCMessage, isMidiMessage, isMidiNoteMessage, isMidiSongMessage } from '../../../Shared/midi/midi';
import { automationChannel } from '../../config/config';
import { IMidiCCMsg, IMidiNoteMsg, IMidiSongMsg } from '../../../Shared/midi/types';

const midiOSC$ = OSC$.pipe(
    filter(isMidiMessage),
);

const noteOnOff$: Observable<IMidiNoteMsg> = midiOSC$.pipe(
    filter(isMidiNoteMessage),
    map(oscMidi => convertOSCToMIDINoteMessage(oscMidi, 1)),
);

const ccMessage$: Observable<IMidiCCMsg> = midiOSC$.pipe(
    filter(isMidiCCMessage),
    map(oscMidi => convertOSCToMIDICCMessage(oscMidi, 1)),
);

export const songSelectMessage$: Observable<IMidiSongMsg> = midiOSC$.pipe(
    filter(isMidiSongMessage),
    map(oscMidi => convertOSCToMidiSongMessage(oscMidi)),
);

export const midiNoteAutomation$ = noteOnOff$.pipe(
    filter(note => note.channel === automationChannel),
);

export const musicNoteOn$ = noteOnOff$.pipe(
    filter(({noteOn}) => noteOn),
    filter(({channel}) => channel !== automationChannel),
);

export const musicNoteOff$ = noteOnOff$.pipe(
    filter(({noteOn}) => !noteOn),
    filter(({channel}) => channel !== automationChannel),
);

export const midiCCAutomation$ = ccMessage$.pipe(
    filter(({channel}) => channel === automationChannel),
);
