import {
    LaunchpadColor,
    LaunchpadPage,
    LaunchpadTrigger,
    TriggerType,
} from '../../Shared/actions/types';
import { Actions, Actions$ } from '../../Shared/actions/actions';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VidtPresets } from '../../Shared/vidt-presets';
import { AnimationTypes } from '../../Shared/vidt/animation';
import { blackColor } from '../../Shared/colors/utils';
import { Colors } from './colors';
import { IColor } from '../../Shared/colors/types';
import { Shapes } from '../../Shared/vidt/shapes';
import { Sizes } from '../../Shared/vidt/sizes';

export const launchpadPages$: Observable<LaunchpadPage[]> = combineLatest([
    combineLatest([
        Actions$.vidtPresets,
        Actions$.colorPalettes,
        Actions$.colorPalette,
        Actions$.shapes,
        Actions$.sizes,
        Actions$.animationTypes ]),
    combineLatest([
        Actions$.contentGroup,
    ]) ]).pipe(
    map(([
             [ vidtPresets,
                 colorPalettes,
                 colorPalette,
                 shapes,
                 sizes,
                 animationTypes ],
             [ contentGroup ],
         ]) => {
        return [
            toLaunchpadPage('Vidt', [
                vidtPresets.map(preset => ({
                    color: LaunchpadColor.yellow,
                    title: preset,
                    triggerType: TriggerType.text,
                    triggerAction: Actions.prepareVidt(VidtPresets[preset]),
                })),
                [
                    ...shapes.map(shape => ({
                        color: LaunchpadColor.green,
                        title: shape,
                        triggerType: TriggerType.text,
                        triggerAction: Actions.shape(Shapes[shape]),
                    })),
                    {
                        color: LaunchpadColor.off,
                        title: '',
                        triggerType: TriggerType.text,
                    },
                    ...sizes.map(size => ({
                        color: LaunchpadColor.amber,
                        title: size,
                        triggerType: TriggerType.text,
                        triggerAction: Actions.size(Sizes[size]),
                    })),
                ],
                [ 1, 3, 5, 7, 9 ].map(intensity => ({
                    color: LaunchpadColor.red,
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
                contentGroup.images.map(image => ({
                    color: LaunchpadColor.yellow,
                    title: image,
                    triggerType: TriggerType.image,
                    payload: image,
                    triggerAction: Actions.imageSrc(image),
                })),
                contentGroup.videos.map(video => ({
                    color: LaunchpadColor.green,
                    title: video,
                    triggerType: TriggerType.video,
                    payload: video,
                    triggerAction: Actions.videoSrc(video),
                })),
            ]),
            toLaunchpadPage('Colors', [
                colorPalettes.map((palette, index) => ({
                    color: LaunchpadColor.yellow,
                    title: `Palette_${ index }`,
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

export const launchpadSingleActions: LaunchpadTrigger[] = [
    {
        color: LaunchpadColor.red,
        title: 'BEAT',
        triggerType: TriggerType.text,
        triggerAction: Actions.mainBeat(127),
    },
];

function toLaunchpadPage(title: string, rows: LaunchpadTrigger[][]): LaunchpadPage {
    return { title, triggers: rows.map(row => [ ...chunk(row, 8) ]).flat() };
}

function chunk(arr, n) {
    return arr.length ? [ arr.slice(0, n), ...chunk(arr.slice(n), n) ] : [];
}

function toColorReadable({ h, s, b }: IColor): string {
    return `h:${ h }\ns${ s }\nb${ b }`;
}
