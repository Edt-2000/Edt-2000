import { ICue } from '../../../Shared/types';
import { Actions, nextActionFromMsg } from '../../../Shared/actions';
import { drumCues } from './drums/drums';

const presetCues: ICue[] = [
    ...drumCues,
];

nextActionFromMsg(Actions.cueList(presetCues));
export const CueListSetup = 'CueListSetup';
