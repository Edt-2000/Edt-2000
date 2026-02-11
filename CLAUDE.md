# Edt-2000 - Claude Developer Guide

> Live music performance visual system with synchronized lights and displays

## Quick Project Overview

**Edt-2000** is an open-source, live music visualization system that transforms musical inputs (MIDI, OSC, audio) into synchronized visual and lighting effects across multiple screens and LED strips. Originally built around a GameTrak controller, it's now a comprehensive collection of interconnected applications designed for small/medium live performances.

**Core Philosophy**: The system is told HOW to respond to music rather than requiring direct manual control—allowing lights and visuals to react organically to beats, drums, melody, and bass.

## Technology Stack

- **TypeScript 5.5.3** - Primary language across all applications
- **Node.js/Express** - Server backbone (Edt-Sledt)
- **RxJS 7.8.1** - Reactive programming (used extensively throughout)
- **Angular 18.1.1** - Web apps (Edt-Vidt, Edt-Controller)
- **Socket.IO** - Real-time client-server communication
- **OSC/MIDI** - Hardware device communication protocols
- **FastLED** - Arduino library for addressable LED strips

## Architecture Overview

### System Flow
```
MIDI/OSC/Audio Input → Edt-Sledt (server) → RxJS Action Streams → Output Devices (LEDs/Video/MIDI)
                             ↓
                       WebSocket Broadcast
                             ↓
                    Angular Web Apps (Vidt/Controller)
```

### Key Applications

1. **Edt-Sledt** (`TypeScript/Edt-Sledt/`) - Core orchestration server
   - Entry: `src/index.ts`
   - "Man in the middle" coordinating all devices
   - Runs preset chains that transform musical inputs to visual outputs
   - Listens on various ports for OSC/MIDI/WebSocket

2. **Edt-Vidt** (`TypeScript/Edt-Vidt/`) - Video display application
   - Entry: `src/main.ts` (port 4200)
   - Angular app with 20+ visual effect presets
   - Displays on large screens/projectors
   - Receives commands via WebSocket from Sledt

3. **Edt-Controller** (`TypeScript/Edt-Controller/`) - Remote control interface
   - Entry: `src/main.ts` (port 4201)
   - Angular app for performance control
   - Works on tablets/mobile during live shows
   - Sends commands to Sledt via WebSocket

4. **Edt-MOSCidi** (`TypeScript/Edt-MOSCidi/`) - MIDI↔OSC converter
   - Entry: `src/index.ts`
   - Bi-directional protocol bridge

5. **Edt-Launchpad** (`TypeScript/Edt-Launchpad/`) - Hardware controller
   - Entry: `src/index.ts`
   - Launchpad MIDI device integration

## Core Architectural Patterns

### 1. RxJS Reactive Architecture

**Every action flows through observables** - the entire system is event-driven.

**Actions Store** (`TypeScript/Shared/actions/actions.ts`):
- Central nervous system with 25+ observables
- Subjects for hot streams (events)
- BehaviorSubjects for stateful data
- `nextActionFromMsg()` routes incoming actions to appropriate observables

Example flow:
```
MIDI Input → mainDrum$ Observable
  → DrumSoundMap Converter (filters by note, emits mainDrumSound)
  → DrumSoundToBeat Converter (maps sound type to beat)
  → BeatToColor Converter (converts beat to color)
  → ColorToFastLedSolid Output (sends to LED hardware)
```

### 2. Preset Chain System

**Presets** are modular components that transform one type of input to another.

**Base Class**: `TypeScript/Edt-Sledt/src/presets/presets-logic.ts`
- Template methods: `startPreset()`, `stopPreset()`, `_startPreset()`, `_stopPreset()`
- Manages RxJS subscriptions and cleanup
- Provides mermaid diagram metadata for UI visualization

**Two Types**:
1. **Converters** (`src/presets/converters/`) - Transform inputs
   - 7 preset types (drum mapping, beat conversion, etc.)
   - Located in: `instruments/`, `beat/`

