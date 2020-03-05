import { LaunchpadPage } from '../../Shared/actions/types';
import { Actions } from '../../Shared/actions/actions';
import { enumToArray } from '../../Shared/utils/utils';
import { VidtPresets } from '../../Shared/vidt-presets';
import { AnimationTypes } from '../../Shared/vidt/animation';

export const launchpadConfig: LaunchpadPage[] = [
    {
        pageNumber: 1,
        pageAmount: 1,
        triggers: [
            ...chunk(enumToArray(VidtPresets).map(preset => {
                return ['yellow', 'amber', preset, Actions.prepareVidt(VidtPresets[preset]), Actions.prepareVidt(VidtPresets.logo)];
            }), 8),
            ...chunk(enumToArray(AnimationTypes).map(type => {
                return ['red', 'amber', type, Actions.animationType(AnimationTypes[type])];
            }), 8),
        ],
    },
];

function chunk(arr, n) {
    return arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];
}
