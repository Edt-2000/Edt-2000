import { Injectable } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { filter, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LaunchpadService {
    activeLaunchpads$(launchpadInstance: number) {
        return combineLatest(Actions$.launchpadPageChange, Actions$.launchpadPages).pipe(
            filter(([{launchpad}, pages]) => {
                return launchpad === launchpadInstance
            }),
            map(([change, pages]) => pages[change.page]),
        );
    }
}
