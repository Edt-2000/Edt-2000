import { enumToArray } from '../utils/utils';

export enum AnimationTypes {
    '____EMPTY____',
    bounce,
    rotate,
    spin,
    stretch,
    mirror,
}

export const animationTypeArr = enumToArray(AnimationTypes);
