import { BehaviorSubject, Subject } from 'rxjs';
import { ActionsUnion, createAction } from './fsa-helpers';
import { VidtPresets } from '../vidt-presets';
import { blackColor } from '../colors/utils';
import { IMidiNoteMsg } from '../midi/types';
import {
    ContentGroup,
    IControlPresetMsg,
    ICue,
    IPresetMsg,
    LaunchpadPage,
    LaunchpadPageChange,
    LaunchpadPageIndex,
} from './types';
import { IColor, IDrumSound } from '../colors/types';
import { AnimationTypes } from '../vidt/animation';
import { Sizes } from '../vidt/sizes';
import { Shapes } from '../vidt/shapes';
import { enumToArray } from '../utils/utils';

// TODO: make Actions into a single observable object
export const Actions = {
    presetChange: (payload: IPresetMsg) =>
        createAction('presetChange', payload),
    presetState: (payload: IControlPresetMsg[]) =>
        createAction('presetState', payload),
    cueList: (payload: ICue[]) => createAction('cueList', payload),
    vidtPresets: (payload: (keyof typeof VidtPresets)[]) =>
        createAction('vidtPresets', payload),
    prepareVidt: (payload: VidtPresets) => createAction('prepareVidt', payload),

    launchpadPageChange: (payload: LaunchpadPageChange) =>
        createAction('launchpadPageChange', payload),
    launchpadPageIndex: (payload: LaunchpadPageIndex) =>
        createAction('launchpadPageIndex', payload),
    launchpadPages: (payload: LaunchpadPage[]) =>
        createAction('launchpadPages', payload),
    // Assets
    contentGroups: (payload: ContentGroup[]) =>
        createAction('contentGroups', payload),
    contentGroup: (payload: ContentGroup) =>
        createAction('contentGroup', payload),
    imageSrc: (payload: string) => createAction('imageSrc', payload),
    videoSrc: (payload: string) => createAction('videoSrc', payload),
    mainText: (payload: string) => createAction('mainText', payload),

    // Effects
    animationTypes: (payload: (keyof typeof AnimationTypes)[]) =>
        createAction('animationTypes', payload),
    animationType: (payload: AnimationTypes) =>
        createAction('animationType', payload),
    shape: (payload: Shapes) => createAction('shape', payload),
    shapes: (payload: (keyof typeof Shapes)[]) =>
        createAction('shapes', payload),
    size: (payload: Sizes) => createAction('size', payload),
    sizes: (payload: (keyof typeof Sizes)[]) => createAction('sizes', payload),

    // Subjects
    singleColor: (payload: IColor) => createAction('singleColor', payload),
    vidtSingleColor: (payload: IColor) =>
        createAction('vidtSingleColor', payload),
    multiColor: (payload: IColor[]) => createAction('multiColor', payload),
    vidtMultiColor: (payload: IColor[]) =>
        createAction('vidtMultiColor', payload),
    fastLedMultiColor: (payload: IColor[]) =>
        createAction('fastLedMultiColor', payload),
    colorPalette: (payload: IColor[]) => createAction('colorPalette', payload),

    mainBeat: (payload: number) => createAction('mainBeat', payload),
    mainDrumSound: (payload: IDrumSound) =>
        createAction('mainDrumSound', payload),
    mainDrum: (payload: IMidiNoteMsg) => createAction('mainDrum', payload),
    mainMelody: (payload: IMidiNoteMsg) => createAction('mainMelody', payload),
    mainChords: (payload: IMidiNoteMsg) => createAction('mainChords', payload),
    mainBass: (payload: IMidiNoteMsg) => createAction('mainBass', payload),

    glitchIntensity: (payload: number) =>
        createAction('glitchIntensity', payload),
};

export type Actions = ActionsUnion<typeof Actions>;

export const emptyContentGroup: ContentGroup = {
    songNr: 0,
    title: '___EMTPY____',
    colorPalettes: [],
    wordSet: [],
    images: [],
    videos: [],
};

export const Actions$ = {
    presetChange: new Subject<IPresetMsg>(),
    presetState: new BehaviorSubject([] as IControlPresetMsg[]),
    cueList: new BehaviorSubject([] as ICue[]),
    vidtPresets: new BehaviorSubject(enumToArray(VidtPresets)),
    prepareVidt: new BehaviorSubject<VidtPresets>(VidtPresets.karaoke),

    launchpadPageChange: new Subject<LaunchpadPageChange>(),
    launchpadPageIndex: new BehaviorSubject<LaunchpadPageIndex>({}),
    launchpadPages: new BehaviorSubject<LaunchpadPage[]>([]),

    imageSrc: new BehaviorSubject(''),
    videoSrc: new BehaviorSubject(''),

    mainText: new BehaviorSubject('STROBOCOPS'),
    contentGroup: new BehaviorSubject(emptyContentGroup),
    contentGroups: new BehaviorSubject([] as ContentGroup[]),

    animationType: new BehaviorSubject(AnimationTypes.bounce),
    animationTypes: new BehaviorSubject(enumToArray(AnimationTypes)),

    shape: new BehaviorSubject<Shapes>(Shapes.square),
    shapes: new BehaviorSubject(enumToArray(Shapes)),

    size: new BehaviorSubject<Sizes>(Sizes.normal),
    sizes: new BehaviorSubject(enumToArray(Sizes)),

    singleColor: new BehaviorSubject(blackColor),
    vidtSingleColor: new BehaviorSubject(blackColor),
    multiColor: new BehaviorSubject([]),
    vidtMultiColor: new BehaviorSubject([]),
    fastLedMultiColor: new BehaviorSubject([]),
    colorPalette: new BehaviorSubject<IColor[]>([]),
    mainBeat: new Subject<number>(),
    mainDrumSound: new Subject<IDrumSound>(),
    mainDrum: new Subject<IMidiNoteMsg>(),
    mainMelody: new Subject<IMidiNoteMsg>(),
    mainChords: new Subject<IMidiNoteMsg>(),
    mainBass: new Subject<IMidiNoteMsg>(),
    glitchIntensity: new BehaviorSubject<number>(5),
};

export function nextActionFromMsg(action: Actions) {
    if (Actions$[action.type]) {
        // @ts-ignore
        Actions$[action.type].next(action.payload);
    }
}
