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
vidtPresets.set(12, '/color-twinkle');
vidtPresets.set(13, '/karaoke');

export enum animationTypes {
    bounce = 'bounce',
    rotate = 'rotate',
    spin = 'spin',
    stretch = 'stretch',
}
