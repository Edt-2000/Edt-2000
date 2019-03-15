import {Actions, nextActionFromMsg} from '../../../Shared/actions';
import {automationCC$} from './midi';

automationCC$.subscribe(cc => {
    switch (cc.controller) {
        case 1:
            nextActionFromMsg(Actions.singleColor({
                h: Math.round(3 * cc.value),
                s: 255,
                b: 255,
            }));
            break;
        default:
            break;

    }
});

export const MidiAutomationInput = 'MidiAutomationInput';
