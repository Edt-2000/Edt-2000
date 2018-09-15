import {Observable} from 'rxjs/Observable';
import {DrumNotes, MidiChannels} from '../../../Shared/config';
import {IMidiNoteMsg} from '../../../Shared/types';
import {noteOff$, noteOn$} from './midi';
import {filter, map, merge} from 'rxjs/operators';

export const drumTriggerOnOff$: Observable<IMidiNoteMsg> = noteOn$
    .pipe(
        merge(noteOff$),
        filter((msg) => msg.channel === MidiChannels.channel_10 && msg.note in DrumNotes),
    );

export const drumTriggerOn$: Observable<DrumNotes> = drumTriggerOnOff$
    .pipe(
        filter((msg) => msg.noteOn),
        map((msg) => DrumNotes[DrumNotes[msg.note]])
    );

export const drumTriggerOff$: Observable<DrumNotes> = drumTriggerOnOff$
    .pipe(
        filter((msg) => !msg.noteOn),
        map((msg) => DrumNotes[DrumNotes[msg.note]])
    );
