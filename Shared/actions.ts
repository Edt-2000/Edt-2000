import {IControlPresetMsg, IPresetCue, IPresetMsg} from './types';
import {BehaviorSubject, Subject} from '../Edt-Sledt/node_modules/rxjs';
import {ActionsUnion, createAction} from './fsa-helpers';
import {animationTypes} from './vidt-presets';
import {IColor} from './socket';
import {IPhotoAsset, IVideoAsset, photoAssets, videoAssets} from './assets';

export const PRESET_CHANGE = 'PRESET_CHANGE';
export const PRESET_STATE = 'PRESET_STATE';
export const CUE_LIST = 'CUE_LIST';
export const PREPARE_VIDT = 'PREPARE_VIDT';

export const IMAGE_SRC = 'IMAGE_SRC';
export const VIDEO_SRC = 'VIDEO_SRC';

export const MAIN_TEXT = 'MAIN_TEXT';

export const ANIMATION_TYPE = 'ANIMATION_TYPE';

export const SINGLE_COLOR = 'SINGLE_COLOR';
export const MULTI_COLOR = 'MULTI_COLOR';
export const MAIN_BEAT = 'MAIN_BEAT';
export const GLITCH_INTENSITY = 'GLITCH_INTENSITY';

export const Actions = {
    presetChange: (payload: IPresetMsg) => createAction(PRESET_CHANGE, payload),
    presetState: (payload: IControlPresetMsg[]) => createAction(PRESET_STATE, payload),
    cueList: (payload: IPresetCue[]) => createAction(CUE_LIST, payload),
    prepareVidt: (payload: number) => createAction(PREPARE_VIDT, payload),

    // Assets
    imageSrc: (payload: IPhotoAsset) => createAction(IMAGE_SRC, payload),
    videoSrc: (payload: IVideoAsset) => createAction(VIDEO_SRC, payload),

    mainText: (payload: string) => createAction(MAIN_TEXT, payload),

    // Effects
    animationType: (payload: animationTypes) => createAction(ANIMATION_TYPE, payload),

    // Subjects
    singleColor: (payload: IColor) => createAction(SINGLE_COLOR, payload),
    multiColor: (payload: IColor[]) => createAction(MULTI_COLOR, payload),
    mainBeat: (payload: number) => createAction(MAIN_BEAT, payload),
    glitchIntensity: (payload: number) => createAction(GLITCH_INTENSITY, payload),
};

export type Actions = ActionsUnion<typeof Actions>;

export const Actions$ = {
    presetChange: <Subject<IPresetMsg>> new Subject(),
    presetState: <BehaviorSubject<IControlPresetMsg[]>> new BehaviorSubject([] as IControlPresetMsg[]),
    cueList: <BehaviorSubject<IPresetCue[]>> new BehaviorSubject([] as IPresetCue[]),
    prepareVidt: <Subject<number>> new Subject<number>(),

    imageSrc: <BehaviorSubject<IPhotoAsset>> new BehaviorSubject<IPhotoAsset>(photoAssets[0]),
    videoSrc: <BehaviorSubject<IVideoAsset>> new BehaviorSubject<IVideoAsset>(videoAssets[0]),

    mainText: <BehaviorSubject<string>> new BehaviorSubject<string>(''),

    animationType: <BehaviorSubject<animationTypes>> new BehaviorSubject<animationTypes>(animationTypes.bounce),

    singleColor: <Subject<IColor>> new Subject<IColor>(),
    multiColor: <Subject<IColor[]>> new Subject<IColor[]>(),
    mainBeat: <Subject<number>> new Subject<number>(),
    glitchIntensity: <Subject<number>> new Subject<number>(),
};

export function nextActionFromMsg(msg: Actions) {
    if (msg.type === PRESET_CHANGE) Actions$.presetChange.next(msg.payload);
    if (msg.type === PRESET_STATE) Actions$.presetState.next(msg.payload);
    if (msg.type === CUE_LIST) Actions$.cueList.next(msg.payload);
    if (msg.type === PREPARE_VIDT) Actions$.prepareVidt.next(msg.payload);

    if (msg.type === IMAGE_SRC) Actions$.imageSrc.next(msg.payload);
    if (msg.type === VIDEO_SRC) Actions$.videoSrc.next(msg.payload);

    if (msg.type === MAIN_TEXT) Actions$.mainText.next(msg.payload);

    if (msg.type === ANIMATION_TYPE) Actions$.animationType.next(msg.payload);

    if (msg.type === SINGLE_COLOR) Actions$.singleColor.next(msg.payload);
    if (msg.type === MULTI_COLOR) Actions$.multiColor.next(msg.payload);
    if (msg.type === MAIN_BEAT) Actions$.mainBeat.next(msg.payload);
    if (msg.type === GLITCH_INTENSITY) Actions$.glitchIntensity.next(msg.payload);
}
