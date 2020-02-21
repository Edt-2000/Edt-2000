import { Box } from 'ink';
import * as React from 'react';
import { connectedControls$ } from '../outputs/edt-control';
import { useObservable } from './observable.hook';
import { connectedVidt$ } from '../outputs/edt-vidt';
import { combinedState$ } from '../../../Shared/actions/actions';

export const EdtConsole = () => {

    const connectedControl = useObservable(connectedControls$, []);
    const connectedVidt = useObservable(connectedVidt$, []);
    // @ts-ignore // we don't have a type for combinedState$(yet)
    const combinedState = useObservable(combinedState$, {});

    return <>
        <Box>--------</Box>
        Control's connected:
        <Box>--------</Box>
        {connectedControl.map(title => <Box key={title}>{title}</Box>)}
        <Box>--------</Box>
        Vidt's connected:
        <Box>--------</Box>
        {connectedVidt.map(title => <Box key={title}>{title}</Box>)}
    </>;
};
