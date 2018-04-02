import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {edtPresets} from '../../../../Edt-Sledt/src/presets';

@Component({
  selector: 'app-page-switcher',
  template: `
    <div class="tabs">
      <ul>
        <li *ngFor="let link of presets">
          <a [routerLink]="link.path" routerLinkActive="active">{{link.title}}</a>
        </li>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSwitcherComponent implements OnInit {
  public presets = Array.from(edtPresets);

  constructor() {
  }

  ngOnInit() {
    console.log(this.presets);
  }

}
