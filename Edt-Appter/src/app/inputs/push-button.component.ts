import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-push-button',
  template: `
    <p>
      push-button works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PushButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
