import {Actions, nextActionFromMsg} from '../../../Shared/actions';
import {automationCC$} from './midi';

automationCC$.subscribe(cc => {
    switch (cc.controller) {
        case 1:
            nextActionFromMsg(Actions.singleColor({
                hue: Math.round(3 * cc.value),
                saturation: 255,
                brightness: 255,
            }));
            break;
        default:
            break;

    }
});

export const MidiAutomationInput = 'MidiAutomationInput';
