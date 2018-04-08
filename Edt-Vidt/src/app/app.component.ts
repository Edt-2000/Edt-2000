import {Component, HostBinding, Inject, OnInit} from '@angular/core';
import {CommunicationService} from './communication.service';
import {IColor, IPreparePresetMsg} from '../../../Shared/socket';
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
    @HostBinding('style.color') color = 'black';

    constructor(
        @Inject(CommunicationService) private _communicationService: CommunicationService,
        @Inject(Router) private _router: Router
    ) {}

    ngOnInit(): void {
        // Subscribe to any message with IColor data
        this._communicationService.color.subscribe((msg: IColor) => {
            this.color = `hsl(${msg.hue}, ${msg.saturation}%, ${msg.brightness}%)`;
        });

        // Subscribe to preset changes and switch to different routes accordingly
        this._communicationService.preset.subscribe((msg: IPreparePresetMsg) => {
            console.log('Switch preset to:', msg.preset);
            this._router.navigate([msg.preset]);
        });
    };
}
