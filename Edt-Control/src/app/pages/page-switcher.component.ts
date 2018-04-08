import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {pages} from '../app.routes';
import {CommunicationService} from '../communication.service';

@Component({
    selector: 'app-page-switcher',
    template: `
        <div class="tabs">
            <ul>
                <li *ngFor="let link of pageTabs">
                    <a [routerLink]="link.path" routerLinkActive="active">{{link.text}}</a>
                </li>
            </ul>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSwitcherComponent implements OnInit, OnDestroy {
    public pageTabs = pages;

    constructor(private communicationService: CommunicationService) {
    }

    ngOnInit() {

    }

    ngOnDestroy() {
    }

}
