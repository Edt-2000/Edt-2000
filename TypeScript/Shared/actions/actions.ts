import { BehaviorSubject, Subject } from 'rxjs';
import { ActionsUnion, createAction } from './fsa-helpers';
import { VidtPresets } from '../vidt-presets';
import { blackColor } from '../colors/utils';
import { colorSets } from '../../Edt-Sledt/config/colors';
import { IMidiNoteMsg } from '../midi/types';
import { ContentGroup, IControlPresetMsg, ICue, IPresetMsg } from './types';
import { IColor } from '../colors/types';
import { DrumSounds } from '../../Edt-Sledt/config/config';
import { AnimationTypes } from '../vidt/animation';

// TODO: make Actions into a single observable object
export const Actions = {
  presetChange: (payload: IPresetMsg) => createAction('presetChange', payload),
  presetState: (payload: IControlPresetMsg[]) => createAction('presetState', payload),
  cueList: (payload: ICue[]) => createAction('cueList', payload),
  prepareVidt: (payload: VidtPresets) => createAction('prepareVidt', payload),

  // Assets
  contentGroups: (payload: ContentGroup[]) => createAction('contentGroups', payload),
  contentGroup: (payload: ContentGroup) => createAction('contentGroup', payload),
  imageSrc: (payload: string) => createAction('imageSrc', payload),
  videoSrc: (payload: string) => createAction('videoSrc', payload),
  mainText: (payload: string) => createAction('mainText', payload),

  // Effects
  animationType: (payload: AnimationTypes) => createAction('animationType', payload),

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
  mainChords: (payload: IMidiNoteMsg) => createAction('mainChords', payload),
  mainBass: (payload: IMidiNoteMsg) => createAction('mainBass', payload),

  glitchIntensity: (payload: number) =>
    createAction('glitchIntensity', payload),
};

export type Actions = ActionsUnion<typeof Actions>;

const emptyContentGroup: ContentGroup = {
  songNr: 0,
  title: '',
  wordSet: [],
  images: [],
  videos: [],
};

export const Actions$ = {
  presetState: new BehaviorSubject([] as IControlPresetMsg[]),
  cueList: new BehaviorSubject([] as ICue[]),

  presetChange: new Subject() as Subject<IPresetMsg>,
  prepareVidt: new BehaviorSubject<VidtPresets>(VidtPresets.logo),

  imageSrc: new BehaviorSubject(''),
  videoSrc: new BehaviorSubject(''),

  mainText: new BehaviorSubject('STROBOCOPS'),
  contentGroups: new BehaviorSubject([] as ContentGroup[]),
  contentGroup: new BehaviorSubject(emptyContentGroup),

  animationType: new BehaviorSubject<AnimationTypes>(AnimationTypes.bounce),

  singleColor: new BehaviorSubject(blackColor),
  vidtSingleColor: new BehaviorSubject(blackColor),
  multiColor: new BehaviorSubject(colorSets[0]),
  vidtMultiColor: new BehaviorSubject(colorSets[5]),
  colorPalette: new BehaviorSubject(colorSets[0]),
  mainBeat: new Subject() as Subject<number>,
  mainDrumSound: new Subject() as Subject<DrumSounds>,
  mainDrum: new Subject() as Subject<IMidiNoteMsg>,
  mainMelody: new Subject() as Subject<IMidiNoteMsg>,
  mainChords: new Subject() as Subject<IMidiNoteMsg>,
  mainBass: new Subject() as Subject<IMidiNoteMsg>,
  glitchIntensity: new BehaviorSubject<number>(1),
};

export function nextActionFromMsg(action: Actions) {
  if (Actions$[action.type]) {
    // @ts-ignore
    Actions$[action.type].next(action.payload);
  }
}
