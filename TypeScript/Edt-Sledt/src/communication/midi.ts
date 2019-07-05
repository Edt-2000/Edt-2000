import { Observable } from 'rxjs/Observable';
import { IMidiNoteMsg } from '../../../Shared/types';
import { filter, map } from 'rxjs/operators';
import { OSC$ } from './osc';
import { noteToNote, noteToOctave } from '../../../Shared/utils';
import { automationChannel } from '../../../Shared/config';

const midiOSC$ = OSC$.pipe(
    filter(OSCMsg =>
        OSCMsg.addresses.length === 2 &&
        OSCMsg.addresses[0] === 'midi' &&
        OSCMsg.values.length === 3,
    ),
);

const noteOnOff$: Observable<IMidiNoteMsg> = midiOSC$.pipe(
    filter(OSCMsg => OSCMsg.addresses[1] === 'note'),
    map(OSCMsg => {
        return {
            note: +OSCMsg.values[1],
            noteOn: +OSCMsg.values[2] !== 0,
            noteNumber: noteToNote(+OSCMsg.values[1]),
            octave: noteToOctave(+OSCMsg.values[1]),
            velocity: +OSCMsg.values[2],
            channel: +OSCMsg.values[0] + 1,
        };
    }),
);

export const automationNoteOnOff$ = noteOnOff$.pipe(
    filter(note => note.channel === automationChannel),
);

export const musicNoteOn$ = noteOnOff$.pipe(
    filter(OSCMsg => OSCMsg.noteOn),
    filter(note => note.channel !== automationChannel),
);

export const musicNoteOff$ = noteOnOff$.pipe(
    filter(OSCMsg => !OSCMsg.noteOn),
    filter(note => note.channel !== automationChannel),
);
