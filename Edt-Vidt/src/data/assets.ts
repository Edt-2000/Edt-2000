enum animation {
    bounce = 'bounce',
    rotate = 'rotate',
    spin = 'spin',
    stretch = 'stretch'
}

export interface IPhotoAsset {
    src: string;
    animation: string;
}

export const photoAssets: IPhotoAsset[] = [
    {
        src: 'barbie.jpg',
        animation: animation.spin
    },
    {
        src: 'barbiesex.jpg',
        animation: animation.rotate
    },
    {
        src: 'cabriolet.jpg',
        animation: animation.rotate
    },
    {
        src: 'doe-maar.jpg',
        animation: animation.rotate
    },
    {
        src: 'gigidagustino.jpg',
        animation: animation.bounce
    },
    {
        src: 'monkey.jpg',
        animation: animation.rotate
    },
    {
        src: 'nerd.jpg',
        animation: animation.rotate
    },
    {
        src: 'powerrangers.jpg',
        animation: animation.stretch
    },
    {
        src: 'strobocops.jpg',
        animation: animation.rotate
    },
    {
        src: 'zelda.jpg',
        animation: animation.rotate
    }
];


export interface IVideoAsset {
    src: string,
    glitch: boolean,
    effectOverlay: boolean
}

export const videoAssets: IVideoAsset[] = [
    {
        src: 'lights-of-orion.mp4',
        glitch: true,
        effectOverlay: true
    },
    {
        src: 'video-kat.mp4',
        glitch: true,
        effectOverlay: true
    }
];
