import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-preset-controller',
  template: `
    <p>
      preset-controller works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetControllerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
