import { Component, ViewEncapsulation } from '@angular/core';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
    selector: 'edt-vista',
    templateUrl: './vista.component.html',
    styleUrl: './vista.component.scss',
    encapsulation: ViewEncapsulation.None,
})
export class VistaComponent {
    protected readonly createFilledArray = createFilledArray;
}
