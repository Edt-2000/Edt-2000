import { OSC$ } from './osc';
import { convertOSCToMIDICCMessage, convertOSCToMIDINoteMessage, convertOSCToMidiSongMessage, isMidiCCMessage, isMidiMessage, isMidiNoteMessage, isMidiSongMessage } from '../../../Shared/midi/midi';
import { automationChannel } from '../../config/config';
import { IMidiCCMsg, IMidiNoteMsg, IMidiSongMsg } from '../../../Shared/midi/types';
import { filter, map, Observable } from 'rxjs';

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

export const midiNoteAutomation$: Observable<IMidiNoteMsg> = noteOnOff$.pipe(
    filter<IMidiNoteMsg>(note => note.channel === automationChannel),
);

export const musicNoteOn$: Observable<IMidiNoteMsg> = noteOnOff$.pipe(
    filter<IMidiNoteMsg>(({noteOn}) => noteOn),
    filter<IMidiNoteMsg>(({channel}) => channel !== automationChannel),
);

export const musicNoteOff$: Observable<IMidiNoteMsg> = noteOnOff$.pipe(
    filter<IMidiNoteMsg>(({noteOn}) => !noteOn),
    filter<IMidiNoteMsg>(({channel}) => channel !== automationChannel),
);

export const midiCCAutomation$: Observable<IMidiCCMsg> = ccMessage$.pipe(
    filter<IMidiCCMsg>(({channel}) => channel === automationChannel),
);
