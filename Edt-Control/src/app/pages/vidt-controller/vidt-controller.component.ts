import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SocketService} from '../../socket.service';
import {Actions} from '../../../../../Shared/actions';

@Component({
    selector: 'app-vidt-controller',
    template: `
        <div class="columns is-multiline">
            <div class="column is-2">
                <button class="button is-large" (click)="sendBeat()">
                    BEAT
                </button>

                <button class="button is-large" (click)="sendColor(0, 100, 100)" style="background-color: #ff0000;">
                    RED
                </button>

                <button class="button is-large" (click)="sendColor(120, 100, 100)" style="background-color: #00ff01;">
                    GREEN
                </button>
                
                <button class="button is-large" (click)="sendColor(240, 100, 100)" style="background-color: #0200ff;">
                    BLUE
                </button>
            </div>
        </div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VidtControllerComponent implements OnInit {

    constructor(private socket: SocketService) {
    }

    ngOnInit() {
    }

    sendBeat() {
        this.socket.toSledt(Actions.mainBeat(127));
    }

    sendColor(hue, saturation, brightness) {
        this.socket.toSledt(Actions.singleColor({
            hue,
            saturation,
            brightness,
        }))
    }

}
