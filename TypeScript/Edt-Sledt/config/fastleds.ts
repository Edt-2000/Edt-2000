export const backdropLeds = generateRange(0, 7);
export const frontLeftLeds = generateRange(8, 11);
export const frontRightLeds = generateRange(12, 15);

function generateRange(from: number, to: number) {
    if (from > to) { throw Error('FROM SHOULD BE SMALLER THAN TO'); }
    if (from < 0) { throw Error('FROM SHOULD BE POSITIVE'); }

    const length = to - from;
    return [...Array(length).map(n => n + from).keys()];
}
