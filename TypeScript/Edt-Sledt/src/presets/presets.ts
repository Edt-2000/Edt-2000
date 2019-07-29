import { BeatToColor } from './converters/color/beatToColor';
import { MidiToColors } from './converters/color/midiToColors';
import { DrumSoundToBeat } from './converters/drums/drumSoundToBeat';
import { MainBeatToVidtBeat } from './outputs/vidt/mainBeatToVidtBeat';
import { ColorToVidtColor } from './outputs/vidt/colorToVidtColor';
import { MultiColorToVidtMultiColor } from './outputs/vidt/multiColorToVidtMultiColor';
import { ColorToFastLedSolid } from './outputs/fastledt/colorToFastLedSolid';
import { ColorStrobeRGBLed } from './outputs/rgbledt/colorStrobeRGBLed';
import { DrumSoundToFastLedStrip } from './outputs/fastledt/drumSoundToFastLedStrip';
import { ColorToRGBLedSolid } from './outputs/rgbledt/colorToRGBLedSolid';
import { ColorToInverseVidtColor } from './converters/color/colorToInverseVidtColor';
import { ColorToFastLedSpark } from './outputs/fastledt/colorToFastLedSpark';
import { BeatToRainbowSpark } from './outputs/fastledt/beatToRainbowSpark';
import { Note } from '../../../Shared/helpers/midi';
import { BeatToNextWord } from './converters/words/beatToNextWord';
import { MidiChannelToMainMelody } from './converters/melody/midiChannelToMainMelody';
import { IControlPresetMsg } from '../../../Shared/helpers/types';
import { DrumSoundMap } from './converters/drums/drumSoundMap';
import { DrumSounds } from '../../../Shared/drums';
import { PresetLogic } from './presets-logic';
import { MidiChannelToMainDrum } from './converters/drums/midiChannelToMainDrum';
import { ColorToFastLedStrobe } from './outputs/fastledt/colorToFastLedStrobe';
import { MainMelodyToChunksOfFastLedt } from './outputs/fastledt/mainMelodyToChunksOfFastLedt';

export const presets = {
    [Note.A1]: new DrumSoundToBeat(),

    [Note.C$0]: new DrumSoundMap(DrumSounds.kick),
    [Note.A$0]: new DrumSoundMap(DrumSounds.mainSnare),
    [Note.A$0]: new DrumSoundMap(DrumSounds.secondSnare),
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
    [Note.B3]: new ColorToFastLedSpark(),

    [Note.A2]: new MidiToColors(),

    [Note.B1]: new DrumSoundToFastLedStrip(),

    [Note.A0]: new ColorToFastLedSolid(),
    [Note.B0]: new ColorToRGBLedSolid(),
    [Note.C0]: new ColorToFastLedStrobe(),
    [Note.D0]: new ColorStrobeRGBLed(),

    [Note.A4]: new BeatToNextWord(),

    [Note.A5]: new MidiChannelToMainMelody(),
    [Note.A6]: new MidiChannelToMainDrum(),

    [Note.G_2]: new MainMelodyToChunksOfFastLedt(),

    [Note.A7]: new MainBeatToVidtBeat(),
    [Note.B7]: new ColorToVidtColor(),
    [Note.C7]: new ColorToInverseVidtColor(),
    [Note.D7]: new MultiColorToVidtMultiColor(),
};

export function getPresetState(): IControlPresetMsg[] {
    return Object.getOwnPropertyNames(presets).map(presetNr => {
        const preset = presets[presetNr];
        return {
            preset: +presetNr, // preset key is a string, but send it as number
            modifier: preset.modifier,
            state: preset.state,
            title: preset.title,
            config: {
                select: preset.modifierOptions.select,
                continuous: preset.modifierOptions.continuous,
                group: preset.modifierOptions.group,
            },
        } as IControlPresetMsg;
    });
}

export function getPresetNote(preset: PresetLogic): number {
    return +Object.getOwnPropertyNames(presets).find(presetNote => presets[presetNote].title === preset.title);
}
