import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { AsyncPipe } from '@angular/common';
import { PresetSwitchersComponent } from '../../components/preset-switchers/preset-switchers.component';

@Component({
    selector: 'app-preset-controller',
    template: `
        @if (presetState$ | async; as presetState) {
            <app-preset-switchers
                [presetState]="presetState"
            ></app-preset-switchers>
        }
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe, PresetSwitchersComponent],
})
export class PresetControllerComponent implements OnInit {
    presetState$ = Actions$.presetState.asObservable();

    ngOnInit(): void {}
}
