import { LaunchpadPage } from '../../Shared/actions/types';
import { Actions, Actions$ } from '../../Shared/actions/actions';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VidtPresets } from '../../Shared/vidt-presets';
import { AnimationTypes } from '../../Shared/vidt/animation';
import { blackColor } from '../../Shared/colors/utils';

export const launchpadPage$: Observable<LaunchpadPage> = combineLatest([
    Actions$.launchpadPageNr,
    Actions$.vidtPresets,
    Actions$.colorPalette,
    Actions$.animationTypes,
    Actions$.contentGroup,
]).pipe(
    // TODO: Typing of this one is not completely checked for some reason
    map(([pageNr, vidtPresets, colorPalette, animationTypes, contentGroup]) => ({
            triggers: [
                vidtPresets.map(preset => {
                    return ['yellow', 'amber', preset, Actions.prepareVidt(VidtPresets[preset])];
                }),
                animationTypes.map(type => {
                    return ['red', 'amber', type, Actions.animationType(AnimationTypes[type])];
                }),
                colorPalette.map((color, i) => {
                    return ['green', 'amber', color, Actions.singleColor(colorPalette[i]), Actions.singleColor(blackColor)];
                }),
                colorPalette.map((color, i) => {
                    return ['yellow', 'amber', color, Actions.singleColor(colorPalette[i])];
                }),
            ].map(row => [...chunk(row, 9)]).flat(),
        }),
    ),
);

function chunk(arr, n) {
    return arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];
}
