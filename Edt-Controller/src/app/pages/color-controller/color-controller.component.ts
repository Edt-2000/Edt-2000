import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Actions } from '../../../../../Shared/actions';
import { SocketService } from '../../socket.service';
import { ColorHelper } from '../../../../../Shared/helpers/hsv-2-rgb';

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

    setStyles(colors: number[][]) {
        const colorArray =  colors.map((color) => {
            return {
                hue: color[0],
                saturation: color[1],
                brightness: color[2],
            }
        });

        const bcgColor = ColorHelper.getRGBString(colorArray);
        return `background: ${bcgColor}`;
    }

}
