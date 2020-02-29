import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { VidtPresets } from '../../../../../Shared/vidt-presets';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { map } from 'rxjs/operators';
import { AnimationTypes } from '../../../../../Shared/vidt/animation';

@Component({
  selector: 'app-vidt-controller',
  templateUrl: './vidt-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VidtControllerComponent implements OnInit {
  contentGroups$ = Actions$.contentGroups;
  contentGroup$ = Actions$.contentGroup;
  animations$ = Actions$.animationTypes.pipe(map(types => types.map(type => AnimationTypes[type])));
  vidtPresets$ = Actions$.vidtPresets.pipe((map(types => types.map(type => VidtPresets[type]))));

  glitchIntensities = [
    { label: 'low', value: 1 },
    { label: 'medium', value: 3 },
    { label: 'average', value: 5 },
    { label: 'high', value: 7 },
    { label: 'bezerk', value: 9 },
  ];

  constructor(public socket: SocketService) {
  }

  ngOnInit() {
  }
}
