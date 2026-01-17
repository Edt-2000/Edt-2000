import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocketService } from '../../socket.service';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { map } from 'rxjs';
import { TriggerButtonComponent } from '../../components/trigger-button/trigger-button.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-color-controller',
    templateUrl: './color-controller.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [TriggerButtonComponent, AsyncPipe],
})
export class ColorControllerComponent {
    colorPalettes$ = Actions$.contentGroup.pipe(
        map((group) => group.colorPalettes),
    );
    currentColorSet$ = Actions$.colorPalette;

    constructor(public socketService: SocketService) {}
}
