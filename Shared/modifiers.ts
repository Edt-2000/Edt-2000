// TODO: move to own file
import {Note} from "./midi";
import {DrumNotes, MidiChannels} from "./config";
import {DrumSounds} from "./drums";

export const modifiers = {
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
    midiChannels: [
        {label: MidiChannels[MidiChannels.channel_1], value: MidiChannels.channel_1},
        {label: MidiChannels[MidiChannels.channel_2], value: MidiChannels.channel_2},
        {label: MidiChannels[MidiChannels.channel_3], value: MidiChannels.channel_3},
        {label: MidiChannels[MidiChannels.channel_4], value: MidiChannels.channel_4},
        {label: MidiChannels[MidiChannels.channel_5], value: MidiChannels.channel_5},
        {label: MidiChannels[MidiChannels.channel_10], value: MidiChannels.channel_10},
    ],
    drumNotes: [
        {label: `_1 - ${Note[DrumNotes._1]}`, value: DrumNotes._1},
        {label: `_2 - ${Note[DrumNotes._2]}`, value: DrumNotes._2},
        {label: `_3 - ${Note[DrumNotes._3]}`, value: DrumNotes._3},
        {label: `_4 - ${Note[DrumNotes._4]}`, value: DrumNotes._4},
        {label: `_5 - ${Note[DrumNotes._5]}`, value: DrumNotes._5},
        {label: `_6A - ${Note[DrumNotes._6A]}`, value: DrumNotes._6A},
        {label: `_6B - ${Note[DrumNotes._6B]}`, value: DrumNotes._6B},
        {label: `_7A - ${Note[DrumNotes._7A]}`, value: DrumNotes._7A},
        {label: `_7B - ${Note[DrumNotes._7B]}`, value: DrumNotes._7B},
    ],
    drumSounds: [
        {label: 'kick', value: DrumSounds.kick},
        {label: 'snare', value: DrumSounds.snare},
    ]
};
