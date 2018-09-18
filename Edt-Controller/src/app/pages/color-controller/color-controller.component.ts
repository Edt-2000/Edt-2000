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

    sendMultiColor(hues: number[]) {
        this.socket.toSledt(Actions.multiColor(hues.map((hue) => ({
            hue: hue,
            saturation: 255,
            brightness: 255
        }))))

    }

    getRGBString(colors: number[][]) {
        const colorArray =  colors.map((color) => {
            return {
                hue: color[0],
                saturation: color[1],
                brightness: color[2]
            }
        });

        return ColorHelper.getRGBString(colorArray);
    }

    getStyle(colors: number[][]) {
        const rgbString = this.getRGBString(colors);
        return {
            'background': rgbString
        };
    }

    getMultiStyle(hues: number[]) {
        const hsvArray = hues.map((hue) => {
            return [hue, 255, 255];
        });

        return this.getStyle(hsvArray);
    }
}
