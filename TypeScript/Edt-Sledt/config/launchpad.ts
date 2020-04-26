import { LaunchpadPage, LaunchpadTrigger } from '../../Shared/actions/types';
import { Actions, Actions$ } from '../../Shared/actions/actions';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VidtPresets } from '../../Shared/vidt-presets';
import { AnimationTypes } from '../../Shared/vidt/animation';
import { blackColor } from '../../Shared/colors/utils';
import { Colors } from './colors';
import { IColor } from '../../Shared/colors/types';

export const launchpadPages$: Observable<LaunchpadPage[]> = combineLatest([
    Actions$.vidtPresets,
    Actions$.colorPalettes,
    Actions$.colorPalette,
    Actions$.animationTypes,
]).pipe(
    map(([
             vidtPresets,
             colorPalettes,
             colorPalette,
             animationTypes,
         ]) => {
        return [
            toLaunchpadPage('Vidt', [
                vidtPresets.map(preset => {
                    return ['yellow', 'red', preset, Actions.prepareVidt(VidtPresets[preset])];
                }),
                [3, 6, 9].map(intensity => {
                    return ['green', 'red', intensity.toString(), Actions.glitchIntensity(intensity)];
                }),
                animationTypes.map(type => {
                    return ['amber', 'red', type, Actions.animationType(AnimationTypes[type])];
                }),
                [['red', 'green', 'BEAT', Actions.mainBeat(127)]],
            ]),
            toLaunchpadPage('Colors', [
                colorPalettes.map((palette, index) => {
                    return ['yellow', 'red', `Palette_${index}`, Actions.colorPalette(palette)];
                }),
                colorPalette.map((color, i) => {
                    return ['green', 'red', toColorReadable(color), Actions.singleColor(colorPalette[i]), Actions.singleColor(blackColor)];
                }),
                colorPalette.map((color, i) => {
                    return ['amber', 'red', toColorReadable(color), Actions.singleColor(colorPalette[i])];
                }),
            ]),
        ];
    }),
);

function toLaunchpadPage(title: string, rows: LaunchpadTrigger[][]): LaunchpadPage {
    return { title, triggers: rows.map(row => [...chunk(row, 8)]).flat() };
}

function chunk(arr, n) {
    return arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];
}

function toColorReadable({ h, s, b }: IColor): string {
    return `h:${h}\ns${s}\nb${b}`;
}
