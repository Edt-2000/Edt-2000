import {
    LaunchpadColor,
    LaunchpadPage,
    LaunchpadTrigger,
    TriggerType,
} from "../../Shared/actions/types";
import { Actions, Actions$ } from "../../Shared/actions/actions";
import { combineLatest, map, Observable } from "rxjs";
import { VidtPresets } from "../../Shared/vidt-presets";
import { AnimationTypes } from "../../Shared/vidt/animation";
import { blackColor } from "../../Shared/colors/utils";
import { IColor } from "../../Shared/colors/types";
import { Shapes } from "../../Shared/vidt/shapes";
import { Sizes } from "../../Shared/vidt/sizes";

export const launchpadPages$: Observable<LaunchpadPage[]> = combineLatest([
    combineLatest([
        Actions$.vidtPresets,
        Actions$.colorPalette,
        Actions$.shapes,
        Actions$.sizes,
        Actions$.animationTypes,
    ]),
    combineLatest([Actions$.contentGroup, Actions$.contentGroups]),
]).pipe(
    map(
        ([
            [vidtPresets, colorPalette, shapes, sizes, animationTypes],
            [contentGroup, contentGroups],
        ]) => {
            const cg = contentGroups.map((group) => ({
                color: LaunchpadColor.red,
                title: group.title,
                triggerType: TriggerType.text,
                payload: group.songNr,
                triggerAction: Actions.contentGroup(
                    contentGroups.find((g) => g.songNr === group.songNr),
                ),
            }));
            return [
                toLaunchpadPage("Vidt", [
                    vidtPresets.map((preset) => ({
                        color: LaunchpadColor.yellow,
                        title: preset,
                        triggerType: TriggerType.text,
                        triggerAction: Actions.prepareVidt(VidtPresets[preset]),
                    })),
                    [
                        ...shapes.map((shape) => ({
                            color: LaunchpadColor.green,
                            title: shape,
                            triggerType: TriggerType.text,
                            triggerAction: Actions.shape(Shapes[shape]),
                        })),
                        {
                            color: LaunchpadColor.off,
                            title: "",
                            triggerType: TriggerType.text,
                        },
                        ...sizes.map((size) => ({
                            color: LaunchpadColor.amber,
                            title: size,
                            triggerType: TriggerType.text,
                            triggerAction: Actions.size(Sizes[size]),
                        })),
                    ],
                    [1, 3, 5, 7, 9].map((intensity) => ({
                        color: LaunchpadColor.red,
                        title: intensity.toString(),
                        triggerType: TriggerType.text,
                        triggerAction: Actions.glitchIntensity(intensity),
                    })),
                    animationTypes.map((type) => ({
                        color: LaunchpadColor.amber,
                        title: type,
                        triggerType: TriggerType.text,
                        triggerAction: Actions.animationType(
                            AnimationTypes[type],
                        ),
                    })),
                ]),
                toLaunchpadPage("Colors", [
                    contentGroup.colorPalettes &&
                        contentGroup.colorPalettes.map((palette, index) => ({
                            color: LaunchpadColor.yellow,
                            title: `Palette_${index}`,
                            triggerType: TriggerType.palette,
                            triggerAction: Actions.colorPalette(palette),
                        })),
                    colorPalette.map((color, i) => ({
                        color: LaunchpadColor.green,
                        title: toColorReadable(color),
                        triggerType: TriggerType.color,
                        triggerAction: Actions.singleColor(colorPalette[i]),
                    })),
                    colorPalette.map((color, i) => ({
                        color: LaunchpadColor.red,
                        title: toColorReadable(color),
                        triggerType: TriggerType.color,
                        triggerAction: Actions.singleColor(colorPalette[i]),
                        releaseAction: Actions.singleColor(blackColor),
                    })),
                ]),
                toLaunchpadPage("SongSelector", [cg]),
                toLaunchpadPage("SongControl", [
                    contentGroup.colorPalettes &&
                        contentGroup.colorPalettes.map((palette, index) => ({
                            color: LaunchpadColor.yellow,
                            title: `Palette_${index}`,
                            triggerType: TriggerType.palette,
                            triggerAction: Actions.colorPalette(palette),
                        })),
                    colorPalette.map((color, i) => ({
                        color: LaunchpadColor.green,
                        title: toColorReadable(color),
                        triggerType: TriggerType.color,
                        triggerAction: Actions.singleColor(colorPalette[i]),
                    })),
                    contentGroup.wordSet.map((word) => ({
                        color: LaunchpadColor.amber,
                        title: word,
                        triggerType: TriggerType.text,
                        triggerAction: Actions.mainText(word),
                    })),
                    contentGroup.images.map((image) => ({
                        color: LaunchpadColor.yellow,
                        title: image,
                        triggerType: TriggerType.image,
                        triggerAction: Actions.imageSrc(image),
                    })),
                    contentGroup.videos.map((video) => ({
                        color: LaunchpadColor.green,
                        title: video,
                        triggerType: TriggerType.video,
                        triggerAction: Actions.videoSrc(video),
                    })),
                ]),
            ];
        },
    ),
);

export const launchpadSingleActions: LaunchpadTrigger[] = [
    {
        color: LaunchpadColor.red,
        title: "MAINBEAT",
        triggerType: TriggerType.text,
        triggerAction: Actions.mainBeat(127),
    },
    {
        color: LaunchpadColor.green,
        title: "LOGO",
        triggerType: TriggerType.text,
        triggerAction: Actions.prepareVidt(VidtPresets.logo),
    },
    {
        color: LaunchpadColor.yellow,
        title: "PHOTOS",
        triggerType: TriggerType.text,
        triggerAction: Actions.prepareVidt(VidtPresets.photobouncer),
    },
    {
        color: LaunchpadColor.yellow,
        title: "VIDEO",
        triggerType: TriggerType.text,
        triggerAction: Actions.prepareVidt(VidtPresets.videoPlayer),
    },
    {
        color: LaunchpadColor.yellow,
        title: "TEXT",
        triggerType: TriggerType.text,
        triggerAction: Actions.prepareVidt(VidtPresets.karaoke),
    },
];

function toLaunchpadPage(
    title: string,
    rows: LaunchpadTrigger[][],
): LaunchpadPage {
    return { title, triggers: rows.map((row) => [...chunk(row, 8)]).flat() };
}

function chunk(arr, n) {
    return arr && arr.length
        ? [arr.slice(0, n), ...chunk(arr.slice(n), n)]
        : [];
}

function toColorReadable({ h, s, b }: IColor): string {
    return `h:${h}\ns${s}\nb${b}`;
}
