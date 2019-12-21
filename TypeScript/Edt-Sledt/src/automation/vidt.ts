import { Actions, Actions$ } from '../../../Shared/actions';
import { filter, map } from 'rxjs/operators';
import { automationChannel, vidtPresetAutomationCCNumber } from '../../../Shared/config';
import { midiCCAutomation$ } from '../communication/midi';
import { VidtPresets } from '../../../Shared/vidt-presets';

export const prepareVidtCC$ = Actions$.prepareVidt.pipe(
    map(preset => ({
        channel: automationChannel,
        controller: vidtPresetAutomationCCNumber,
        value: preset,
    })),
);

export const prepareVidtActions$ = midiCCAutomation$.pipe(
    filter(msg => msg.controller === vidtPresetAutomationCCNumber),
    map(({value: preset}) => Actions.prepareVidt(VidtPresets[VidtPresets[preset]])),
);
