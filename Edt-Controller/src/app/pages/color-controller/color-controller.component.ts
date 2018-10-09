import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {colorSets} from "../../../../../Shared/colors";

@Component({
  selector: 'app-color-controller',
  templateUrl: './color-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorControllerComponent implements OnInit {

  colorSets = colorSets;

  constructor() {
  }

  ngOnInit(): void {
  }
}

