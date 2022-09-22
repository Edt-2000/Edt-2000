import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { map, scan, shareReplay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LaunchpadService {
    activeLaunchpads$ =  combineLatest([Actions$.launchpadPages, Actions$.launchpadPageChange]).pipe(
        scan((uniquePages, [pages, change]) => {
            uniquePages[change.launchpad] = pages[change.page];
            return uniquePages;
        }, {}),
        map(pageObj => Object.values(pageObj)),
        shareReplay(1),
    );

}
