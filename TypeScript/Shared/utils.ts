'use strict';

export function noteToOctave(note: number): number {
    return Math.floor(note / 12);
}

export function noteToNote(note: number): number {
    return (note % 12) + 1;
}

export function rescale(
    value: number,
    max: number,
    minRange: number,
    maxRange: number,
) {
    return Math.round(((max - value) / max) * (maxRange - minRange)) + minRange;
}

export function shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array.map(item => item);
}
