import {BeatToColor} from './converters/color/beatToColor';
import {MidiToColors} from './converters/color/midiToColors';
import {DrumSoundToBeat} from './converters/drums/drumSoundToBeat';
import {MainBeatToVidtBeat} from './outputs/vidt/mainBeatToVidtBeat';
import {ColorToVidtColor} from './outputs/vidt/colorToVidtColor';
import {MultiColorToVidtMultiColor} from "./outputs/vidt/multiColorToVidtMultiColor";
import {ColorToFastLedSolid} from "./outputs/fastledt/colorToFastLedSolid";
import {DrumsToVidt} from "./outputs/vidt/drumsToVidt";
import {ColorStrobeFastLed} from "./outputs/fastledt/colorStrobeFastLed";
import {ColorStrobeRGBLed} from "./outputs/rgbledt/colorStrobeRGBLed";
import {DrumSoundToFastLedStrip} from "./outputs/fastledt/drumSoundToFastLedStrip";
import {ColorToRGBLedSolid} from "./outputs/rgbledt/colorToRGBLedSolid";
import {ColorToInverseVidtColor} from "./converters/color/colorToInverseVidtColor";
import {ColorToFastLedSpark} from "./outputs/fastledt/colorToFastLedSpark";
import {BeatToRainbowSpark} from "./outputs/fastledt/beatToRainbowSpark";
import {Note} from "../../../Shared/midi";
import {BeatToNextWord} from "./converters/words/beatToNextWord";
import {MidiChannelToMainMelody} from "./converters/melody/midiChannelToMainMelody";
import {BeatToMovingMultiColorFastLed} from "./outputs/fastledt/beatToMovingMultiColorFastLed";
import {IControlPresetMsg} from "../../../Shared/types";
import {DrumSoundMap} from "./converters/drums/drumSoundMap";
import {DrumSounds} from "../../../Shared/drums";

export const presets = {
    [Note.A1]: new DrumSoundToBeat(),

    [Note.C$0]: new DrumSoundMap(DrumSounds.kick),
    [Note.A$0]: new DrumSoundMap(DrumSounds.snare),
    [Note.F$0]: new DrumSoundMap(DrumSounds.floor),
    [Note.D$0]: new DrumSoundMap(DrumSounds.tom1),
    [Note.G$0]: new DrumSoundMap(DrumSounds.tom2),
    [Note.C$1]: new DrumSoundMap(DrumSounds.bell),
    [Note.A$1]: new DrumSoundMap(DrumSounds.clap),
    [Note.F$1]: new DrumSoundMap(DrumSounds.crash),
    [Note.D$1]: new DrumSoundMap(DrumSounds.hihatClosed),
    [Note.G$1]: new DrumSoundMap(DrumSounds.hihatOpen),

    [Note.A3]: new BeatToColor(),
    [Note.C3]: new BeatToRainbowSpark(),
    [Note.E3]: new BeatToMovingMultiColorFastLed(),
    [Note.B3]: new ColorToFastLedSpark(),

    [Note.A2]: new MidiToColors(),

    [Note.B1]: new DrumSoundToFastLedStrip(),

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
                    group: preset.modifierOptions.group,
                },
            }
        });
}
