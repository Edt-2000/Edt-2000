import { Note } from '../../Shared/midi/midi';
import { enumToArray } from '../../Shared/utils/utils';
import { automationChannel, ColorVariations, DrumNotes, DrumSounds } from './config';

export const modifiers = {
    colorVariation: [
        {label: 'normal', value: ColorVariations.normal},
        {label: 'inverse', value: ColorVariations.inverse},
    ],
    strobeSpeeds: [
        {label: 'slow', value: 10},
        {label: 'medium', value: 25},
        {label: 'fast', value: 40},
        {label: 'faster', value: 55},
    ],
    fadeSpeeds: [
        {label: 'fast', value: 150},
        {label: 'medium', value: 80},
        {label: 'slow', value: 30},
        {label: 'more slow', value: 10},
    ],
    midiChannels: [...Array(16)]
        .filter(channel => channel !== automationChannel)
        .map((_, nr) => ({
            label: `Channel: ${nr + 1}`,
            value: nr + 1,
        })),
    guitarNotes: enumToArray(Note)
        .map(note => ({
            value: +Note[note],
            label: `${note} - ${Note[Note[note]]}`,
        })),
    drumNotes: enumToArray(DrumNotes)
        .map(drumNote => ({
            value: +DrumNotes[drumNote],
            label: `${drumNote} - ${Note[DrumNotes[drumNote]]}`,
        })),
    drumSounds: enumToArray(DrumSounds)
        .map(sound => ({
            value: +DrumSounds[sound],
            label: sound,
        })),
};

