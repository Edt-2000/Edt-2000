import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { SocketService } from '../../socket.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cues-controller',
  template: `
    @if ((cueList$ | async); as cues) {
      <ul class='list'>
        @for (cue of cues; track cue) {
          <li class='list__item'>
            <button class='text-button' (click)='socket.activateCue(cue)'>
              {{ cue.label }}
            </button>
          </li>
        }
      </ul>
    }
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
  ],
})
export class CuesControllerComponent {
    cueList$ = Actions$.cueList.asObservable();

    constructor(public socket: SocketService) {
    }
}
