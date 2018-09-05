import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Actions } from '../../../../../Shared/actions';
import { SocketService } from '../../socket.service';

@Component({
    selector: 'app-color-controller',
    templateUrl: './color-controller.component.html',
    styleUrls: ['./color-controller.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorControllerComponent implements OnInit {

    constructor(private socket: SocketService) {
    }

    ngOnInit(): void {
    }

    sendColor(hue, saturation, brightness) {
        this.socket.toSledt(Actions.singleColor({
            hue,
            saturation,
            brightness,
        }))
    }

    sendMultiColor(colors: number[]) {
        this.socket.toSledt(Actions.multiColor(colors.map((color) => ({
            hue: color,
            saturation: 255,
            brightness: 255,
        }))))
    }

}
