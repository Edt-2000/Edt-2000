/** Manual control from external devices like iPad or phone or hardware **/
import {OSCInput} from './communication/osc';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {colorMsg} from '../../SharedTypes/socket';
import {rescale} from './utils';

const manual = OSCInput.filter((msg) => msg.addresses[0] === 'manual');

const color = manual.filter((msg) => msg.addresses[1] === 'color');

const saturation: Observable<number> = color.filter((value) => value.addresses[2] === 'saturation')
    .map((msg) => msg.values[0])
    .startWith(1);
const brightness: Observable<number> = color.filter((value) => value.addresses[2] === 'brightness')
    .map((msg) => msg.values[0])
    .startWith(1);

const hue = color.filter((value) => value.addresses[2] === 'hue')
    .map((msg) => msg.values[0])
    .startWith(1);

// Combine all three inputs to a manualColor observable that emits when any of the three values change
export const manualColor: Observable<colorMsg> = hue.combineLatest(saturation, brightness, (h, s, b) => {
    return <colorMsg>{
        bgColor: {
            hue: rescale(h, 1, 0, 255),
            brightness: rescale(b, 1, 0, 255),
            saturation: rescale(s, 1, 0, 255)
        }
    }
});