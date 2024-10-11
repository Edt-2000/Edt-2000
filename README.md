# Edt-2000

The `Edt-2000` is a long-running project created to make live music performances more interesting and interactive. Originally only based around a Gametrak controller, it has evolved into a large collection of code that communicates with each other through various (open source) protocols to create a light/visual show that is mostly directly controlled by the music itself. The code is open source and free for anyone to use, but not yet optimized or setup in a way for non-experienced programmers to easily extend or use without at least some knowledge of Javascript.

## Install / Run

The Edt-2000 is basically a collection of apps that all need to run a show. We use `tmux` to create a single terminal and make it easy to start it all. It's not needed to run, but makes it a lot easier: https://github.com/tmux/tmux/wiki/Installing

Run the shell scripts `./run.sh` on a Mac to get everything started.

## Current state

Currently the project is in a phase where it needs to grow in features; after we have done more performances and fine-tuned the experience we will try to work towards refactoring towards a more modular setup so that it becomes more easy to customize and extend with your own effects and content. Please do get in touch when you want to try the system; we are glad to help!

For now, before you dive in, be aware that we might rewrite big parts of the codebase and break any old versions you have modified; please let us know when you actively use the system so we can notify you of design changes!

## Overview of devices and systems

The `Edt-2000` is mostly written in `TypeScript`, currently using `Node`, `Angular` and `Vue` for it's main apps. There are some side-apps written with `Processing`, `Arduino`, `C++`, `C#` and there is even a test app for windows hidden somewhere. In the older parts of the repository you also will find some `MaxMSP` patches that we used in the beginning of the project which might even be useful for someone. Communication between parts of the system is mostly done with `MIDI`, `OSC` and `websockets/JSON`, trying to keep it as standard and flexible as possible.

### Edt-FastLED & Edt-RGBLED

In a flight case we have mounted some custom PCB's that can currently control up to 8 addressable and 8 normal RGB LED strips. 2 Arduino's run the FastLED library with some custom code to respond to `OSC` send by the `Edt-Sledt` over the serial ports. The LED strips are mounted on aluminium profiles which you can buy almost anywhere nowadays, making them cheap alternatives to the often expensive DMX RGB led lights. As I found a whole batch of UTP keystones a long time ago, we used these to connect standard UTP ethernet cables from the flight case to the LED strips. These cables come in all sizes and are much cheaper than any other cable we could find, making the overall cost reasonable per LED strip.

### Edt-Vidt

The `Edt-Vidt` is the _video_ part of the project; It displays a fullscreen `Vue` web application that can show videos/images/animations/text/colors/etc, controlled by the `Edt-Sledt` over a websocket connection. The app has a number of `presets` that each show something different on screen; check the code to see what is currently implemented.

In our setup we are using 4 old 22" TV's that we bought at a second hand store and a 32" TV on a microphone stand, connected to a laptop with an 8 channel HDMI splitter, making it simple and reliable. It can even run on multiple laptops/computers and control even more screens, so it's pretty flexible depending on your needs.  

### Edt-Control

To control the system remotely (off-stage), the `Edt-Control` was created. This is an `Angular` app that runs on a tablet or mobile phone and offers direct control over the system. It enables the user to toggle the _presets_ and _cues_ and gives direct control over _color_ and various other _streams_ of the Edt. Communication is done with a socket as well; multiple controls can be active at the same time and they keep in sync together (multiple people can operate the system with multiple phones/tablets).

### Edt-Pedal

Although currently not really used, we bought a guitar foot-pedal and hooked it up to an `Arduino` as well, with the idea of allowing control on-stage for the musician with stage-ready hardware at low cost. The cheapest foot pedals are often very simply from the inside, making them ideal for custom hardware inputs.

### Edt-Trak

