import { Actions, Actions$ } from '../../../Shared/actions/actions';
import { filter, map } from 'rxjs/operators';
import { midiCCAutomation$ } from '../communication/midi';
import { automationChannel, colorPaletteAutomationCCNumber } from '../../config/config';
import { IColor } from '../../../Shared/colors/types';
import { combineLatest } from 'rxjs';

const isSameColorPalette = (p1: IColor[]) => (p2: IColor[]) => JSON.stringify(p1) === JSON.stringify(p2);

export const colorPaletteCC$ = combineLatest([
    Actions$.colorPalettes,
    Actions$.colorPalette,
]).pipe(
    // We have to find using findIndex as it's an array of Arrays (by reference, no indexOf possible)
    map(([colorPalettes, colorPalette]) => colorPalettes.findIndex(isSameColorPalette(colorPalette))),
    filter(i => i !== -1), // It should always find it, but you never know
    map(index => ({
        channel: automationChannel,
        controller: colorPaletteAutomationCCNumber,
        value: index,
    })),
);

export const colorPaletteActions$ = combineLatest([
    midiCCAutomation$,
    Actions$.colorPalettes,
]).pipe(
    filter(([msg]) => msg.controller === colorPaletteAutomationCCNumber),
    map(([{ value: paletteIndex }, colorPalettes]) => Actions.colorPalette(colorPalettes[paletteIndex])),
);
