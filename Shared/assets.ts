export interface IPhotoAsset {
    name: string;
    src: string;
}

export const photoAssets: IPhotoAsset[] = [
    {
        name: 'Barbie',
        src: 'barbie.jpg'
    },
    {
        name: 'Barbiesex',
        src: 'barbiesex.jpg'
    },
    {
        name: 'Cabriolet',
        src: 'cabriolet.jpg'
    },
    {
        name: 'Doe maar',
        src: 'doe-maar.jpg'
    },
    {
        name: 'Gigi dagustino',
        src: 'gigidagustino.jpg'
    },
    {
        name: 'Monkey',
        src: 'monkey.jpg'
    },
    {
        name: 'Nerd',
        src: 'nerd.jpg'
    },
    {
        name: 'Powerrangers',
        src: 'powerrangers.jpg',
    },
    {
        name: 'Strobocops',
        src: 'strobocops.jpg'
    },
    {
        name: 'Zelda',
        src: 'zelda.jpg'
    }
];


export interface IVideoAsset {
    name: string,
    src: string,
    overlay: boolean;
}

export const videoAssets: IVideoAsset[] = [
    {
        name: 'Lights of Orion',
        src: 'lights-of-orion.mp4',
        overlay: true
    },
    {
        name: 'Mr. Nielson',
        src: 'video-kat.mp4',
        overlay: true
    }
];