2. **Outputs** (`src/presets/outputs/`) - Send to devices
   - 9 preset types (LED effects, video displays, etc.)
   - Located in: `fastledt/`, `vidt/`, `spectacle/`

**Cues** (`config/cues/`) - Pre-programmed sequences that activate 5-10 presets at once

### 3. Device IO Abstraction

15+ device integrations in `TypeScript/Edt-Sledt/src/io/`:
- `edt-fastled.ts` - LED strip control
- `edt-vidt.ts` - Video display server
- `edt-controller.ts` - Remote control receiver
- `edt-audio.ts` - Audio analysis
- `edt-midi.ts` - MIDI I/O
- `edt-pedal.ts` - Foot pedal input
- `edt-guitar.ts`, `edt-drum.ts` - Game controller conversion
- Many more...

Each device adapter handles connection, message parsing, and action emission.

## Key Files Reference

### Configuration Files
- `TypeScript/Edt-Sledt/config/config.ts` - IP addresses, MIDI channels, OSC ports
- `TypeScript/Edt-Sledt/config/presets.ts` - Registry of all active presets
- `TypeScript/Edt-Sledt/config/cues/cues.ts` - Pre-programmed sequences
- `TypeScript/Edt-Sledt/config/modifiers.ts` - UI control options for presets
- `TypeScript/Edt-Sledt/config/launchpad.ts` - Button mappings

### Core Logic Files
- `TypeScript/Shared/actions/actions.ts` - Action definitions and reactive store (135 lines)
- `TypeScript/Edt-Sledt/src/presets/presets-logic.ts` - Abstract preset base class (84 lines)
- `TypeScript/Edt-Sledt/src/index.ts` - Main server entry point

### Shared Types
- `TypeScript/Shared/` - Types used across all applications
  - `actions/` - Action type definitions
  - `colors/` - Color utilities
  - `devices/` - Device types
  - `midi/` - MIDI protocol definitions
  - `osc/` - OSC protocol types
  - `vidt/` - Video preset enums

### Visual Effects
- `TypeScript/Edt-Vidt/src/app/views/` - 20+ display presets
  - Recent additions: `circles/` (Jan 2025), `spectrum/` (Nov 2024)

## Common Development Tasks

### Starting the System
```bash
cd TypeScript
./run.sh  # Launches all apps in tmux windows
```

This starts:
- Window 0: Edt-Sledt (server)
- Window 1: Edt-Vidt (display app)
- Window 2: Edt-Controller (control app)
- Window 3: Edt-Launchpad (hardware driver)

### Adding a New Visual Effect (Vidt)

1. Create component: `TypeScript/Edt-Vidt/src/app/views/my-effect/`
2. Subscribe to relevant actions from socket service
3. Add route in `app-routing.module.ts`
4. Add enum value in `TypeScript/Shared/vidt/animation-types.ts`
5. Create output preset in Sledt to trigger it

### Adding a New Preset

1. Create preset class extending `PresetLogic`
2. Implement `_startPreset()` and `_stopPreset()`
3. Subscribe to input action(s)
4. Transform and emit to output action(s)
5. Register in `config/presets.ts`
6. Add modifier in `config/modifiers.ts` (optional)

### Adding a New Device

1. Create adapter in `TypeScript/Edt-Sledt/src/io/edt-[device].ts`
2. Handle connection logic (OSC/MIDI/WebSocket)
3. Parse incoming messages and emit to actions
4. Subscribe to actions and send to device
5. Add config in `config/config.ts`
6. Initialize in `src/index.ts`

## Development Environment

### Directory Structure
```
TypeScript/
├── Shared/           # Shared types, actions, utilities
├── Edt-Sledt/        # Core server
├── Edt-Vidt/         # Display app (Angular)
├── Edt-Controller/   # Control app (Angular)
├── Edt-MOSCidi/      # MIDI↔OSC bridge
├── Edt-Launchpad/    # Hardware driver
├── package.json      # Monorepo root (workspaces)
└── run.sh            # tmux launcher
```

