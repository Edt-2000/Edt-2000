import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-toggle-button',
  template: `
    <p>
      toggle-button works!
    </p>
  `,
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
