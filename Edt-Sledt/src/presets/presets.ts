import {BeatToColor} from './converters/color/beatToColor';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumToBeat} from './converters/drums/drumToBeat';
import {MainBeatToVidtBeat} from './outputs/vidt/mainBeatToVidtBeat';
import {ColorToVidtColor} from './outputs/vidt/colorToVidtColor';
import {MultiColorToVidtMultiColor} from "./outputs/vidt/multiColorToVidtMultiColor";
import {ColorToFastLedSolid} from "./outputs/fastledt/colorToFastLedSolid";
import {DrumsToVidt} from "./outputs/vidt/drumsToVidt";
import {ColorStrobeFastLed} from "./outputs/fastledt/colorStrobeFastLed";
import {ColorStrobeRGBLed} from "./outputs/rgbledt/colorStrobeRGBLed";
import {DrumsToFastLedStrip} from "./outputs/fastledt/drumsToFastLedStrip";
import {ColorToRGBLedSolid} from "./outputs/rgbledt/colorToRGBLedSolid";
import {ColorToInverseVidtColor} from "./converters/color/colorToInverseVidtColor";
import {ColorToFastLedSpark} from "./outputs/fastledt/colorToFastLedSpark";
import {BeatToRainbowSpark} from "./outputs/fastledt/beatToRainbowSpark";
import {Note} from "../../../Shared/midi";
import {BeatToNextWord} from "./converters/words/beatToNextWord";
import {MidiChannelToMainMelody} from "./converters/melody/midiChannelToMainMelody";
import {BeatToMovingMultiColorFastLed} from "./outputs/fastledt/beatToMovingMultiColorFastLed";
import {IControlPresetMsg} from "../../../Shared/types";

export const presets = {
    [Note.A3]: new BeatToColor(),
    [Note.C3]: new BeatToRainbowSpark(),
    [Note.E3]: new BeatToMovingMultiColorFastLed(),
    [Note.B3]: new ColorToFastLedSpark(),

    [Note.A2]: new MidiToColors(),

    [Note.A1]: new DrumToBeat(),
    [Note.B1]: new DrumsToFastLedStrip(),

    [Note.A0]: new ColorToFastLedSolid(),
    [Note.B0]: new ColorToRGBLedSolid(),
    [Note.C0]: new ColorStrobeFastLed(),
    [Note.D0]: new ColorStrobeRGBLed(),

    [Note.A4]: new BeatToNextWord(),

    [Note.A5]: new MidiChannelToMainMelody(),

    [Note.A7]: new MainBeatToVidtBeat(),
    [Note.B7]: new ColorToVidtColor(),
    [Note.C7]: new ColorToInverseVidtColor(),
    [Note.D7]: new MultiColorToVidtMultiColor(),
    [Note.E7]: new DrumsToVidt(),
};

export function getPresetState(): IControlPresetMsg[] {
    return Object.getOwnPropertyNames(presets)
        .map((presetNr) => {
            const preset = presets[presetNr];
            return <IControlPresetMsg>{
                preset: +presetNr, // preset key is a string, but send it as number
                modifier: preset.modifier,
                state: preset.state,
                title: preset.title,
                config: {
                    select: preset.modifierOptions.select,
                    continuous: preset.modifierOptions.continuous,
                },
            }
        })
}

// TODO list:

/**

 chase preset based on channel midi notes
 chase preset based on drum inputs (each drum is a different color or soeed?)
 chase preset based on beat

 add flash-length to Actions$ and create button for Control

 auto-index photo and video files instead of manual adding
 add video and photo files to .gitignore directory

 Add cues for some presets to switch quickly

 **/
