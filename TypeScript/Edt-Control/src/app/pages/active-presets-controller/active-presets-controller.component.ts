import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-active-presets-controller',
  template: `
    <ng-container *ngIf="(presets$ | async) as presets">
      <ul class="list list--presets">
        <li class="list__item" *ngFor="let preset of presets">
          <app-preset-switcher [preset]="preset"></app-preset-switcher>
        </li>
      </ul>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivePresetsControllerComponent implements OnInit {
  presets$ = Actions$.presetState.asObservable().pipe(
    map(presets => presets.filter(preset => preset.state)),
  );

  ngOnInit(): void {
  }
}