### Package Management
- Uses npm workspaces
- Root package.json defines 5 workspaces
- Shared dependencies hoisted to root node_modules

### Build Commands
```bash
# In TypeScript/Edt-Vidt or Edt-Controller
ng serve          # Development server
ng build          # Production build

# In TypeScript/Edt-Sledt
npm run dev       # Nodemon with hot reload
npm start         # Production start
```

## Important Context for Code Changes

### When Working with Actions
- Always use `nextActionFromMsg()` to emit actions
- Never directly modify observable streams
- Use FSA (Flux Standard Action) pattern for consistency
- Check `TypeScript/Shared/actions/actions.ts` for available actions

### When Working with Presets
- Always call `super.startPreset()` and `super.stopPreset()`
- Store subscriptions in class properties for cleanup
- Use `_startPreset()` and `_stopPreset()` for custom logic
- Test with modifiers for parameter control

### When Working with Colors
- Use utilities in `TypeScript/Shared/colors/`
- HSL is primary color space
- FastLED uses RGB, conversion available
- Beat-to-color mappings in converter presets

### When Working with Vidt Views
- Subscribe to socket service in ngOnInit
- Clean up subscriptions in ngOnDestroy
- Use RxJS operators for animation timing
- Asset paths: `/assets/media-by-group/[group]/[file]`

### Known Limitations
- IP addresses hardcoded in config (not ideal, noted in README)
- Some device connections require specific OS (Mac vs Linux)
- Launchpad requires physical hardware to test
- FastLED requires Arduino with custom firmware

## Testing Approach

- Limited automated tests currently
- Primary testing: Live performance validation
- Use Edt-Controller for manual preset testing
- Monitor console logs for connection status

## Project Statistics

- **Total TypeScript Files**: 118 (excluding node_modules)
- **Preset Converters**: 7 types
- **Preset Outputs**: 9 types
- **Device IO Modules**: 15+ integrations
- **Vidt Display Views**: 20+ visual presets
- **Dependencies**: 676+ packages

## Recent Development Activity

- **Jan 2025**: Circles effect added
- **Oct-Nov 2024**: Spectrum effects (lava, different colors)
- Active development with frequent preset additions

## System Philosophy

The Edt-2000 embraces **declarative, music-reactive design**:

1. **Listen** to musical inputs (MIDI drums, bass, melody, audio analysis)
2. **Interpret** through preset chains (recognize beats, identify instruments)
3. **Express** through coordinated outputs (LED colors, video effects, text)

Rather than manual triggering, the system "understands" music and responds automatically. A drummer hitting kick, snare, and hi-hat triggers different visual effects; multiple presets create emergent visual behaviors.

This makes performances feel **alive and synchronized**, creating immersive experiences on a DIY budget.

## Tips for Claude

1. **Read before modifying**: Always read existing presets/components before suggesting changes
2. **Follow patterns**: New code should match existing architectural patterns
3. **Test impact**: Consider how changes affect the entire preset chain
4. **Check dependencies**: Changes to Shared/ affect all applications
5. **Use RxJS idiomatically**: Leverage operators, avoid imperative callbacks
6. **Preserve modularity**: Keep presets small and composable
7. **Document connections**: Update this file when adding major features

## Useful Commands

```bash
# Start everything
cd TypeScript && ./run.sh

# Install dependencies
npm install

# Format code
npx prettier --write .

# Search for action usage
grep -r "mainDrum\$" TypeScript/

# Find preset references
grep -r "DrumSoundMap" TypeScript/Edt-Sledt/

# List all Vidt views
ls TypeScript/Edt-Vidt/src/app/views/
```

---

**Last Updated**: January 2026
**Project Version**: Active development (master branch)
