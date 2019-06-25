import { ChangeDetectionStrategy, Component } from "@angular/core";
import { colorSets } from "../../../../../Shared/colors";
import { Actions$ } from "../../../../../Shared/actions";
import { SocketService } from "../../socket.service";

@Component({
  selector: "app-color-controller",
  templateUrl: "./color-controller.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorControllerComponent {
  colorSets = colorSets;
  currentColorSet$ = Actions$.colorPalette;

  constructor(
    public socketService: SocketService,
  ) {
  }
}
