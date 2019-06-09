import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Actions$ } from "../../../../../Shared/actions";
import { IControlPresetMsg, ModifierGroup } from "../../../../../Shared/types";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-preset-controller",
  template: `
    <ng-container *ngIf="(presetState$ | async) as presetState">
      <ng-container *ngFor="let group of presetState">
        <h1>{{group.title}}</h1>
        <ul class="list list--presets">
          <li class="list__item" *ngFor="let preset of group.presets">
            <app-preset-switcher [preset]="preset"></app-preset-switcher>
          </li>
        </ul>
      </ng-container>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetControllerComponent implements OnInit {
  presetState$: Observable<{ title: string, presets: IControlPresetMsg }[]> = Actions$.presetState.asObservable().pipe(
    map((presets: IControlPresetMsg[]) => {
      return Object.values(presets.reduce((grouped, preset) => {
        if (!grouped[preset.config.group]) {
          grouped[preset.config.group] = {
            title: ModifierGroup[preset.config.group],
            presets: [],
          };
        }
        grouped[preset.config.group].presets.push(preset);
        return grouped;
      }, {}));
    }),
  );

  constructor() {
  }

  ngOnInit(): void {
  }
}
