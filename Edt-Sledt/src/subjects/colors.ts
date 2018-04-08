import {IColor} from '../../../Shared/socket';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export const EdtMainColor = new BehaviorSubject({
    hue: 0,
    saturation: 0,
    brightness: 0,
} as IColor);

EdtMainColor.subscribe((msg) => {
    console.log('Color change:', msg);
});
