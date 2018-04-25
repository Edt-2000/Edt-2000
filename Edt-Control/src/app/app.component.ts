import {Component, OnInit} from '@angular/core';
import {pages} from './app.routes';

@Component({
    selector: 'app-root',
    template: `
        <section class="section">
            <router-outlet></router-outlet>
        </section>

        <nav class="navbar is-success is-fixed-bottom">
            <div class="navbar-brand">
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
