import { Box } from 'ink';
import * as React from 'react';
import { connectedControls$ } from '../outputs/edt-control';
import { useObservable } from './observable.hook';
import { connectedVidt$ } from '../outputs/edt-vidt';
import { connectedLaunchpad$ } from '../outputs/edt-launchpad';
import { Actions$, emptyContentGroup } from '../../../Shared/actions/actions';
import { blackColor } from '../../../Shared/colors/utils';
import { VidtPresets } from '../../../Shared/vidt-presets';

export const EdtConsole = () => {

    const connectedControl = useObservable(connectedControls$, []);
    const connectedVidt = useObservable(connectedVidt$, []);
    const connectedLaunchpad = useObservable(connectedLaunchpad$, []);
    const currentSong = useObservable(Actions$.contentGroup, emptyContentGroup);
    const color = useObservable(Actions$.singleColor, blackColor);
    const vidtPreset = useObservable(Actions$.prepareVidt, VidtPresets.____EMPTY____);
    const presetState = useObservable(Actions$.presetState, []);

    return <>
        CurrentSong: {JSON.stringify(currentSong.title)}
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
    </>;
};
