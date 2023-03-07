import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TriggerType } from '../../../../../Shared/actions/types';
import { SocketService } from '../../socket.service';
import { LaunchpadService } from './launchpad.service';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-launchpad-controller',
    templateUrl: './launchpad-controller.component.html',
    styleUrls: ['./launchpad-controller.component.scss']
})
export class LaunchpadControllerComponent {
    triggerType = TriggerType;

    launchpadPage$ = this.route.paramMap.pipe(
        switchMap(params => {
            const launchpadInstance = Number(params.get('launchpadInstance')) || 0;
            return this.launchpad.activeLaunchpads$(launchpadInstance);
        })
    );

    constructor(public socket: SocketService, private launchpad: LaunchpadService, private route: ActivatedRoute) {
    }
}
