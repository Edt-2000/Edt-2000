import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {SocketService} from "../../socket.service";
import {IColor} from "../../../../../Shared/types";
import {ColorHelper} from "../../../../../Shared/helpers/hsv-2-rgb";

@Component({
  selector: 'app-trigger-button',
  template: `
    <ng-container *ngIf="colors.length === 1; else multiColor">
      <button
        class="trigger-button trigger-button--square trigger-button--no-border"
        (click)="socket.sendColor(colors[0])"
        [style.backgroundColor]="getStyle(colors[0])"></button>
    </ng-container>
    <ng-template #multiColor>
        <button 
          class="trigger-button trigger-button--square trigger-button--no-border"
          (click)="socket.sendMultiColor(colors)" 
          [style.backgroundColor]="getMultiStyle(colors)"></button>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TriggerButtonComponent implements OnInit {
  @Input() colors: IColor[];

  constructor(
    public socket: SocketService,
  ) {
  }

  ngOnInit() {
  }

  getStyle(color: IColor) {
    return ColorHelper.getRGBString([color]);
  }

  // TODO: insafe style... hmm
  getMultiStyle(colors: IColor[]) {
    return ColorHelper.getRGBString(colors);
  }
}
