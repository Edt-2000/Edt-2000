import { Injectable } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { filter, map, withLatestFrom } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class LaunchpadService {
    activeLaunchpads$(launchpadInstance: number) {
        return Actions$.launchpadPageChange.pipe(
            filter(({launchpad}) => launchpad === launchpadInstance),
            withLatestFrom(Actions$.launchpadPages),
            map(([change, pages]) => pages[change.page]),
        );
    }
}
