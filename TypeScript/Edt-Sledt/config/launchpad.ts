import { LaunchpadPage } from '../../Shared/actions/types';
import { Actions } from '../../Shared/actions/actions';
import { enumToArray } from '../../Shared/utils/utils';
import { VidtPresets } from '../../Shared/vidt-presets';
import { AnimationTypes } from '../../Shared/vidt/animation';

export const launchpadConfig: LaunchpadPage[] = [
    {
        pageNumber: 0,
        triggers: [
            enumToArray(VidtPresets).map(preset => {
                return ['yellow', 'amber', preset, Actions.prepareVidt(VidtPresets[preset])];
            }),
            enumToArray(AnimationTypes).map(type => {
                return ['red', 'amber', type, Actions.animationType(AnimationTypes[type])];
            }),
        ],
    },
];
