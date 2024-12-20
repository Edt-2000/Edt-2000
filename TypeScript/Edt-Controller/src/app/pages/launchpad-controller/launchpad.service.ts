import { Injectable } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest, scan } from 'rxjs';
import { LaunchpadPage } from '../../../../../Shared/actions/types';

@Injectable({ providedIn: 'root' })
export class LaunchpadService {
  activeLaunchpads$ = combineLatest([
    Actions$.launchpadPageChange,
    Actions$.launchpadPages,
  ]).pipe(
    scan(
      (pageState, [{ launchpad, page }, pages]) => {
        pageState.set(launchpad, pages[page]);
        return pageState;
      },
      <Map<number, LaunchpadPage>>new Map(),
    ),
  );
}
