export const words: string[] = [
    "STROBOCOPS",
    "DANCE",
    "YOLO",
    "MAN",
    "VROUW",
    "ALLEMAAL",
    "NEUKEN",
    "HARDER",
    "RAUWER",
    "GLADDER",
    "CABRIO",
    "CABRIOLETTA",
    "LAST CHRISTMAS",
    "I GAVE YOU MY HEARD",
    "SPECIAL",
    "CODEMONKEYS",
    "Harder dan jij",
    "GEJAT",
    "<<<<<<< HEAD conflict> >>>>>>> master",
    "Remind the gap",
    "SPIERDIJK!",
    "NOG EEN LIEDJE!",
    "SLAYER!",
    "LALALA",
];

export interface WordSet {
    name: string;
    set: string[];
}

export const wordSets: WordSet[] = [
    {
        name: "CABRIO",
        set: [..."CABRIO".split(""), "CABRIOLETTA"],
    },
    {
        name: "ALL",
        set: words,
    },
    {
        name: "MEETUP INTERACTIVE STORYTELLING",
        set: [
            "AMSTERDAM",
            "INTERACTIVE",
            "STORYTELLING",
            "MEETUP",
            "EDITIE",
            "25",
        ],
    },
];
