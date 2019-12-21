import { Actions, Actions$ } from '../../../Shared/actions';
import { filter, map } from 'rxjs/operators';
import { animationTypeCCNumber, automationChannel } from '../../../Shared/config';
import { midiCCAutomation$ } from '../communication/midi';
import { AnimationTypes } from '../../../Shared/vidt-presets';

export const animationTypeCC$ = Actions$.animationType.pipe(
    map(type => ({
        channel: automationChannel,
        controller: animationTypeCCNumber,
        value: type,
    })),
);

export const animationTypeActions$ = midiCCAutomation$.pipe(
    filter(msg => msg.controller === animationTypeCCNumber),
    map(({value: type}) => Actions.animationType(AnimationTypes[AnimationTypes[type]])),
);
