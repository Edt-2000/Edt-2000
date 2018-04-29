'use strict';

import {Actions} from '../../../Shared/actions';
import {io} from '../communication/sockets';

export function toVidt(msg: Actions): void {
    console.log('Edt-Vidt: ', msg);
    io.emit('toVidt', msg);
}
