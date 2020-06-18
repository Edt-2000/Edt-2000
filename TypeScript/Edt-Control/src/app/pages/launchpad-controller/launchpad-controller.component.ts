import { Component, OnInit } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { TriggerType } from '../../../../../Shared/actions/types';

@Component({
  selector: 'app-launchpad-controller',
  templateUrl: './launchpad-controller.component.html',
  styles: [`
    .launchpad {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .launchpad__row {
      display: flex;
      flex: 0 1 12.5%;
      width: 100vh; /*Make it square*/
    }

    .launchpad__item {
      display: flex;
      flex: 0 0 12.5%;
      border: 2px solid red;
      align-items: center;
      justify-content: center;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: contain;
    }
  `],
})
export class LaunchpadControllerComponent implements OnInit {
  triggerType = TriggerType;

  launchpadPage$ = combineLatest([Actions$.launchpadPages, Actions$.launchpadActivePage]).pipe(
    map(([pages, pageNr]) => pages[pageNr]),
  );

  constructor() {
  }

  ngOnInit() {
  }

}
