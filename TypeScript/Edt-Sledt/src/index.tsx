import { filter } from 'rxjs/operators';
import { presetMidi$ } from './inputs/midi';
import { merge } from 'rxjs/observable/merge';
import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions';
import { getPresetState, presets } from './presets/presets';
import * as React from 'react';
import { Fragment } from 'react';
import { Box, render } from 'ink';
import { MidiAutomationInput } from './inputs/midi-automation';
import { EdtVidtSetup } from './outputs/edt-vidt';
import { MidiAutomationOutput } from './outputs/midi-automation';
import { EdtControlSetup } from './outputs/edt-control';
import { AssetScanDir } from './asset-scan-dir';
import { CueListSetup } from './cues/cues';
import { IControlPresetMsg } from '../../Shared/types';

const { rerender } = render(<Demo presetState={getPresetState()}/>);

merge(presetMidi$, Actions$.presetChange)
    .pipe(filter(msg => presets[msg.preset]))
    .subscribe(msg => {
        if (msg.state) {
            presets[msg.preset].startPreset(msg.modifier);
        } else {
            presets[msg.preset].stopPreset();
        }
        rerender(<Demo presetState={getPresetState()}/>);
    });

nextActionFromMsg(Actions.presetState(getPresetState()));
const loaders = {
    MidiAutomationInput,
    MidiAutomationOutput,
    EdtVidtSetup,
    EdtControlSetup,
    AssetScanDir,
    CueListSetup,
};

function Demo({ presetState }: { presetState: IControlPresetMsg[] }) {
    return <Fragment>
        <Box>--------</Box>
        {presetState.map(({ title, state, preset }) => {
            return <Box key={preset}>
                {title} is {state ? 'active' : 'inactive'}
            </Box>;
        })}
    </Fragment>;
}
