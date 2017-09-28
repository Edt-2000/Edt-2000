import {GlitchLogo} from './ambient/glitchLogo';
import {BgColorCycle} from './drums/bgColorCycle';
import {EdtLEDFollowColor} from './colors/edtLEDFollowColor';
import {EdtVidtFollowColor} from './colors/edtVidtFollowColor';

/**
 * An Edt-Preset is a `state` that can be active during a performance.
 * For example, when active it subscribes to MIDI or OSC messages and converts this into a
 */
export interface edtPreset {
    startPreset(velocity: number): void,
    stopPreset(): void
}

export const edtPresets = new Map<number, edtPreset>();

/**
 * Edt Presets
 *
 * Maps to MIDI note numbers on channel `presetMsgChannel`
 *
 * Keep in mind a logical grouping of presets
 */

// Ambient effects
edtPresets.set(10, new GlitchLogo());

// Converters that take input and convert to 'subjects' like color etc
edtPresets.set(1, new BgColorCycle());

// Output controls that take 'subjects' or inputs and send this to an output device
edtPresets.set(11, new EdtLEDFollowColor());
edtPresets.set(12, new EdtVidtFollowColor());
