import { filter, scan, startWith, tap } from 'rxjs/operators';
import { Actions, Actions$, nextActionFromMsg } from '../../Shared/actions';
import { getPresetState, presets } from './presets/presets';
import * as React from 'react';
import { render } from 'ink';
import { availablePhotos, availableVideos } from './asset-scan-dir';
import { presetCues } from './cues/cues';
import { EdtConsole } from './outputs/edt-console';
import { connectedControls$ } from './outputs/edt-control';
import { connectedVidt$ } from './outputs/edt-vidt';
import { combineLatest } from 'rxjs';
import { OSCOutput$ } from './communication/osc';

const {rerender} = render(<></>);

Actions$.presetChange.pipe(
    filter(msg => presets[msg.preset]),
    tap(msg => {
        if (msg.state) {
            presets[msg.preset].startPreset(msg.modifier);
        } else {
            presets[msg.preset].stopPreset();
        }
    }),
).subscribe();

combineLatest(
    connectedVidt$,
    connectedControls$,
    Actions$.presetState,
    OSCOutput$.pipe(
        startWith(''),
        scan<string>((mostRecent, current) => [...mostRecent, current].slice(-9), []),
    ),
).pipe(
    tap(([vidts, controls, presetState, latestOSC]) => {
        rerender(<EdtConsole vidts={vidts} controls={controls} presetState={presetState} latestOSC={latestOSC}/>);
    }),
).subscribe();

// Emit initial actions to kick things off
nextActionFromMsg(Actions.presetState(getPresetState()));
nextActionFromMsg(Actions.cueList(presetCues));
nextActionFromMsg(Actions.imageList(availablePhotos));
nextActionFromMsg(Actions.videoList(availableVideos));
