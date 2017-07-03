/**
 * Midi CC Messages from easymidi
 */
export interface midiCCMsg {
    controller: number,
    value: number,
    channel: number
}

/**
 * Edt Preset MIDI CC number mapping
 */
export enum edtPresets {
    EdtVidt = 20,
    EdtTOP = 21
}