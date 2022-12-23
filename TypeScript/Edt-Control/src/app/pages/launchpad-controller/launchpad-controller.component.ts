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

    activeLaunchpads$ = this.route.paramMap.pipe(
        switchMap(params => this.launchpad.activeLaunchpads$(Number(params.get('launchpadInstance'))))
    );

    constructor(public socket: SocketService, private launchpad: LaunchpadService, private route: ActivatedRoute) {
    }
}
