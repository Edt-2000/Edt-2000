import { IColor, IControlPresetMsg, ICue, IMidiNoteMsg, IPresetMsg } from './types';
import { BehaviorSubject, Subject } from 'rxjs';
import { ActionsUnion, createAction } from './fsa-helpers';
import { animationTypes, vidtPresets } from './vidt-presets';
import { defaultColor, DrumNotes } from './config';
import { colorSets } from './colors';
import { DrumSounds } from './drums';
import { modifiers } from './modifiers';

export const Actions = {
    presetChange: (payload: IPresetMsg) => createAction('presetChange', payload),
    presetState: (payload: IControlPresetMsg[]) => createAction('presetState', payload),
    cueList: (payload: ICue[]) => createAction('cueList', payload),
    prepareVidt: (payload: vidtPresets) => createAction('prepareVidt', payload),

    // Assets
    imageList: (payload: string[]) => createAction('imageList', payload),
    imageSrc: (payload: string) => createAction('imageSrc', payload),
    videoList: (payload: string[]) => createAction('videoList', payload),
    videoSrc: (payload: string) => createAction('videoSrc', payload),

    mainText: (payload: string) => createAction('mainText', payload),
    wordSet: (payload: string[]) => createAction('wordSet', payload),

    // Effects
    animationType: (payload: animationTypes) => createAction('animationType', payload),

    // Subjects
    singleColor: (payload: IColor) => createAction('singleColor', payload),
    vidtSingleColor: (payload: IColor) =>
        createAction('vidtSingleColor', payload),
    multiColor: (payload: IColor[]) => createAction('multiColor', payload),
    vidtMultiColor: (payload: IColor[]) =>
        createAction('vidtMultiColor', payload),
    colorPalette: (payload: IColor[]) => createAction('colorPalette', payload),

    mainBeat: (payload: number) => createAction('mainBeat', payload),
    mainDrumSound: (payload: DrumSounds) => createAction('mainDrumSound', payload),
    mainDrum: (payload: IMidiNoteMsg) => createAction('mainDrum', payload),
    mainMelody: (payload: IMidiNoteMsg) => createAction('mainMelody', payload),
    vidtBeat: (payload: number) => createAction('vidtBeat', payload),
    vidtDrum: (payload: DrumNotes) => createAction('vidtDrum', payload),

    glitchIntensity: (payload: number) =>
        createAction('glitchIntensity', payload),
};

export type Actions = ActionsUnion<typeof Actions>;

export const Actions$ = {
    presetState: new BehaviorSubject([] as IControlPresetMsg[]),
    cueList: new BehaviorSubject([] as ICue[]),
    imageList: new BehaviorSubject(['']),
    videoList: new BehaviorSubject(['']),

    presetChange: new Subject() as Subject<IPresetMsg>,
    prepareVidt: new BehaviorSubject<vidtPresets>(vidtPresets.logo),

    imageSrc: new BehaviorSubject(''),
    videoSrc: new BehaviorSubject(''),

    mainText: new BehaviorSubject('STROBOCOPS'),
    wordSet: new BehaviorSubject(['STROBOCOPS']),

    animationType: new BehaviorSubject<animationTypes>(animationTypes.bounce),

    singleColor: new BehaviorSubject(defaultColor),
    vidtSingleColor: new BehaviorSubject(defaultColor),
    multiColor: new BehaviorSubject(colorSets[0]),
    vidtMultiColor: new BehaviorSubject(colorSets[0]),
    colorPalette: new BehaviorSubject(colorSets[0]),
    mainBeat: new Subject() as Subject<number>,
    mainDrumSound: new Subject() as Subject<DrumSounds>,
    mainDrum: new Subject() as Subject<IMidiNoteMsg>,
    mainMelody: new Subject() as Subject<IMidiNoteMsg>,
    vidtBeat: new Subject<number>() as Subject<number>,
    vidtDrum: new Subject() as Subject<DrumNotes>,
    glitchIntensity: new BehaviorSubject<number>(modifiers.glitchIntensity[0].value),
};

export function nextActionFromMsg(msg: Actions) {
    // We use dynamic properties to send it to the correct action, but need to ignore TS warning
    // @ts-ignore
    Actions$[msg.type].next(msg.payload);
}
