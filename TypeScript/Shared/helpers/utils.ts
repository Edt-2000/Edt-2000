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

export function enumToArray(e: object) {
    return Object.keys(e)
        .filter(vp => isNaN(+vp))
        .filter(entry => entry !== '____EMPTY____');
}

export function convertToOSC(addresses: string[], params: number[]) {
    // TODO: remove 0 -> ? conversion and implement 0 in all receivers
    const thomasAddress = '/' + addresses.join('/').replace('0', '?');

    return {
        address: thomasAddress,
        args: params.map(param => {
            return {
                type: 'integer',
                value: param,
            };
        }),
    };
}
