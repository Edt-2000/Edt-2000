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
import { MidiChannelToMainBass } from './converters/bass/midiChannelToMainBass';
import { MidiChannelToMainChords } from './converters/chords/midiChannelToMainChords';
import { DrumToMidi } from './inputs/drumToMidi';
import { GuitarToMidi } from './inputs/guitarToMidi';

// TODO: C, D, E, F, G, A, B

/**
 * Map of PRESETS to MIDI notes. This is used to record preset state in MIDI in audio software like Ableton
 * Don't change this when you have automation tracks already recorded as there is no way to link them except hard-coding
 */
export const presets = {
    [Note.C_2]:
        new DrumSoundMap(DrumSounds.kick),
    [Note.C$_2]:
        new DrumSoundMap(DrumSounds.mainSnare),
    [Note.D_2]:
        new DrumSoundMap(DrumSounds.secondSnare),
    [Note.D$_2]:
        new DrumSoundMap(DrumSounds.floor),
    [Note.E_2]:
        new DrumSoundMap(DrumSounds.tom1),
    [Note.F_2]:
        new DrumSoundMap(DrumSounds.tom2),
    [Note.F$_2]:
        new DrumSoundMap(DrumSounds.bell),
    [Note.G_2]:
        new DrumSoundMap(DrumSounds.clap),
    [Note.G$_2]:
        new DrumSoundMap(DrumSounds.crash),
    [Note.A_2]:
        new DrumSoundMap(DrumSounds.hihatClosed),
    [Note.A$_2]:
        new DrumSoundMap(DrumSounds.hihatOpen),
    [Note.B_2]:
        new DrumSoundToBeat(),
    [Note.C_1]:
        new DrumSoundToFastLedStrip(),
    // [Note.C$_1]:
    // [Note.D_1]:
    // [Note.D$_1]:
    // [Note.E_1]:
    [Note.F_1]:
        new BeatToColor(),
    [Note.F$_1]:
        new BeatToRainbowSpark(),
    [Note.G_1]:
        new ColorToFastLedSpark(),
    [Note.G$_1]:
        new MidiToColors(),
    // [Note.A_1]:
    // [Note.A$_1]:
    // [Note.B_1]:
    [Note.C0]:
        new ColorToFastLedSolid(),
    [Note.C$0]:
        new ColorToRGBLedSolid(),
    [Note.D0]:
        new ColorToFastLedStrobe(),
    [Note.D$0]:
        new ColorStrobeRGBLed(),
    // [Note.E0]:
    // [Note.F0]:
    // [Note.F$0]:
    // [Note.G0]:
    // [Note.G$0]:
    // [Note.A0]:
    [Note.A$0]:
        new BeatToNextWord(),

    // [Note.B0]:
    // [Note.C1]:
    // [Note.C$1]:
    // [Note.D1]:
    // [Note.D$1]:
    // [Note.E1]:
    [Note.F1]:
        new MidiChannelToMainChords(),
    [Note.F$1]:
        new MidiChannelToMainMelody(),
    [Note.G1]:
        new MidiChannelToMainDrum(),
    [Note.G$1]:
        new MidiChannelToMainBass(),

    // [Note.A1]:
    // [Note.A$1]:
    // [Note.B1]:
    [Note.C2]:
        new MainMelodyToChunksOfFastLedt(),
    // [Note.C$2]:
    // [Note.D2]:
    [Note.D$2]:
        new MainBeatToVidtBeat(),
    [Note.E2]:
        new ColorToVidtColor(),
    [Note.F2]:
        new ColorToInverseVidtColor(),
    [Note.F$2]:
        new MultiColorToVidtMultiColor(),
    // [Note.G2]:
    // [Note.G$2]:
    // [Note.A2]:
    // [Note.A$2]:
    // [Note.B2]:
    // [Note.C3]:
    // [Note.C$3]:
    // [Note.D3]:
    // [Note.D$3]:
    // [Note.E3]:
    // [Note.F3]:
    // [Note.F$3]:
    // [Note.G3]:
    // [Note.G$3]:
    // [Note.A3]:
    // [Note.A$3]:
    // [Note.B3]:
    // [Note.C4]:
    // [Note.C$4]:
    // [Note.D4]:
    // [Note.D$4]:
    // [Note.E4]:
    // [Note.F4]:
    // [Note.F$4]:
    // [Note.G4]:
    // [Note.G$4]:
    // [Note.A4]:
    // [Note.A$4]:
    // [Note.B4]:
    // [Note.C5]:
    // [Note.C$5]:
    // [Note.D5]:
    // [Note.D$5]:
    // [Note.E5]:
    // [Note.F5]:
    // [Note.F$5]:
    // [Note.G5]:
    // [Note.G$5]:
    // [Note.A5]:
    // [Note.A$5]:
    // [Note.B5]:
    // [Note.C6]:
    // [Note.C$6]:
    // [Note.D6]:
    // [Note.D$6]:
    // [Note.E6]:
    // [Note.F6]:
    // [Note.F$6]:
    // [Note.G6]:
    // [Note.G$6]:
    // [Note.A6]:
    // [Note.A$6]:
    // [Note.B6]:
    // [Note.C7]:
    // [Note.C$7]:
    // [Note.D7]:
    // [Note.D$7]:
    // [Note.E7]:
    // [Note.F7]:
    // [Note.F$7]:
    // [Note.G7]:
    // [Note.G$7]:
    // [Note.A7]:
    // [Note.A$7]:
    // [Note.B7]:
    [Note.C$8]: new DrumToMidi(1),
    [Note.D8]: new DrumToMidi(2),
    [Note.D$8]: new DrumToMidi(4),
    [Note.E8]: new DrumToMidi(8),
    [Note.F8]: new DrumToMidi(16),
    // [Note.F$8]:
    [Note.G8]: new GuitarToMidi(),
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
