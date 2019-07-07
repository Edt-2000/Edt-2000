export enum vidtPresets {
    'EMPTYFIRSTVALUE',
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

export const vidtPresetsArr = Object.keys(vidtPresets).filter(vp => isNaN(+vp));

export enum animationTypes {
    bounce = 'bounce',
    rotate = 'rotate',
    spin = 'spin',
    stretch = 'stretch',
}
