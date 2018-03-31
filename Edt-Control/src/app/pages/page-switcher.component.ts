import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {pages} from '../app.routes';

interface IPageLink {
  path: string;
  text: string;
}

@Component({
  selector: 'app-page-switcher',
  template: `
    <div class="tabs">
    <ul>
      <li *ngFor="let link of pageLinks">
        <a [routerLink]="link.path" routerLinkActive="active">{{link.text}}</a>
      </li>
    </ul>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSwitcherComponent implements OnInit {
  public pageLinks = pages;

  constructor() { }

  ngOnInit() {
  }

}
