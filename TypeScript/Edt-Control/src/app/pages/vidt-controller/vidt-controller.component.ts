import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { Actions$ } from '../../../../../Shared/actions/actions';

@Component({
  selector: 'app-vidt-controller',
  templateUrl: './vidt-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VidtControllerComponent implements OnInit {
  contentGroups$ = Actions$.contentGroups;
  contentGroup$ = Actions$.contentGroup;
  animations$ = Actions$.animationTypes;
  vidtPresets$ = Actions$.vidtPresets;

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
