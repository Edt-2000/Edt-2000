import {IColor, IControlPresetMsg, ICue, IMidiNoteMsg, IPresetMsg} from './types';
import {BehaviorSubject, Subject} from '../Edt-Sledt/node_modules/rxjs';
import {ActionsUnion, createAction} from './fsa-helpers';
import {animationTypes} from './vidt-presets';
import {IPhotoAsset, IVideoAsset, photoAssets, videoAssets} from './assets';
import {defaultColor, DrumNotes} from "./config";
import {colorSets} from "./colors";

export const PRESET_CHANGE = 'PRESET_CHANGE';
export const PRESET_STATE = 'PRESET_STATE';
export const CUE_LIST = 'CUE_LIST';
export const PREPARE_VIDT = 'PREPARE_VIDT';

export const IMAGE_SRC = 'IMAGE_SRC';
export const VIDEO_SRC = 'VIDEO_SRC';

export const MAIN_TEXT = 'MAIN_TEXT';
export const WORD_SET = 'WORD_SET';

export const ANIMATION_TYPE = 'ANIMATION_TYPE';

export const SINGLE_COLOR = 'SINGLE_COLOR';
export const VIDT_SINGLE_COLOR = 'VIDT_SINGLE_COLOR';
export const MULTI_COLOR = 'MULTI_COLOR';
export const VIDT_MULTI_COLOR = 'VIDT_MULTI_COLOR';
export const COLOR_PALETTE = 'COLOR_PALETTE';
export const MAIN_BEAT = 'MAIN_BEAT';
export const MELODY = 'MELODY';
export const VIDT_BEAT = 'VIDT_BEAT';
export const VIDT_DRUM = 'VIDT_DRUM';
export const GLITCH_INTENSITY = 'GLITCH_INTENSITY';

export const Actions = {
    presetChange: (payload: IPresetMsg) => createAction(PRESET_CHANGE, payload),
    presetState: (payload: IControlPresetMsg[]) => createAction(PRESET_STATE, payload),
    cueList: (payload: ICue[]) => createAction(CUE_LIST, payload),
    prepareVidt: (payload: number) => createAction(PREPARE_VIDT, payload),

    // Assets
    imageSrc: (payload: IPhotoAsset) => createAction(IMAGE_SRC, payload),
    videoSrc: (payload: IVideoAsset) => createAction(VIDEO_SRC, payload),

    mainText: (payload: string) => createAction(MAIN_TEXT, payload),
    wordSet: (payload: string[]) => createAction(WORD_SET, payload),

    // Effects
    animationType: (payload: animationTypes) => createAction(ANIMATION_TYPE, payload),

    // Subjects
    singleColor: (payload: IColor) => createAction(SINGLE_COLOR, payload),
    vidtSingleColor: (payload: IColor) => createAction(VIDT_SINGLE_COLOR, payload),
    multiColor: (payload: IColor[]) => createAction(MULTI_COLOR, payload),
    vidtMultiColor: (payload: IColor[]) => createAction(VIDT_MULTI_COLOR, payload),
    colorPalette: (payload: IColor[]) => createAction(COLOR_PALETTE, payload),

    mainBeat: (payload: number) => createAction(MAIN_BEAT, payload),
    melody: (payload: IMidiNoteMsg) => createAction(MELODY, payload),
    vidtBeat: (payload: number) => createAction(VIDT_BEAT, payload),
    vidtDrum: (payload: DrumNotes) => createAction(VIDT_DRUM, payload),

    glitchIntensity: (payload: number) => createAction(GLITCH_INTENSITY, payload),
};

export type Actions = ActionsUnion<typeof Actions>;

export const Actions$ = {
    presetChange: <Subject<IPresetMsg>> new Subject(),
    presetState: <BehaviorSubject<IControlPresetMsg[]>> new BehaviorSubject([] as IControlPresetMsg[]),
    cueList: <BehaviorSubject<ICue[]>> new BehaviorSubject([] as ICue[]),
    prepareVidt: <BehaviorSubject<number>> new BehaviorSubject<number>(1),

    imageSrc: <BehaviorSubject<IPhotoAsset>> new BehaviorSubject<IPhotoAsset>(photoAssets[0]),
    videoSrc: <BehaviorSubject<IVideoAsset>> new BehaviorSubject<IVideoAsset>(videoAssets[0]),

    mainText: <BehaviorSubject<string>> new BehaviorSubject<string>('STROBOCOPS'),
    wordSet: <BehaviorSubject<string[]>> new BehaviorSubject<string[]>(['STROBOCOPS']),

    animationType: <BehaviorSubject<animationTypes>> new BehaviorSubject<animationTypes>(animationTypes.bounce),

    singleColor: <BehaviorSubject<IColor>> new BehaviorSubject<IColor>(defaultColor),
    vidtSingleColor: <BehaviorSubject<IColor>> new BehaviorSubject<IColor>(defaultColor),
    multiColor: <BehaviorSubject<IColor[]>> new BehaviorSubject<IColor[]>(colorSets[0]),
    vidtMultiColor: <BehaviorSubject<IColor[]>> new BehaviorSubject<IColor[]>(colorSets[0]),
    colorPalette: <BehaviorSubject<IColor[]>> new BehaviorSubject<IColor[]>(colorSets[0]),
    mainBeat: <Subject<number>> new Subject<number>(),
    melody: <Subject<IMidiNoteMsg>> new Subject<IMidiNoteMsg>(),
    vidtBeat: <Subject<number>> new Subject<number>(),
    vidtDrum: <Subject<DrumNotes>> new Subject<DrumNotes>(),
    glitchIntensity: <BehaviorSubject<number>> new BehaviorSubject<number>(0),
};

export function nextActionFromMsg(msg: Actions) {
    if (msg.type === PRESET_CHANGE) Actions$.presetChange.next(msg.payload);
    if (msg.type === PRESET_STATE) Actions$.presetState.next(msg.payload);
    if (msg.type === CUE_LIST) Actions$.cueList.next(msg.payload);
    if (msg.type === PREPARE_VIDT) Actions$.prepareVidt.next(msg.payload);

    if (msg.type === IMAGE_SRC) Actions$.imageSrc.next(msg.payload);
    if (msg.type === VIDEO_SRC) Actions$.videoSrc.next(msg.payload);

    if (msg.type === MAIN_TEXT) Actions$.mainText.next(msg.payload);
    if (msg.type === WORD_SET) Actions$.wordSet.next(msg.payload);

    if (msg.type === ANIMATION_TYPE) Actions$.animationType.next(msg.payload);

    if (msg.type === SINGLE_COLOR) Actions$.singleColor.next(msg.payload);
    if (msg.type === VIDT_SINGLE_COLOR) Actions$.vidtSingleColor.next(msg.payload);
    if (msg.type === MULTI_COLOR) Actions$.multiColor.next(msg.payload);
    if (msg.type === VIDT_MULTI_COLOR) Actions$.vidtMultiColor.next(msg.payload);
    if (msg.type === COLOR_PALETTE) Actions$.colorPalette.next(msg.payload);
    if (msg.type === MAIN_BEAT) Actions$.mainBeat.next(msg.payload);
    if (msg.type === MELODY) Actions$.melody.next(msg.payload);
    if (msg.type === VIDT_BEAT) Actions$.vidtBeat.next(msg.payload);
    if (msg.type === VIDT_DRUM) Actions$.vidtDrum.next(msg.payload);
    if (msg.type === GLITCH_INTENSITY) Actions$.glitchIntensity.next(msg.payload);
}
