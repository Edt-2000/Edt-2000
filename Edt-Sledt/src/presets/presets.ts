import {GlitchLogo} from './ambient/glitchLogo';
import {BgColorCycle} from './converters/bgColorCycle';

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
edtPresets.set(0, new GlitchLogo());

// Converters that take input and
edtPresets.set(10, new BgColorCycle());
