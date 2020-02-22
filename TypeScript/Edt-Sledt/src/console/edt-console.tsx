import { Box } from 'ink';
import * as React from 'react';
import { connectedControls$ } from '../outputs/edt-control';
import { useObservable } from './observable.hook';
import { connectedVidt$ } from '../outputs/edt-vidt';
import { connectedLaunchpad$ } from '../outputs/edt-launchpad';
import { Actions$ } from '../../../Shared/actions/actions';
import { blackColor } from '../../../Shared/colors/utils';

export const EdtConsole = () => {

    const connectedControl = useObservable(connectedControls$, []);
    const connectedVidt = useObservable(connectedVidt$, []);
    const connectedLaunchpad = useObservable(connectedLaunchpad$, []);
    const color = useObservable(Actions$.singleColor, blackColor);
    const colorPalette = useObservable(Actions$.colorPalette, []);

    return <>
        Color: {JSON.stringify(color)}
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
    </>;
};
