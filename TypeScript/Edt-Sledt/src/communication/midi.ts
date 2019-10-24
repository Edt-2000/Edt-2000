import { Observable } from 'rxjs/Observable';
import { IMidiCCMsg, IMidiNoteMsg } from '../../../Shared/helpers/types';
import { filter, map } from 'rxjs/operators';
import { OSC$ } from './osc';
import { automationChannel } from '../../../Shared/config';
import { convertOSCToMIDICCMessage, convertOSCToMIDINoteMessage, isMidiCCMessage, isMidiMessage, isMidiNoteMessage } from '../../../Shared/helpers/midi';

const midiOSC$ = OSC$.pipe(
    filter(isMidiMessage),
);

const noteOnOff$: Observable<IMidiNoteMsg> = midiOSC$.pipe(
    filter(isMidiNoteMessage),
    map(convertOSCToMIDINoteMessage),
);

const ccMessage$: Observable<IMidiCCMsg> = midiOSC$.pipe(
    filter(isMidiCCMessage),
    map(convertOSCToMIDICCMessage),
);

export const midiPresetChange$ = noteOnOff$.pipe(
    filter(note => note.channel === automationChannel),
    map(({note, noteOn, velocity}) => ({
        preset: note,
        modifier: velocity,
        state: noteOn,
    })),
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
