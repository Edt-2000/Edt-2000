import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { PresetSwitchersComponent } from '../../components/preset-switchers/preset-switchers.component';

@Component({
  selector: 'app-preset-controller',
  template: `
    <ng-container *ngIf='(presetState$ | async) as presetState'>
      <app-preset-switchers [presetState]='presetState'></app-preset-switchers>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    PresetSwitchersComponent,
    NgIf,
  ],
})
export class PresetControllerComponent implements OnInit {
  presetState$ = Actions$.presetState.asObservable();

  ngOnInit(): void {
  }
}
