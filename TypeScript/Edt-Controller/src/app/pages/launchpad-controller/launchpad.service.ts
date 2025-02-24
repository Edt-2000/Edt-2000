import { Injectable } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest, scan, startWith, tap } from 'rxjs';
import { LaunchpadPage } from '../../../../../Shared/actions/types';

@Injectable({ providedIn: 'root' })
export class LaunchpadService {
  activeLaunchpads$ = combineLatest([
    Actions$.launchpadPageChange.pipe(startWith({ launchpad: -1, page: 0 })),
    Actions$.launchpadPages.pipe(tap((log) => console.log('pages', log))),
  ]).pipe(
    tap(([pageChange, pages]) => console.log({ pageChange, pages })),
    scan(
      (pageState, [{ launchpad, page }, pages]) => {
        pageState.set(launchpad, pages[page]);
        return pageState;
      },
      <Map<number, LaunchpadPage>>new Map(),
    ),
  );
}
