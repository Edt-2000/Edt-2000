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
 * @param minRange
 * @param maxRange
 * @return {number}
 */
export function rescale(value: number, max: number, minRange: number, maxRange: number) {
    return Math.round(((max - value) / (max)) * (maxRange - minRange)) + minRange;
}
