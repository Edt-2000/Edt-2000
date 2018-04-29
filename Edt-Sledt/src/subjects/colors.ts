import {IColor} from '../../../Shared/socket';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export const mainColor = new BehaviorSubject({
    hue: 0,
    saturation: 0,
    brightness: 0,
} as IColor);
