import { Box } from 'ink';
import * as React from 'react';
import { connectedControls$ } from '../outputs/edt-control';
import { useObservable } from './observable.hook';
import { connectedVidt$ } from '../outputs/edt-vidt';
import { connectedLaunchpad$ } from '../outputs/edt-launchpad';
import { Actions$, emptyContentGroup } from '../../../Shared/actions/actions';
import { blackColor } from '../../../Shared/colors/utils';
import { VidtPresets } from '../../../Shared/vidt-presets';
import { OSCOutput$ } from '../communication/osc';
import { map, scan } from 'rxjs/operators';
import { OperatorFunction } from 'rxjs';

export const EdtConsole = () => {

    const connectedControl = useObservable(connectedControls$, []);
    const connectedVidt = useObservable(connectedVidt$, []);
    const connectedLaunchpad = useObservable(connectedLaunchpad$, []);
    const currentSong = useObservable(Actions$.contentGroup, emptyContentGroup);
    const color = useObservable(Actions$.singleColor, blackColor);
    const vidtPreset = useObservable(Actions$.prepareVidt, VidtPresets.____EMPTY____);
    const presetState = useObservable(Actions$.presetState, []);
    const OSCOutput = useObservable(OSCOutput$, '');
    const drumSounds = useObservable(Actions$.mainDrumSound.pipe(bufferRing(10), map(ring => ring.join('\n'))), '');

    return <>
        CurrentSong: {JSON.stringify(currentSong ? currentSong.title : '')}
        Color: {JSON.stringify(color)}
        VidtPreset: {VidtPresets[vidtPreset]}
        <Box>--------</Box>
        Control's connected:
        <Box>--------</Box>
        {connectedControl.map(title => <Box key={title}>{title}</Box>)}
        <Box>--------</Box>
        Vidt's connected:
        <Box>--------</Box>
        {connectedVidt.map(title => <Box key={title}>{title}</Box>)}
        <Box>--------</Box>
        Launchpad's connected:
        <Box>--------</Box>
        {connectedLaunchpad.map(title => <Box key={title}>{title}</Box>)}
        <Box>--------</Box>
        Active presets:
        <Box>--------</Box>
        {
            presetState
                .filter(preset => preset.state)
                .map(preset => <Box key={preset.title}>{preset.title} ({preset.modifier})</Box>)
        }
        <Box>--------</Box>
        OSC Messages:
        <Box>--------</Box>
        DrumSounds:
        <Box>--------</Box>
        {drumSounds}
        <Box>--------</Box>
        {OSCOutput}
    </>;
};

function bufferRing<T>(size: number): OperatorFunction<T, T[]> {
    return scan((acc, curr) => [curr, ...acc].slice(0, size), []);
}
