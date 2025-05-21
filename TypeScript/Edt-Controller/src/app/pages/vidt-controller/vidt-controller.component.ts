import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SocketService } from '../../socket.service';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { AsyncPipe } from '@angular/common';
import { PresetSwitchersComponent } from '../../components/preset-switchers/preset-switchers.component';
import { VidtPresets } from '../../../../../Shared/vidt-presets';

@Component({
  selector: 'app-vidt-controller',
  templateUrl: './vidt-controller.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, PresetSwitchersComponent],
  standalone: true,
})
export class VidtControllerComponent implements OnInit {
  contentGroups$ = Actions$.contentGroups;
  contentGroup$ = Actions$.contentGroup;
  animations$ = Actions$.animationTypes;
  vidtPresets$ = Actions$.vidtPresets;
  sizes$ = Actions$.sizes;
  shapes$ = Actions$.shapes;

  glitchIntensities = [
    { label: 'low', value: 1 },
    { label: 'medium', value: 3 },
    { label: 'average', value: 5 },
    { label: 'high', value: 7 },
    { label: 'bezerk', value: 9 },
  ];
  protected readonly VidtPresets = VidtPresets;

  constructor(public socket: SocketService) {}

  ngOnInit() {}

  public getBackgroundCss(image: string) {
    return `url('assets/media-by-group/${image}')`;
  }
}
