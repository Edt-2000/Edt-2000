import { Component } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { LaunchpadTrigger, TriggerType } from '../../../../../Shared/actions/types';
import { SocketService } from '../../socket.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-launchpad-controller',
  templateUrl: './launchpad-controller.component.html',
  styleUrls: ['./launchpad-controller.component.scss']
})
export class LaunchpadControllerComponent {
  triggerType = TriggerType;

  launchpadId$ = this.route.paramMap.pipe(map(pMap => pMap.get('id')));

  launchpadPage$ = combineLatest([Actions$.launchpadPages, Actions$.launchpadPageChange, this.launchpadId$]).pipe(
    filter(([, pageChange, launchpadId]) => pageChange.launchpad === +launchpadId),
    map(([pages, pageChange]) => pages[pageChange.page]),
  );

  constructor(public socket: SocketService, private route: ActivatedRoute) {
  }

  sendAction(button: LaunchpadTrigger) {
    this.socket.sendLaunchpadTrigger(button);
  }
}
