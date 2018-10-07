import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-color-controller',
  templateUrl: './color-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorControllerComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}

