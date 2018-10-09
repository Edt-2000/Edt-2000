import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Colors} from "../../../../../Shared/colors";

@Component({
  selector: 'app-color-controller',
  templateUrl: './color-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorControllerComponent implements OnInit {

  colors: Colors;

  constructor() {
  }

  ngOnInit(): void {
  }
}

