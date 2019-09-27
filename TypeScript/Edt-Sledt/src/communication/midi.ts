import { Observable } from 'rxjs/Observable';
import { IMidiNoteMsg } from '../../../Shared/helpers/types';
import { filter, map, tap } from 'rxjs/operators';
import { OSC$ } from './osc';
import { noteToNote, noteToOctave } from '../../../Shared/helpers/utils';
import { automationChannel } from '../../../Shared/config';
import { isMidiMessage, isMidiNoteMessage } from '../../../Shared/helpers/midi';
import { merge } from 'rxjs';
import { loopbackOSCMidi$ } from '../outputs/edt-midi';

const midiOSC$ = merge(
    OSC$,
    loopbackOSCMidi$.pipe(tap(log => console.log('loopback:', log))),
).pipe(
    filter(isMidiMessage),
);

const noteOnOff$: Observable<IMidiNoteMsg> = midiOSC$.pipe(
    filter(isMidiNoteMessage),
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
