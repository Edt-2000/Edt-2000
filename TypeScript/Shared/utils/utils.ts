import { IOSCMessage } from '../osc/types';

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

export function shuffleArray(inputArray: any[]): any[] {
    const array = [...inputArray];
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function enumToArray(e: object) {
    return Object.keys(e)
        .filter(entry => entry !== '____EMPTY____')
        .filter(vp => isNaN(+vp));
}

export function convertToOSC(msg: IOSCMessage) {
    // TODO: remove 0 -> ? conversion and implement 0 in all receivers
    const thomasAddress = '/' + msg.addresses.join('/').replace('0', '?');

    return {
        address: thomasAddress,
        args: msg.values.map(param => {
            return {
                type: 'integer',
                value: param,
            };
        }),
    };
}
