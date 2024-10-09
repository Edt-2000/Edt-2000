import { Injectable } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest, map, scan, shareReplay, tap } from 'rxjs';
import { LaunchpadPage } from '../../../../../Shared/actions/types';

@Injectable({ providedIn: 'root' })
export class LaunchpadService {
  activeLaunchpads$(launchpadInstance: number) {
    return combineLatest([
      Actions$.launchpadPageChange,
      Actions$.launchpadPages,
    ]).pipe(
      tap(([launchpad, pages]) => console.log(launchpad, pages)),
      scan(
        (pageState, [{ launchpad, page }, pages]) => {
          pageState.set(launchpad, pages[page]);
          return pageState;
        },
        <Map<number, LaunchpadPage>>new Map(),
      ),
      tap((state) => console.log({ state })),
      map((state) => state.get(launchpadInstance)),
      tap((state) => console.log({ state })),
      shareReplay(1),
    );
  }
}
