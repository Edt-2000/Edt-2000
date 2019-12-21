import { merge } from 'rxjs';
import { imageSrcActions$, imageSrcCC$, wordActions$, wordCC$ } from './assets';
import { presetChangeActions$, presetMidiMsg$ } from './presets';
import { contentGroupChangeActions$ } from './song';

export const automationCCMessages$ = merge(
    imageSrcCC$,
    wordCC$,
);

export const automationNoteMessages$ = merge(
    presetMidiMsg$,
);

export const automationActions$ = merge(
    imageSrcActions$,
    presetChangeActions$,
    contentGroupChangeActions$,
    wordActions$,
);
