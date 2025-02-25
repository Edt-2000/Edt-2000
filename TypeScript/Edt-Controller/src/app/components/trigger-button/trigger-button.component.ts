import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SocketService } from '../../socket.service';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { IColor } from '../../../../../Shared/colors/types';

@Component({
  selector: 'app-trigger-button',
  template: `
    <button
      class="trigger-button"
      (click)="socket.sendColor(color)"
      [style.background-color]="getColorString(color)"
    ></button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class TriggerButtonComponent {
  @Input() color!: IColor;

  constructor(
    public socket: SocketService,
    private sanitizer: DomSanitizer,
  ) {}

  getColorString(color: IColor): SafeStyle {
    return ColorHelper.getRGBString([color]);
  }
}
