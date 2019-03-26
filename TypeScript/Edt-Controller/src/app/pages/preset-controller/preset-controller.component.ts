import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions';
import { IControlPresetMsg } from '../../../../../Shared/types';

interface presetStateGrouped {
  [key: number]: IControlPresetMsg[];
}

@Component({
  selector: 'app-preset-controller',
  template: `
    <ul class="list list--presets" *ngIf="(presetState$ | async) as presets">
      <li class="list__item" *ngFor="let preset of presets">
        <app-preset-switcher [preset]="preset"></app-preset-switcher>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetControllerComponent implements OnInit {
  presetState$ = Actions$.presetState.asObservable();

  constructor() {
  }

  ngOnInit(): void {
  }
}
