import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-color-controller',
  template: `
    <p>
      color-controller works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorControllerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
