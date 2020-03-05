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
    Actions$.colorPalettes,
    Actions$.colorPalette,
    Actions$.animationTypes,
]).pipe(
    // TODO: Typing of this one is not completely checked for some reason
    map(([
             pageNr,
             vidtPresets,
             colorPalettes,
             colorPalette,
             animationTypes,
         ]) => {
        if (pageNr === 1) {
            return [
                vidtPresets.map(preset => {
                    return ['yellow', 'red', preset, Actions.prepareVidt(VidtPresets[preset])];
                }),
                [3, 6, 9].map(intensity => {
                    return ['green', 'red', intensity, Actions.glitchIntensity(intensity)];
                }),
                animationTypes.map(type => {
                    return ['amber', 'red', type, Actions.animationType(AnimationTypes[type])];
                }),
                [['red', 'green', 'BEAT', Actions.mainBeat(127)]],
            ];
        } else {
            return [
                colorPalettes.map(palette => {
                    return ['yellow', 'red', palette, Actions.colorPalette(palette)];
                }),
                colorPalette.map((color, i) => {
                    return ['green', 'red', color.toString(), Actions.singleColor(colorPalette[i]), Actions.singleColor(blackColor)];
                }),
                colorPalette.map((color, i) => {
                    return ['amber', 'red', color.toString(), Actions.singleColor(colorPalette[i])];
                }),
            ];
        }
    }),
    // @ts-ignore:next-line
    map(rows => ({ triggers: rows.map(row => [...chunk(row, 9)]).flat() })),
);

function chunk(arr, n) {
    return arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];
}
