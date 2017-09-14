import {edtPreset, midiCCMsg} from '../../types';
import {Subscription} from 'rxjs/Subscription';
import {CC, filteredNoteOn} from '../../communication/midi';
import 'rxjs/add/operator/filter';
import {changeVideoSrcMsg, intensityMsg, preparePresetMsg, VidtPresets} from '../../../../SharedTypes/socket';
import {sendToVidt} from '../../communication/socket';
import {EdtColor} from '../../outputs/shared-subjects';

export class drumVideoTrigger implements edtPreset {
    private _triggerSubscriber: Subscription;

    constructor() {
    }

    startPreset(velocity: number): void {
        sendToVidt(<preparePresetMsg>{
            preset: VidtPresets.HackerTv
        });

        filteredNoteOn
            .withLatestFrom(CC)
            .subscribe((msgs) => {
                // msgs[0].color;
                if (msgs[1].controller === 102) {
                    sendToVidt(<intensityMsg>{
                        intensity: msgs[1].value
                    })
                }
            });

    }

    stopPreset(): void {
        if (typeof this._triggerSubscriber !== 'undefined') this._triggerSubscriber.unsubscribe();
    }

}
