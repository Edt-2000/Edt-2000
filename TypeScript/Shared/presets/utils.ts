import { GroupedControlPresetMsg, IControlPresetMsg, ModifierGroup } from '../actions/types';

export function convertToNamedPresetGroup(presets: IControlPresetMsg[]): GroupedControlPresetMsg[] {
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
