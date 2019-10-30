import { merge } from 'rxjs';
import { imageSrcActions$, imageSrcCC$ } from './assets';
import { presetChangeActions$, presetMidiMsg$ } from './presets';
import { contentGroupChangeActions$ } from './song';

export const automationCCMessages$ = merge(
    imageSrcCC$,
);

export const automationNoteMessages$ = merge(
    presetMidiMsg$,
);

export const automationActions$ = merge(
    imageSrcActions$,
    presetChangeActions$,
    contentGroupChangeActions$,
);
