import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
} from '@angular/core';
import {
  LaunchpadPage,
  TriggerType,
} from '../../../../../Shared/actions/types';
import { SocketService } from '../../socket.service';
import { IColor } from '../../../../../Shared/colors/types';
import { SafeStyle } from '@angular/platform-browser';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
  selector: 'app-launchpad-grid',
  templateUrl: './launchpad-grid.component.html',
  styleUrls: ['./launchpad-grid.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, JsonPipe],
})
export class LaunchpadGridComponent {
  launchpadPage = input.required<LaunchpadPage>();
  pageNr = input.required<number>();
  pageChange = output<number>();

  triggerType = TriggerType;
  socket = inject(SocketService);
  pages = createFilledArray(8);

  getColorString(colors: IColor[] | any): SafeStyle {
    if (colors.every(isColorType)) {
      return ColorHelper.getRGBString(colors) as SafeStyle;
    } else {
      return '';
    }

    function isColorType(color: IColor | any): color is IColor {
      return 'h' in color && 's' in color && 'b' in color;
    }
  }
}
