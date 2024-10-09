import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TriggerType } from '../../../../../Shared/actions/types';
import { SocketService } from '../../socket.service';
import { LaunchpadService } from './launchpad.service';
import { IColor } from '../../../../../Shared/colors/types';
import { SafeStyle } from '@angular/platform-browser';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-launchpad-controller',
  templateUrl: './launchpad-controller.component.html',
  styleUrls: ['./launchpad-controller.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export class LaunchpadControllerComponent {
  triggerType = TriggerType;
  socket = inject(SocketService);

  private route = inject(ActivatedRoute);
  private launchpad = inject(LaunchpadService);

  launchpadPage$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const launchpadInstance = Number(params.get('launchpadInstance')) || 0;
      return this.launchpad.activeLaunchpads$(launchpadInstance);
    }),
  );

  getColorString(color: IColor | any): SafeStyle {
    if ('h' in color && 's' in color && 'b' in color) {
      return ColorHelper.getRGBString([color]) as SafeStyle;
    } else {
      return '';
    }
  }
}
