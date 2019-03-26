import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IControlPresetMsg } from '../../../../../Shared/types';
import { SocketService } from '../../socket.service';
import { Note } from '../../../../../Shared/midi';

@Component({
  selector: 'app-preset-switcher',
  template: `
    <div class="preset-switcher">
      <button
        class="text-button text-button--white-outline preset-switcher__main"
        (click)="
          socket.changePreset(preset.preset, !preset.state, preset.modifier)
        "
        [class.is-active]="preset.state"
      >
        <span>{{ noteName }}: {{ preset.title }} ({{ preset.modifier }})</span>
      </button>
      <ul class="list">
        <ng-container *ngIf="'preset.config.select'">
          <li class="list__item" *ngFor="let select of preset.config.select">
            <button
              class="text-button button--white preset-switcher__sub"
              [class.is-selected]="select.value === preset.modifier"
              [class.is-active]="
                preset.state && select.value === preset.modifier
              "
              (click)="socket.changePreset(preset.preset, true, select.value)"
            >
              <span>{{ select.label }} ({{ select.value }})</span>
            </button>
          </li>
        </ng-container>
      </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresetSwitcherComponent implements OnInit {
  @Input() preset: IControlPresetMsg;
  noteName: string;

  constructor(public socket: SocketService) {
  }

  ngOnInit() {
    this.noteName = Note[this.preset.preset]
      .replace('_', '-')
      .replace('$', '#');
  }
}
