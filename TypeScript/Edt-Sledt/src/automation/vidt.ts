import { Actions, Actions$ } from '../../../Shared/actions/actions';
import { midiCCAutomation$ } from '../communication/midi';
import { VidtPresets } from '../../../Shared/vidt-presets';
import { automationChannel, vidtPresetAutomationCCNumber } from '../../config/config';
import { filter, map } from 'rxjs';

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
