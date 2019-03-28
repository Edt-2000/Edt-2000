import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { SocketService } from "../../socket.service";
import { IColor } from "../../../../../Shared/types";
import { ColorHelper } from "../../../../../Shared/helpers/hsv-2-rgb";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";

@Component({
    selector: "app-trigger-button",
    template: `
    <button
      class="trigger-button"
      (click)="sendColor(color)"
      [style.background-color]="getColorString(color)"
    ></button>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TriggerButtonComponent {

    @Input() color: IColor;

    constructor(
        public socket: SocketService,
        private sanitizer: DomSanitizer
    ) {
    }

    getColorString(color: IColor): SafeStyle {
        return ColorHelper.getRGBString([color]);
    }

    sendColor(color: IColor) {
        this.socket.sendColor(color);
    }
}
