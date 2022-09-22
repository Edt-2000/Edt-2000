import { Component } from '@angular/core';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { combineLatest } from 'rxjs';
import { filter, map, reduce, scan, tap, withLatestFrom } from 'rxjs/operators';
import { LaunchpadTrigger, TriggerType } from '../../../../../Shared/actions/types';
import { SocketService } from '../../socket.service';

@Component({
    selector: 'app-launchpad-controller',
    templateUrl: './launchpad-controller.component.html',
    styleUrls: ['./launchpad-controller.component.scss']
})
export class LaunchpadControllerComponent {
    triggerType = TriggerType;

    activeLaunchpads$ = combineLatest([Actions$.launchpadPages, Actions$.launchpadPageChange]).pipe(
        scan((uniquePages, [pages, change]) => {
            uniquePages[change.launchpad] = pages[change.page];
            return uniquePages;
        }, {}),
        map(pageObj => Object.values(pageObj)),
    );

    constructor(public socket: SocketService) {
    }

    sendAction(button: LaunchpadTrigger) {
        this.socket.sendLaunchpadTrigger(button);
    }
}
