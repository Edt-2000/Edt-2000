import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TriggerType } from '../../../../../Shared/actions/types';
import { SocketService } from '../../socket.service';
import { LaunchpadService } from './launchpad.service';
import { IColor } from '../../../../../Shared/colors/types';
import { SafeStyle } from '@angular/platform-browser';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { combineLatest, map } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { createFilledArray } from '../../../../../Shared/utils/utils';

@Component({
  selector: 'app-launchpad-controller',
  templateUrl: './launchpad-controller.component.html',
  styleUrls: ['./launchpad-controller.component.scss'],
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
})
export class LaunchpadControllerComponent {
  triggerType = TriggerType;
  socket = inject(SocketService);

  pages = createFilledArray(8);

  private route = inject(ActivatedRoute);
  private launchpad = inject(LaunchpadService);

  $songTitle = Actions$.contentGroup.pipe(
    map((contentGroup) => contentGroup.title),
  );

  launchpadNr$ = this.route.paramMap.pipe(
    map((params) => Number(params.get('launchpadInstance')) || -1),
  );

  launchpadPage$ = combineLatest([
    this.launchpad.activeLaunchpads$,
    this.launchpadNr$,
  ]).pipe(map(([launchpads, launchpadNr]) => launchpads.get(launchpadNr)));

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

  protected readonly launchpadPages$ = Actions$.launchpadPages;
}
