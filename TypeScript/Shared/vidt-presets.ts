export enum vidtPresets {
    '____EMPTY____',
    'logo',
    'bluescreen',
    'color',
    'gridscape',
    'hacking',
    'photobouncer',
    'photoglitcher',
    'textBouncer',
    'shutdown',
    'video',
    'vista',
    'colorTwinkle',
    'karaoke',
}

export const vidtPresetsArr = Object.keys(vidtPresets)
    .filter(vp => isNaN(+vp))
    .filter(entry => entry !== '____EMPTY____');

export enum animationTypes {
    bounce = 'bounce',
    rotate = 'rotate',
    spin = 'spin',
    stretch = 'stretch',
}
