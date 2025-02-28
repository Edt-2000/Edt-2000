import { Injectable } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LaunchpadService {
  activeLaunchpads$ = combineLatest([
    Actions$.launchpadPageIndex,
    Actions$.launchpadPages,
  ]).pipe(
    map(([pageIndex, pages]) =>
      Object.entries(pageIndex).map(([id, pageNr]) => ({
        id,
        pageNr,
        page: pages[pageNr],
      })),
    ),
  );
}
