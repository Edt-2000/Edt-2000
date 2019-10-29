import { midiCCAutomation$ } from '../communication/midi';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Actions, Actions$ } from '../../../Shared/actions';
import { toFileName } from '../media/asset-scan-dir';
import { automationChannel, imageAutomationCCNumber } from '../../../Shared/config';

export const imageSrcCC$ = Actions$.imageSrc.pipe(
    filter(Boolean),
    map(toFileName),
    map(fileName => ({
        channel: automationChannel,
        controller: imageAutomationCCNumber,
        value: +fileName,
    })),
);

export const imageSrcActions$ = midiCCAutomation$.pipe(
    filter(msg => msg.controller === imageAutomationCCNumber),
    withLatestFrom(Actions$.contentGroup),
    map(([{value: fileName}, {title: directory}]) => Actions.imageSrc(directory + '/' + fileName.toString().padStart(3, '0') + '.jpg')),
);
