'use strict';

/**
 * Convert a note number to octave
 * @param note
 * @return {number}
 */
export function noteToOctave(note: number): number {
    return Math.floor(note / 12);
}

/**
 * Convert a note number to the note
 * @param note
 * @return {number}
 */
export function noteToNote(note: number): number {
    return (note % 12) + 1;
}

/**
 * Rescale a range
 * @param value
 * @param max
 * @param min_range
 * @param max_range
 * @return {number}
 */
export function rescale(value: number, max: number, min_range: number, max_range: number) {
    return Math.round(((max - value) / (max)) * (max_range - min_range)) + min_range;
}
