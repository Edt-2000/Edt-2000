import { Note } from './midi';
import { automationChannel, DrumNotes } from './config';
import { groupedControlPresetMsg, IControlPresetMsg, ModifierGroup } from './types';
import { DrumSounds } from './drums';

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
    midiChannels: [...Array(16)]
        .filter(channel => channel !== automationChannel)
        .map((_, nr) => ({
            label: `Channel: ${nr + 1}`,
            value: nr + 1,
        })),
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
    drumSounds: Object.keys(DrumSounds)
    // Filter out numeric entries of enum
        .filter(entry => isNaN(+entry))
        .filter(entry => entry !== '____EMPTY____')
        .map(sound => {
            return {
                label: sound,
                value: DrumSounds[sound],
            };
        }),
    glitchIntensity: [
        {label: 'low', value: 1},
        {label: 'medium', value: 3},
        {label: 'average', value: 5},
        {label: 'high', value: 7},
        {label: 'bezerk', value: 9},
    ],
};

export function converToNamedPresetGroup(presets: IControlPresetMsg[]): groupedControlPresetMsg[] {
    return Object.values(presets.reduce((grouped: any, preset) => {
        preset.config.group.forEach(group => {
            if (!grouped[group]) {
                grouped[group] = {
                    title: ModifierGroup[group],
                    presets: [],
                };
            }
            grouped[group].presets.push(preset);
        });
        return grouped;
    }, {}));
}

export function filterOnModifierGroup(
    presets: IControlPresetMsg[],
    modifierGroups: ModifierGroup[],
): IControlPresetMsg[] {
    return presets
        .filter(preset => {
            return preset.config.group.some(group => {
                return modifierGroups.some(modifierGroup => {
                    return modifierGroup === group;
                });
            });
        });
}
