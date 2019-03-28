import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { colorSets } from "../../../../../Shared/colors";
import { Actions$ } from "../../../../../Shared/actions";

@Component({
  selector: 'app-color-controller',
  templateUrl: './color-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorControllerComponent implements OnInit {
  colorSets = colorSets;
  currentColorSet$ = Actions$.colorPalette;

  constructor() {
  }

  ngOnInit(): void {
  }
}
