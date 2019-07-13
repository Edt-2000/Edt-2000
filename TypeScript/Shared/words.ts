export interface WordSet {
    name: string;
    set: string[];
}

export const wordSets: WordSet[] = [
    {
        name: 'BAND',
        set: [
            'STROBOCOPS',
            'EDT-2000',
        ],
    },
    {
        name: 'CABRIOLETTA',
        set: [...'CABRIO'.split(''), 'CABRIOLETTA'],
    },
    {
        name: 'ALLES GEJAT',
        set: [
            'ALLES',
            'GEJAT',
            'JATTEN',
            'DIEFJES',
            'GIGI',
            'ZELDA',
            'SHAKE IT',
        ],
    },
    {
        name: 'NEUKEN',
        set: [
            'MAN',
            'VROUW',
            'ALLEMAAL',
            'NEUKEN',
            'HARDER',
            'RAUWER',
            'GLADDER',
        ],
    },
    {
        name: 'LAST X',
        set: [
            'LAST CHRISTMAS',
            'I GAVE YOU MY HEARD',
            'BUT THE VERY NEXT DAY',
            'YOU GAVE IT AWAY',
            'THIS YEAR',
            'LALALALA',
            'SPECIAL',
        ],
    },
];
