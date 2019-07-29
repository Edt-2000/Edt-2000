import { IControlPresetMsg } from '../../../Shared/helpers/types';
import { Box, Color } from 'ink';
import * as React from 'react';

export const EdtConsole = (
    {
        vidts,
        controls,
        presetState,
        latestOSC,
    }: {
        vidts: string[],
        controls: string[],
        presetState: IControlPresetMsg[],
        latestOSC: string[],
    },
) => {
    return <>
        <Box>--------</Box>
        States state:
        <Box>--------</Box>
        {
            presetState
                .filter(({state}) => !!state)
                .map(({title, state, preset}) => {
                        return <Box key={preset}>
                            {title} is {state ? <Color greenBright>active</Color> : <Color red>inactive</Color>}
                        </Box>;
                    },
                )
        }
        <Box>--------</Box>
        Vidt's connected:
        <Box>--------</Box>
        {vidts.map(title => <Box key={title}>{title}</Box>)}
        <Box>--------</Box>
        Control's connected:
        <Box>--------</Box>
        {controls.map(title => <Box key={title}>{title}</Box>)}
        <Box>--------</Box>
        Last OSC message:
        <Box>--------</Box>
        {latestOSC.map((message, index) => <Box key={index}>{message}</Box>)}
    </>;
};
