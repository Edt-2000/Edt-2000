import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-push-button',
  template: `
    <div class="push-button">
      <div class="push-button__internal"></div>
    </div>
  `,
  styleUrls: ['./push-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PushButtonComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
