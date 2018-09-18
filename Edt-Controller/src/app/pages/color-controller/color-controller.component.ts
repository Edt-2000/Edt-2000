import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SocketService} from '../../socket.service';
import {ColorHelper} from '../../../../../Shared/helpers/hsv-2-rgb';

@Component({
  selector: 'app-color-controller',
  templateUrl: './color-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorControllerComponent implements OnInit {

  constructor(
    public socket: SocketService
  ) {
  }

  ngOnInit(): void {
  }

  getRGBString(colors: number[][]) {
    const colorArray = colors.map((color) => {
      return {
        hue: color[0],
        saturation: color[1],
        brightness: color[2]
      }
    });

    return ColorHelper.getRGBString(colorArray);
  }

  getStyle(colors: number[][]) {
    return {
      'background': this.getRGBString(colors)
    };
  }

  getMultiStyle(hues: number[]) {
    return this.getStyle(hues.map((hue) => [hue, 255, 255]));
  }
}

