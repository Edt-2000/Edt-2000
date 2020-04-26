import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SocketService } from '../../socket.service';
import { Actions$ } from '../../../../../Shared/actions/actions';

@Component({
  selector: 'app-color-controller',
  templateUrl: './color-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorControllerComponent {
  // TODO: ColorSets should be injected somehow or send through `Actions$`
  colorSets$ = Actions$.colorPalettes;
  currentColorSet$ = Actions$.colorPalette;

  constructor(
    public socketService: SocketService,
  ) {
  }
}
