import { merge } from "rxjs";
import {
    imageSrcActions$,
    imageSrcCC$,
    videoSrcActions$,
    videoSrcCC$,
    wordActions$,
    wordCC$,
} from "./assets";
import { presetChangeActions$ } from "./presets";
import { contentGroupChangeActions$ } from "./song";
import { prepareVidtActions$, prepareVidtCC$ } from "./vidt";
import { animationTypeActions$, animationTypeCC$ } from "./animation";

/**
 * Automation
 *
 * By using the power of MIDI, we can also record and playback (in sync) certain aspects of the Edt-2000.
 * We 'hijack' MIDI CC messages to store numeric values, which are converted back to 'actions' upon playback.
 * For each type of message we write a little bit of logic to convert an imageSrc or word to a number and vice versa.
 *
 * Using software like Ableton makes it possible to easily record these CC changes and keep them in sync with the song.
 */

export const automationCCMessages$ = merge(
    imageSrcCC$,
    videoSrcCC$,
    wordCC$,
    prepareVidtCC$,
    animationTypeCC$,
);

export const automationActions$ = merge(
    presetChangeActions$,
    imageSrcActions$,
    videoSrcActions$,
    contentGroupChangeActions$,
    wordActions$,
    prepareVidtActions$,
    animationTypeActions$,
);
