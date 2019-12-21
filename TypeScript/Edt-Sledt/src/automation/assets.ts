import { midiCCAutomation$ } from '../communication/midi';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Actions, Actions$ } from '../../../Shared/actions';
import { toFileName } from '../media/asset-scan-dir';
import { automationChannel, imageAutomationCCNumber, wordAutomationCCNumber } from '../../../Shared/config';

export const wordCC$ = Actions$.mainText.pipe(
    withLatestFrom(Actions$.contentGroup), // Get contentGroup where this word might have come from
    map(([word, {wordSet}]) => wordSet.indexOf(word)), // Map to index of the word
    filter(m => m !== -1), // If not a word of a wordSet, don't send
    map(index => ({
        channel: automationChannel,
        controller: wordAutomationCCNumber,
        value: index,
    })),
);

export const wordActions$ = midiCCAutomation$.pipe(
    filter(msg => msg.controller === wordAutomationCCNumber),
    withLatestFrom(Actions$.contentGroup),
    filter(([msg, {wordSet}]) => !!wordSet[msg.value]),
    map(([msg, {wordSet}]) => Actions.mainText(wordSet[msg.value])),
);

export const imageSrcCC$ = Actions$.imageSrc.pipe(
    filter(i => !!i),
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
    map(([{value: fileName}, {title, songNr}]) => {
        return Actions.imageSrc(songNr.toString().padStart(3, '0') + '_' + title + '/' + fileName.toString().padStart(3, '0') + '.jpg');
    }),
);
