import { Box, Color } from 'ink';
import * as React from 'react';
import { IControlPresetMsg } from '../../../Shared/actions/types';

export const EdtConsole = (
    {
        vidts,
        controls,
        presetState,
        imageSrc,
        mainText,
        OSCOutput,
    }: {
        vidts: string[],
        controls: string[],
        presetState: IControlPresetMsg[],
        imageSrc: string,
        mainText: string,
        OSCOutput: string[],
    },
) => {
    return <>
        <Box>--------</Box>
        States state:
        <Box>--------</Box>
        {
            presetState
                .filter(({state}) => !!state)
                .map(({title, state, preset, modifier}) => {
                        return <Box key={preset}>
                            {title} is {state ? <Color greenBright>active</Color> : <Color red>inactive</Color>} ({modifier})
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
        ImageSrc: {imageSrc}
        <Box>--------</Box>
        MainText: {mainText}
        <Box>--------</Box>
        Last OSC message send:
        <Box>--------</Box>
        {OSCOutput.map((message, index) => <Box key={index}>{message}</Box>)}
    </>;
};
