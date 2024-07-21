import { Injectable } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest, filter, map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LaunchpadService {
    activeLaunchpads$(launchpadInstance: number) {
        return combineLatest([Actions$.launchpadPageChange, Actions$.launchpadPages]).pipe(
            filter(([{launchpad}]) =>  launchpad === launchpadInstance),
            map(([change, pages]) => pages[change.page]),
        );
    }
}
