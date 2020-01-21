import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { vidtPresetsArr } from '../../../../../Shared/vidt-presets';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { map } from 'rxjs/operators';
import { ModifierGroup } from '../../../../../Shared/actions/types';
import { filterOnModifierGroup } from '../../../../../Shared/presets/utils';
import { animationTypeArr } from '../../../../../Shared/vidt/animation';

@Component({
  selector: 'app-vidt-controller',
  templateUrl: './vidt-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VidtControllerComponent implements OnInit {
  vidtPresets$ = Actions$.presetState.asObservable().pipe(
    map(presets => {
      return filterOnModifierGroup(presets, [ModifierGroup.Vidt]);
    }),
  );

  contentGroup$ = Actions$.contentGroup;
  vidtPresets = vidtPresetsArr;
  glitchIntensities = [
    {label: 'low', value: 1},
    {label: 'medium', value: 3},
    {label: 'average', value: 5},
    {label: 'high', value: 7},
    {label: 'bezerk', value: 9},
  ];
  animations = animationTypeArr;

  constructor(public socket: SocketService) {
  }

  ngOnInit() {
  }
}
