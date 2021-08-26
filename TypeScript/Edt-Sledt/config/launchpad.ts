import { LaunchpadColor, LaunchpadPage, LaunchpadTrigger, TriggerType } from '../../Shared/actions/types';
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
                vidtPresets.map(preset => ({
                    color: LaunchpadColor.yellow,
                    title: preset,
                    triggerType: TriggerType.text,
                    triggerAction: Actions.prepareVidt(VidtPresets[preset]),
                })),
                [3, 6, 9].map(intensity => ({
                    color: LaunchpadColor.green,
                    title: intensity.toString(),
                    triggerType: TriggerType.text,
                    triggerAction: Actions.glitchIntensity(intensity),
                })),
                animationTypes.map(type => ({
                    color: LaunchpadColor.amber,
                    title: type,
                    triggerType: TriggerType.text,
                    triggerAction: Actions.animationType(AnimationTypes[type]),
                })),
                [{
                    color: LaunchpadColor.red,
                    title: 'BEAT',
                    triggerType: TriggerType.text,
                    triggerAction: Actions.mainBeat(127),
                }],
                contentGroup.images.map(image => ({
                    color: LaunchpadColor.amber,
                    title: image,
                    triggerType: TriggerType.image,
                    triggerAction: Actions.imageSrc(image),
                })),
            ]),
            toLaunchpadPage('Colors', [
                colorPalettes.map((palette, index) => ({
                    color: LaunchpadColor.yellow,
                    title: `Palette_${index}`,
                    triggerType: TriggerType.text,
                    triggerAction: Actions.colorPalette(palette),
                })),
                colorPalette.map((color, i) => ({
                    color: LaunchpadColor.green,
                    title: toColorReadable(color),
                    triggerType: TriggerType.color,
                    triggerAction: Actions.singleColor(colorPalette[i]),
                    releaseAction: Actions.singleColor(blackColor),
                })),
                colorPalette.map((color, i) => ({
                    color: LaunchpadColor.amber,
                    title: toColorReadable(color),
                    triggerType: TriggerType.color,
                    triggerAction: Actions.singleColor(colorPalette[i]),
                })),
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