Another device that started it all but is currently not really utilized is the GameTrak controller. This is a custom controller for an old Playstation 2 golf game, which turned out to be easily hackable. See this old blogpost for more info: [https://edt-2000.github.io/2016-07-25-Edt-Trak-first-release/](https://edt-2000.github.io/2016-07-25-Edt-Trak-first-release).

### Edt-Guitar & Edt-Drums

To give our stage performance something more interesting to look at, we are in the process of converting a Guitar Hero guitar and drumkit to be inputs for the Edt-2000. How cool would it be to play on a toy-drumkit and hear samples and flashing lights, like a video game!? These devices turned out to be pretty simple internally as well, mostly it's a bunch of analog sensors and buttons that you can easily connect to a wireless development board and a small battery.

### `Edt-Sledt`: or `the one that takes all inputs`

A bit of an unconventional name, we named the center of our system the `Sledt` (Dutch for slut), as it takes all inputs and processes it to outputs. This is the core of the system and controls most of what happens during the show.

## Concept

Our current aim with the project is to: 
- make small/medium performances visually interesting with affordable DIY technology (for the price of 1 commercial DMX fixture you can create our whole setup)
- rethink the way light shows are controlled by telling the system _how_ to respond to music, instead of directly controlling the lights (although this is also possible)
- be able to setup the system in a venue in under 10 minutes; this is mostly done by packing everything in a flightcase and making it easy to connect
- be extendable and flexible with other systems by leveraging standards and open source protocols as much as possible

The following section assumes you are familiar with the [RxJS](https://www.learnrxjs.io/) library and programming in general; it's very hard to write documentation when you don't know the audience!

The core ideas of the Edt-2000 can be explained by looking at the folder structure of the `Edt-Sledt`

```
- communication
- inputs
- outputs
- presets
  - converters
    - color
    - drums
    - melody
    - words
  - outputs
    - fastled
    - rgbled
    - vidt
- cues
```

### Actions & 'RxJS store'

The 3 main apps (Vidt, Control & Sledt) communicate using a shared RxJS based 'store', which each app includes in it's code and reacts to. The `Actions` are send over a socket connection to each other (see Input&Output folders) and converted into 'next' values for the various store observables. The `nextActionFromMsg()` function in the `Shared/actions.ts` file is the main function that is doing all the heavy lifting. 

#### Communication
This folder implements and exposes Observables like `OSC$` and `socket$` to use for other parts of the app. Originally we also included MIDI in here, but this was not reliable enough on multiple operating systems and is now coming into the system through OSC as well with an external app (in `Processing`). Using OSC for midi also means we can at some point create an Arduino based hardware midi-osc device to make setting up the system easier. 

#### Inputs & Outputs
These folders implement and expose functions/Observables for communicating with other parts of the system, like the Pedal, Trak, Vidt, Ledt, Control, Audio and MIDI. They convert signals from for instance `OSC$` and expose them again as an `EdtAudio$` observable, holding the information for that stream.

For the `Vidt` for instance you will also find a number of subscriptions that send values from the RxJS store to the Vidt, where it is send to the `nextActionFromMsg()` function to be converted into `next` values: `this.socket.on('toVidt', nextActionFromMsg);`. By using shared TypeScript declarations we typecast these actions making working with the values effortless in all three apps (Vue, Angular, Node).

#### Presets
The preset section is where the `inputs` (can be anything) are converted into `outputs` (can also be anything). The presets all follow a common structure (see `preset-logic.ts`):
```typescript
export abstract class PresetLogic {
    ...
    readonly modifierOptions: IModifierOptions;
    title: string = this.constructor.name;
    modifier = 127;
    ...
    startPreset(modifier: number) {}
    stopPreset() {}
}
```

Presets can be started and stopped, and when started also get a `modifier` value. The `modifierOptions` are used for the `Edt-Control` to display a quick list of options, and `title` is identify each preset. 

Starting and stopping presets is controlled by `Actions.presetChange()`, which currently comes from the `Edt-Control` only. Originally this was also controllable by midi, and will at some point be re-implemented from the `MIDI$` observable so it can be automated.

##### Converters
 The whole system is build around streams of actions, leveraging RxJS to build chains of reactions. This is best explained with a simplified example (check the code for details): 

```typescript
// ------------------------------
// First, we select which midi channel is the drum channel and re-trigger it as mainDrum
// midiChannelToMainDrum.ts
noteOn$
    .pipe(filter(note => note.channel === this.modifier))
    .subscribe(note => {
        nextActionFromMsg(Actions.mainDrum(note));
    }),

// ------------------------------
// Then we map a specific note to a certain sound (snare, kick, hi-hat open) and re-trigger it as mainDrumSound for that specific sound (this.sound)
// This is 
// drumSoundMap.ts
Actions$.mainDrum
    .pipe(filter(drumNote => this.modifier === drumNote.note))
    .subscribe(() => {
        nextActionFromMsg(Actions.mainDrumSound(this.sound));
    }),

// ------------------------------
// In this converter we determine that every drumSound of a certain type (kick, snare, hi-hat, etc) needs to be converted to a 'beat' with a velocity
// drumSoundToBeat.ts
Actions$.mainDrumSound
    .pipe(filter(drum => drum === this.modifier))
    .subscribe(beat => {
        nextActionFromMsg(Actions.mainBeat(beat));
    }),

// ------------------------------
// In another converter we then convert every mainBeat to a new single color that is re-triggered 
// beatToColor.ts
Actions$.mainBeat
    .pipe(withLatestFrom(Actions$.multiColor))
    .subscribe(([, colors]) => {
        this.index = (this.index + 1) % colors.length;
        nextActionFromMsg(Actions.singleColor(colors[this.index]));
    }), 

// ------------------------------
// And finally, to do something with this changing color we send it to all FastLED's with the Spark effect 
// colorToFastLedSpark.ts
Actions$.singleColor.subscribe(color => {
    FastLedtSpark(0, color, this.modifier);
}),
```

As you see from the code snippets above, it takes 5 active presets to do a simple conversion from MIDI drum to sparkling LEDs. When we started this project this was done more in a hard-coded way, but we soon discovered that every song had different midi mappings, sometimes in music the `KICK` is not the `mainBeat`, etc. Over time we added more fine controls to have more flexibility, at the cost of having more presets.

#### Cues
As you can imagine, it is not feasible to activate 5 presets at the same time during a live performance. This is where the `cues` play a role; these are programmable shortcuts to trigger multiple presets with specific settings at the same time. These are currently hard-coded into the system; at some point they would ideally be editable from the program itself and saved somehow.

An example cue could be:
```typescript
export const drumCues = [
    {
        label: 'DrumKick -> Beat -> Color -> All',
        actions: [
            Actions.presetChange({
                preset: getPresetNote(new DrumSoundToBeat()),
                modifier: DrumSounds.kick,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new BeatToColor()),
                modifier: 127,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new ColorToVidtColor()),
                modifier: 127,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new ColorToFastLedSolid()),
                modifier: 127,
                state: true,
            }),
            Actions.presetChange({
                preset: getPresetNote(new ColorToRGBLedSolid()),
                modifier: 127,
                state: true,
            }),
            Actions.prepareVidt(vidtPresets.color),
        ],
    },
]
```

You can send any `action` with this system, so more complex sets can be made to make live-control of the system much easier. We are developing a button-box with Arcade buttons with a small display to have multiple cues available at the touch of a nice tactile hardware button. For now, the Edt-Control has these cues in a grid making them accessible by touchscreen.

### Images / Assets

For the `Edt-Vidt`, you can use your own assets by placing them in the `TypeScript/Edt-Vidt/public/assets/media-by-group` folder, in subfolders which then become the title of the `asset-group`. For instance: `TypeScript/Edt-Vidt/public/assets/media-by-group/SongTitle/001.jpg` will give you an asset called 001 in the content group `SongTitle`.  


## Using the system
The system is quite complex and consists of many parts that all have to be configured to 'see' each other on a network. We currently hard-code IP addresses into the code; these configuration files can be found in the `Shared` folder. If you plan to use this system for your own performance, take a look at those files and adjust where needed.
 
Almost every piece of code is currently work in progress, as we are trying to make the system more modular and easier to extend/adjust without having to hardcode settings that make it hard to update/merge. Please get in touch if you are interested in using the sytem, so we can help! Our goal is to make it easy for everyone to run their own light-show and build their own hardware, and create tutorials on how to build the LED strips etc.

To be continued! 
 
