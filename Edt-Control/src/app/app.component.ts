import {Component, OnInit} from '@angular/core';
import {CommunicationService} from './communication.service';

@Component({
    selector: 'app-root',
    template: `
    <app-page-switcher></app-page-switcher>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
    constructor(private communicationService: CommunicationService) {

    }

    ngOnInit(): void {
        this.communicationService.getSledt$().subscribe(console.log);
    }
}
