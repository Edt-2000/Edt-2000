import { Observable } from "rxjs/Observable";
import { IMidiNoteMsg } from "../../../Shared/types";
import { filter, map } from "rxjs/operators";
import { OSC$ } from "../communication/osc";
import { noteToNote, noteToOctave } from "../../../Shared/utils";

const midiOSC$ = OSC$.pipe(
    filter(OSCMsg =>
        OSCMsg.addresses.length === 2 &&
        !isNaN(+OSCMsg.addresses[0]) &&
        OSCMsg.addresses[1] === "note" &&
        OSCMsg.values.length === 2,
    ),
);

export const noteOnOff$: Observable<IMidiNoteMsg> = midiOSC$.pipe(
    map(OSCMsg => {
        return {
            note: +OSCMsg.values[0],
            noteOn: +OSCMsg.values[1] !== 0,
            noteNumber: noteToNote(+OSCMsg.values[0]),
            octave: noteToOctave(+OSCMsg.values[0]),
            velocity: +OSCMsg.values[1],
            channel: +OSCMsg.addresses[0],
        };
    }),
);

export const noteOn$: Observable<IMidiNoteMsg> = noteOnOff$.pipe(
    filter(OSCMsg => OSCMsg.noteOn),
);

export const noteOff$: Observable<IMidiNoteMsg> = noteOnOff$.pipe(
    filter(OSCMsg => !OSCMsg.noteOn),
);
