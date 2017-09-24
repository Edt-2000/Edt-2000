import {OSCInput, OSCMessage} from '../communication/osc';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

export const Preset1 = OSCInput
    .filter((OSCMsg: OSCMessage) => {
        return (OSCMsg.addresses.length === 2 &&
                OSCMsg.addresses[0] === 'Preset' &&
                OSCMsg.addresses[1] === 'toggle1')
    });
