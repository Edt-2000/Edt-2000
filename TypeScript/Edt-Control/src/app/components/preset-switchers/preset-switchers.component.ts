import { Component, Input } from '@angular/core';
import { GroupedControlPresetMsg, IControlPresetMsg } from '../../../../../Shared/actions/types';
import { convertToNamedPresetGroup } from '../../../../../Shared/presets/utils';

@Component({
  selector: 'app-preset-switchers',
  template: `
    <ng-container *ngIf="groupedPresetState">
      <ul class="tab">
        <li class="tab__item" *ngFor="let group of groupedPresetState">
          <button class="tab__link"
                  (click)="currentGroup = group.title"
                  [class.is-active]="
                            currentGroup === group.title
                          "
          >{{group.title}}</button>
        </li>
      </ul>
      <div *ngFor="let group of groupedPresetState">
        <ng-container *ngIf="currentGroup === group.title">
          <h1>{{group.title}}</h1>
          <ul class="list list--presets">
            <li class="list__item" *ngFor="let preset of group.presets">
              <app-preset-switcher [preset]="preset"></app-preset-switcher>
            </li>
          </ul>
        </ng-container>
      </div>
    </ng-container>
  `,
  styles: [],
})
export class PresetSwitchersComponent {
  groupedPresetState: GroupedControlPresetMsg[] = [];
  currentGroup: string;

  constructor() {
  }

  @Input() set presetState(presetStates: IControlPresetMsg[]) {
    this.groupedPresetState = convertToNamedPresetGroup(presetStates);
    this.currentGroup =
      this.currentGroup
        ? this.currentGroup
        : this.groupedPresetState[0] && this.groupedPresetState[0].title || '';
  }

}
