import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { animationTypeArr, vidtPresetsArr } from '../../../../../Shared/vidt-presets';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { modifiers } from '../../../../../Edt-Sledt/config/modifiers';
import { map } from 'rxjs/operators';
import { ModifierGroup } from '../../../../../Shared/actions/types';
import { filterOnModifierGroup } from '../../../../../Shared/presets/utils';

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
  glitchIntensities = modifiers.glitchIntensity;
  animations = animationTypeArr;

  constructor(public socket: SocketService) {
  }

  ngOnInit() {
  }
}
