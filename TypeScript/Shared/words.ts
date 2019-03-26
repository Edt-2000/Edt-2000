export const words: string[] = [
    'STROBOCOPS',
    'DANCE',
    'YOLO',
    'MAN',
    'VROUW',
    'ALLEMAAL',
    'NEUKEN',
    'HARDER',
    'RAUWER',
    'GLADDER',
    'CABRIO',
    'CABRIOLETTA',
    'LAST CHRISTMAS',
    'I GAVE YOU MY HEART',
    'SPECIAL',
    'CODEMONKEYS',
    'Harder dan jij',
    'GEJAT',
    '<<<<<<< HEAD conflict> >>>>>>> master',
    'Remind the gap',
    'SPIERDIJK!',
    'NOG EEN LIEDJE!',
    'SLAYER!',
    'LALALA',
];

export interface WordSet {
    name: string;
    set: string[];
}

export const wordSets: WordSet[] = [
    {
        name: 'CABRIO',
        set: [...'CABRIO'.split(''), 'CABRIOLETTA'],
    },
];
