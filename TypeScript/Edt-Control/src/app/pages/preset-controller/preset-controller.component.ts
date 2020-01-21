import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';

@Component({
  selector: 'app-preset-controller',
  template: `
    <ng-container *ngIf="(presetState$ | async) as presetState">
      <app-preset-switchers [presetState]="presetState"></app-preset-switchers>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetControllerComponent implements OnInit {
  presetState$ = Actions$.presetState.asObservable();

  ngOnInit(): void {
  }
}
