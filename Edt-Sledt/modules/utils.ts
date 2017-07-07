"use strict";

/**
 * Convert a note number to octave
 * @param note
 * @return {number}
 */
export function noteToOctave(note: number): number {
    return Math.ceil(note / 12);
}

/**
 * Convert a note number to the note
 * @param note
 * @return {number}
 */
export function noteToNote(note: number): number {
    return (note % 12) + 1;
}