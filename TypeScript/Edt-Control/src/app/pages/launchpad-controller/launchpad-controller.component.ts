import { Component, OnInit } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { LaunchpadTrigger, TriggerType } from '../../../../../Shared/actions/types';
import { SocketService } from "../../socket.service";

@Component({
  selector: 'app-launchpad-controller',
  templateUrl: './launchpad-controller.component.html',
  styleUrls: ['./launchpad-controller.component.scss']
})
export class LaunchpadControllerComponent implements OnInit {
  triggerType = TriggerType;

  launchpadPage$ = combineLatest([Actions$.launchpadPages, Actions$.launchpadActivePage]).pipe(
    map(([pages, pageNr]) => pages[pageNr]),
  );

  constructor(public socket: SocketService) {
  }

  ngOnInit() {
  }

  sendAction(button: LaunchpadTrigger) {
    this.socket.sendLaunchpadTrigger(button);
  }
}
