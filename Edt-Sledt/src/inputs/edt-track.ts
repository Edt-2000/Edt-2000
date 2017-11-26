import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {ITrackMsg} from '../../../SharedTypes/socket';
import {OSC$} from '../communication/osc';
import {OSCDevices} from '../../../SharedTypes/config';

export const edtTrack$: Observable<ITrackMsg> = OSC$
    .filter((OSCMsg) => (
        OSCMsg.addresses.length === 1 &&
        OSCMsg.addresses[0] === OSCDevices.EdtTrack &&
        OSCMsg.values.length === 6
    ))
    .map((OSCMsg) => {
        return {
            left: {
                x: OSCMsg.values[0],
                y: OSCMsg.values[1],
                z: OSCMsg.values[2],
            },
            right: {
                x: OSCMsg.values[3],
                y: OSCMsg.values[4],
                z: OSCMsg.values[5],
            },
        };
    });
