import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions';
import { SocketService } from '../../socket.service';

@Component({
  selector: 'app-cues-controller',
  template: `
    <ul class="list" *ngIf="(cueList$ | async) as cues">
      <li class="list__item" *ngFor="let cue of cues">
        <button class="text-button" (click)="socket.activateCue(cue)">
          {{ cue.label }}
        </button>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuesControllerComponent {
  cueList$ = Actions$.cueList.asObservable();

  constructor(public socket: SocketService) {
  }
}
