import { Component, inject } from '@angular/core';
import { TriggerType } from '../../../../../Shared/actions/types';
import { SocketService } from '../../socket.service';
import { LaunchpadService } from './launchpad.service';
import { IColor } from '../../../../../Shared/colors/types';
import { SafeStyle } from '@angular/platform-browser';
import { ColorHelper } from '../../../../../Shared/colors/converters';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
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

  launchpad = inject(LaunchpadService);

  flipOrder$ = new BehaviorSubject(false);

  launchpads$ = combineLatest([
    this.launchpad.activeLaunchpads$,
    this.flipOrder$,
  ]).pipe(
    map(([pads, flipOrder]) => {
      console.log(pads, flipOrder);
      return [...(flipOrder ? pads.reverse() : pads)];
    }),
  );

  $songTitle = Actions$.contentGroup.pipe(
    map((contentGroup) => contentGroup.title),
  );

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

  flip() {
    const flipVal = this.flipOrder$.getValue();
    this.flipOrder$.next(!flipVal);
  }
}
