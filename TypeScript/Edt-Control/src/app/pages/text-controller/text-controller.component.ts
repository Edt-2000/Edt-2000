import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { filterOnModifierGroup } from '../../../../../Shared/modifiers';
import { map } from 'rxjs/operators';
import { ModifierGroup } from '../../../../../Shared/types';

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

  constructor(public socket: SocketService) {
  }

  ngOnInit() {
  }
}
