import { Actions, Actions$ } from '../../../Shared/actions/actions';
import { filter, map } from 'rxjs/operators';
import { midiCCAutomation$ } from '../communication/midi';
import { animationTypeCCNumber, automationChannel } from '../../config/config';
import { AnimationTypes } from '../../../Shared/vidt/animation';

export const animationTypeCC$ = Actions$.animationType.pipe(
    map(type => ({
        channel: automationChannel,
        controller: animationTypeCCNumber,
        value: type,
    })),
);

export const animationTypeActions$ = midiCCAutomation$.pipe(
    filter(msg => msg.controller === animationTypeCCNumber),
    map(({ value: type }) => Actions.animationType(AnimationTypes[AnimationTypes[type]])),
);
