import { LaunchpadPage, LaunchpadTrigger, TriggerType } from '../../Shared/actions/types';
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
    Actions$.contentGroup,
]).pipe(
    map(([
             vidtPresets,
             colorPalettes,
             colorPalette,
             animationTypes,
             contentGroup,
         ]) => {
        return [
            toLaunchpadPage('Vidt', [
                vidtPresets.map(preset => {
                    return ['yellow', 'red', preset, TriggerType.text, Actions.prepareVidt(VidtPresets[preset])];
                }),
                [3, 6, 9].map(intensity => {
                    return ['green', 'red', intensity.toString(), TriggerType.text, Actions.glitchIntensity(intensity)];
                }),
                animationTypes.map(type => {
                    return ['amber', 'red', type, TriggerType.text, Actions.animationType(AnimationTypes[type])];
                }),
                [['red', 'green', 'BEAT', TriggerType.text, Actions.mainBeat(127)]],
                contentGroup.images.map(image => {
                    return ['amber', 'red', image, TriggerType.image, Actions.imageSrc(image)];
                }),
            ]),
            toLaunchpadPage('Colors', [
                colorPalettes.map((palette, index) => {
                    return ['yellow', 'red', `Palette_${index}`, TriggerType.text, Actions.colorPalette(palette)];
                }),
                colorPalette.map((color, i) => {
                    return ['green', 'red', toColorReadable(color), TriggerType.color, Actions.singleColor(colorPalette[i]), Actions.singleColor(blackColor)];
                }),
                colorPalette.map((color, i) => {
                    return ['amber', 'red', toColorReadable(color), TriggerType.color, Actions.singleColor(colorPalette[i])];
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
