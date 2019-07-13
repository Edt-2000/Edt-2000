import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { animationTypes, vidtPresetsArr } from '../../../../../Shared/vidt-presets';
import { Actions$ } from '../../../../../Shared/actions';
import { modifiers } from '../../../../../Shared/modifiers';

@Component({
  selector: 'app-vidt-controller',
  templateUrl: './vidt-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VidtControllerComponent implements OnInit {
  vidtPresets = vidtPresetsArr;
  photoAssets$ = Actions$.imageList;
  videoAssets$ = Actions$.videoList;
  glitchIntensities = modifiers.glitchIntensity;

  animations = [
    animationTypes.stretch,
    animationTypes.spin,
    animationTypes.rotate,
    animationTypes.bounce,
  ];

  constructor(public socket: SocketService) {
  }

  ngOnInit() {
  }
}
