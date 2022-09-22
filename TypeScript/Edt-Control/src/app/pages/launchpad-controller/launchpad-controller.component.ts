import { Component } from '@angular/core';
import { LaunchpadTrigger, TriggerType } from '../../../../../Shared/actions/types';
import { SocketService } from '../../socket.service';
import { LaunchpadService } from './launchpad.service';

@Component({
    selector: 'app-launchpad-controller',
    templateUrl: './launchpad-controller.component.html',
    styleUrls: ['./launchpad-controller.component.scss']
})
export class LaunchpadControllerComponent {
    triggerType = TriggerType;

    activeLaunchpads$ = this.launchpad.activeLaunchpads$;

    constructor(public socket: SocketService, private launchpad: LaunchpadService) {
    }

    sendAction(button: LaunchpadTrigger) {
        this.socket.sendLaunchpadTrigger(button);
    }
}
