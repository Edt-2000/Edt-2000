import { Actions, Actions$ } from '../../../Shared/actions/actions';
import { filter, map } from 'rxjs/operators';
import { midiCCAutomation$ } from '../communication/midi';
import { colorSets } from '../../config/colors';
import { automationChannel, colorPaletteAutomationCCNumber } from '../../config/config';
import { IColor } from '../../../Shared/colors/types';

const isSameColorPalette = (p1: IColor[]) => (p2: IColor[]) => JSON.stringify(p1) === JSON.stringify(p2);

export const colorPaletteCC$ = Actions$.colorPalette.pipe(
    // We have to find using findIndex as it's an array of Arrays (by reference, no indexOf possible)
    map(colorPalette => colorSets.findIndex(isSameColorPalette(colorPalette))),
    filter(i => i !== -1), // It should always find it, but you never know
    map(index => ({
        channel: automationChannel,
        controller: colorPaletteAutomationCCNumber,
        value: index,
    })),
);

export const colorPaletteActions$ = midiCCAutomation$.pipe(
    filter(msg => msg.controller === colorPaletteAutomationCCNumber),
    map(({value: paletteIndex}) => Actions.colorPalette(colorSets[paletteIndex])),
);
