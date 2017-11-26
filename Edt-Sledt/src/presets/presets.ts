import {presetMsgChannel} from '../../../SharedTypes/config';
import {virtualOutput} from '../communication/midi';
import {manualPresets$} from '../inputs/edt-padt';
import {presetMidi$} from '../inputs/midi';
import {GlitchLogo} from './ambient/glitchLogo';
import {EdtLEDBeatToSpark} from './colors/edtLEDBeatToSpark';
import {EdtLEDColorFlash} from './colors/edtLEDColorFlash';
import {EdtVidtFollowColor} from './colors/edtVidtFollowColor';
import {BgColorCycle} from './drums/bgColorCycle';
import {DrumToBeat} from './drums/drumToBeat';
import {EdtLEDBeatToRainbow} from './colors/edtLEDBeatToRainbow';
import {MidiToColors} from './colors/midiToColors';
import {KittFuzzer} from './led-animations/kitt-fuzzer';

/**
 * An Edt-Preset is a `state` that can be active during a performance.
 * For example, when active it subscribes to MIDI or OSC messages and converts this into a
 */
export interface IEdtPreset {
    startPreset(velocity: number): void;
    stopPreset(): void;
}

export const edtPresets = new Map<number, IEdtPreset>();

/**
 * Edt Presets
 *
 * Maps to MIDI note numbers on channel `presetMsgChannel`
 *
 * Keep in mind a logical grouping of presets
 */

// Converters that take input and convert to 'subjects' like IColor etc
edtPresets.set(1, new BgColorCycle());
edtPresets.set(2, new DrumToBeat());

// Ambient effects
edtPresets.set(10, new GlitchLogo());

// Output controls that take 'subjects' or inputs and send this to an output device
edtPresets.set(11, new EdtLEDColorFlash());
edtPresets.set(12, new EdtVidtFollowColor());
edtPresets.set(13, new EdtLEDBeatToSpark());
edtPresets.set(14, new EdtLEDBeatToRainbow());
edtPresets.set(15, new MidiToColors());

// Animations etc
edtPresets.set(20, new KittFuzzer());

/**
 * Expose Preset Observable with combined midi and manual preset listeners
 * @type {Observable<IPresetMsg>}
 */
export const preset$ = manualPresets$
    .do((msg) => { // If manual, send out midi notes so we can record
        if (msg.state) {
            virtualOutput.send('noteon', {
                note: msg.preset,
                velocity: 127,
                channel: presetMsgChannel - 1,
            });
        } else {
            virtualOutput.send('noteoff', {
                note: msg.preset,
                velocity: 0,
                channel: presetMsgChannel - 1,
            });
        }
    })
    .merge(presetMidi$) // Also listen to midi preset changes
    .filter((msg) => edtPresets.has(msg.preset)) // Only filter the ones we have registered
    .do((msg) => console.log(`Setting preset ${msg.preset} ${msg.state ? 'on' : 'off'} with param ${msg.modifier}.`));
