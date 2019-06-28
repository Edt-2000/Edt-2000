import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions';
import { map } from 'rxjs/operators';
import { converToNamedPresetGroup } from '../../../../../Shared/modifiers';

@Component({
  selector: 'app-preset-controller',
  template: `
    <ng-container *ngIf="(presetState$ | async) as presetState">
      <div *ngFor="let group of presetState;">
        <h1>{{group.title}}</h1>
        <ul class="list list--presets">
          <li class="list__item" *ngFor="let preset of group.presets">
            <app-preset-switcher [preset]="preset"></app-preset-switcher>
          </li>
        </ul>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetControllerComponent implements OnInit {
  presetState$ = Actions$.presetState.asObservable().pipe(map(converToNamedPresetGroup));

  ngOnInit (): void {
  }
}
