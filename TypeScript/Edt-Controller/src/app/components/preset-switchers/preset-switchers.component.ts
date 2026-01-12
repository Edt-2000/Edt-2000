import { Component, Input } from '@angular/core';
import {
    GroupedControlPresetMsg,
    IControlPresetMsg,
} from '../../../../../Shared/actions/types';
import { convertToNamedPresetGroup } from '../../../../../Shared/presets/utils';
import { PresetSwitcherComponent } from '../preset-switcher/preset-switcher.component';

@Component({
    selector: 'app-preset-switchers',
    template: `
        @if (groupedPresetState) {
            <ul class="tab">
                @for (group of groupedPresetState; track $index) {
                    <li class="tab__item">
                        <button
                            class="tab__link"
                            (click)="currentGroup = group.title"
                            [class.is-active]="currentGroup === group.title"
                        >
                            {{ group.title }}
                        </button>
                    </li>
                }
            </ul>
            @for (group of groupedPresetState; track $index) {
                <div>
                    @if (currentGroup === group.title) {
                        <h1>{{ group.title }}</h1>
                        <ul class="list list--presets">
                            @for (preset of group.presets; track $index) {
                                <li class="list__item">
                                    <app-preset-switcher
                                        [preset]="preset"
                                    ></app-preset-switcher>
                                </li>
                            }
                        </ul>
                    }
                </div>
            }
        }
    `,
    styles: [],
    standalone: true,
    imports: [PresetSwitcherComponent],
})
export class PresetSwitchersComponent {
    groupedPresetState: GroupedControlPresetMsg[] = [];
    currentGroup?: string;

    constructor() {}

    @Input() set presetState(presetStates: IControlPresetMsg[]) {
        this.groupedPresetState = convertToNamedPresetGroup(presetStates);
        this.currentGroup = this.currentGroup
            ? this.currentGroup
            : (this.groupedPresetState[0] &&
                  this.groupedPresetState[0].title) ||
              '';
    }
}
