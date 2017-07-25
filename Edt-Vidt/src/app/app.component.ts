import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {CommunicationService} from './communication.service';
import {colorMsg, preparePresetMsg} from '../../../SharedTypes/socket';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    styles: [`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    `],
    template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
    @HostBinding('style.backgroundColor') bgColor = 'white';
    @HostBinding('style.color') color = 'black';

    constructor(
        @Inject(CommunicationService) private _communicationService: CommunicationService,
        @Inject(Router) private _router: Router
    ) {}

    ngOnInit(): void {
        // Subscribe to any message with colorMsg data
        this._communicationService.color.subscribe((msg: colorMsg) => {
            this.bgColor = `hsl(${msg.bgColor.hue}, ${msg.bgColor.saturation}%, ${msg.bgColor.brightness}%)`;
            this.color = `hsl(${msg.color.hue}, ${msg.color.saturation}%, ${msg.color.brightness}%)`;
        });

        // Subscribe to preset changes and switch to different routes accordingly
        this._communicationService.preset.subscribe((msg: preparePresetMsg) => {
            console.log('Switch preset to:', msg.preset);
            this._router.navigate([msg.preset]);
        });
    };
}
