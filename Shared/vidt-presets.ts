export const vidtPresets: Map<number, string> = new Map();

vidtPresets.set(1, '/logo');
vidtPresets.set(2, '/bluescreen');
vidtPresets.set(3, '/color');
vidtPresets.set(4, '/gridscape');
vidtPresets.set(5, '/hacking');
vidtPresets.set(6, '/photobouncer');
vidtPresets.set(7, '/photoglitcher');
vidtPresets.set(8, '/text-bouncer');
vidtPresets.set(9, '/shutdown');
vidtPresets.set(10, '/video');
vidtPresets.set(11, '/vista');

export enum animationTypes {
    bounce,
    rotate,
    spin,
    stretch,
}
