import { Component, OnInit } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-launchpad-controller',
  template: `
    <div class="launchpad" *ngIf="(launchpadPage$ | async) as launchpadPage">
      <div class="launchpad__row" *ngFor="let row of launchpadPage.triggers">
        <div class="launchpad__item" *ngFor="let button of row" [style.backgroundColor]="button[0]">
          <div style="background-color: black;">{{button[2]}}</div>
        </div>
      </div>
    </div>
  `,
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
    }
  `],
})
export class LaunchpadControllerComponent implements OnInit {

  launchpadPage$ = combineLatest([Actions$.launchpadPages, Actions$.launchpadActivePage]).pipe(
    map(([pages, pageNr]) => pages[pageNr]),
  );

  constructor() {
  }

  ngOnInit() {
  }

}
