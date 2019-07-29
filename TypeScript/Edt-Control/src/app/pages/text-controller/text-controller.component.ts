import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { animationTypes } from '../../../../../Shared/vidt-presets';
import { Actions$ } from '../../../../../Shared/actions';
import { filterOnModifierGroup } from '../../../../../Shared/modifiers';
import { map } from 'rxjs/operators';
import { ModifierGroup } from '../../../../../Shared/helpers/types';

@Component({
  selector: 'app-text-controller',
  templateUrl: './text-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControllerComponent implements OnInit {
  wordPresets$ = Actions$.presetState.asObservable().pipe(
    map(presets => {
      return filterOnModifierGroup(presets, [ModifierGroup.Words]);
    }),
  );
  contentGroups$ = Actions$.contentGroups;
  contentGroup$ = Actions$.contentGroup;

  animations = Object.keys(animationTypes);

  constructor(public socket: SocketService) {
  }

  ngOnInit() {
  }
}
