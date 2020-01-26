import { Box } from 'ink';
import * as React from 'react';
import { connectedControls$ } from '../outputs/edt-control';
import { useObservable } from './observable.hook';

export const EdtConsole = () => {

    const connectedControl = useObservable(connectedControls$, []);

    // combinedState$,
    // lastOSCMessages(10),

    return <>
        <Box>--------</Box>
        Control's connected:
        <Box>--------</Box>
        {connectedControl.map(title => <Box key={title}>{title}</Box>)}
    </>;
};


