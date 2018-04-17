import {Component, OnInit} from '@angular/core';
import {pages} from './app.routes';

@Component({
    selector: 'app-root',
    template: `
        <router-outlet></router-outlet>

        <nav class="navbar is-success is-fixed-bottom">
            <div class="navbar-brand">
                <a class="navbar-item">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                </a>
                <a *ngFor="let page of pages" routerLinkActive="is-active" class="navbar-item" [routerLink]="page.path">
                    {{page.text}}
                </a>
            </div>
        </nav>
  `
})
export class AppComponent implements OnInit {
    pages = pages;

    constructor() {
    }

    ngOnInit(): void {}
}
