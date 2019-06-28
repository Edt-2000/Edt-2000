import { IControlPresetMsg } from '../../../Shared/types';
import { Box, Color } from 'ink';
import * as React from 'react';

export const EdtConsole = (
    {
        vidts,
        controls,
        presetState,
    }: {
        vidts: string[],
        controls: string[],
        presetState: IControlPresetMsg[],
    },
) => {
    return <>
        <Box>--------</Box>
        States state:
        <Box>--------</Box>
        {
            presetState
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
    </>;
};
