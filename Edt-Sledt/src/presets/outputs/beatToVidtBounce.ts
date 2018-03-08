import {Subscription} from 'rxjs/Subscription';
import {drumTriggerOn$} from '../../inputs/musicTriggers';
import {filter} from 'rxjs/operators';
import {sendToVidt} from '../../outputs/edt-vidt';
import {IIntensityMsg} from '../../../../SharedTypes/socket';
import {IEdtPresetLogic} from '../presets';

export class BeatToVidtBounce implements IEdtPresetLogic {
    private subscriber: Subscription;

    public startPreset(listenTo: number): void {
        this.subscriber = drumTriggerOn$.pipe(
            filter((drumNote) => listenTo === drumNote)
        )
            .subscribe((note) => {
                sendToVidt({
                    intensity: 100
                } as IIntensityMsg)
            });
    }

    public stopPreset(): void {
        if (typeof this.subscriber !== 'undefined') {
            this.subscriber.unsubscribe();
        }
    }

}
