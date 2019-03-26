import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SocketService } from '../../socket.service';
import { IColor } from '../../../../../Shared/types';
import { ColorHelper } from '../../../../../Shared/helpers/hsv-2-rgb';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-trigger-button',
  template: `
    <button
      class="trigger-button"
      (click)="sendColor(colorArr)"
      [style.background-color]="bgColor"
    ></button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriggerButtonComponent {
  colorArr: IColor[];
  bgColor: SafeStyle;

  constructor(public socket: SocketService, private sanitizer: DomSanitizer) {
  }

  @Input() set colors(colors: IColor[]) {
    // TODO FIX ANNOYING FRIGGING ANGULAR SANITIZE SHIZZLE
    this.bgColor = ColorHelper.getRGBString(colors);
    this.colorArr = colors;
  }

  sendColor(colorArr: IColor[]) {
    if (colorArr.length === 1) {
      this.socket.sendColor(colorArr[0]);
    } else {
      this.socket.sendMultiColor(colorArr);
    }
  }
}
