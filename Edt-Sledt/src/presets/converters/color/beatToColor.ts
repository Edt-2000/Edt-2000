import {Subscription} from 'rxjs/Subscription';
import {IColor} from '../../../../../Shared/socket';
import {rescale} from '../../../../../Shared/utils';
import {PresetLogic} from '../../presets-logic';
import {Actions, Actions$, nextActionFromMsg} from '../../../../../Shared/actions';

export class BeatToColor extends PresetLogic {
    private hue: number = 0;
    private subscription: Subscription;

    protected _startPreset(): void {
        this.subscription = Actions$.mainBeat
            .subscribe(() => {
                // TODO: set to random set of colors instead of rotating h
                this.hue = (this.hue + rescale(60, 127, 0, 255)) % 255;
                const newColor: IColor = {
                    h: this.hue,
                    s: 255,
                    b: 255,
                };
                nextActionFromMsg(Actions.singleColor(newColor));
            });
    }

    protected _stopPreset(): void {
        if (typeof this.subscription !== 'undefined') this.subscription.unsubscribe();
    }

}
