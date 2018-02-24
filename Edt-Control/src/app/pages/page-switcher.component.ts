import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

interface IPageLink {
  path: string;
  text: string;
}

@Component({
  selector: 'app-page-switcher',
  template: `
    <ul>
      <li *ngFor="let link of pageLinks">
        <a [routerLink]="link.path">{{link.text}}</a>
      </li>
    </ul>
    <router-outlet></router-outlet>
  `,
  styleUrls: [
    'page-switcher.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSwitcherComponent implements OnInit {
  pageLinks: IPageLink[] = [
    {
      path: '/colorFlashes',
      text: 'COLOR'
    },
    {
      path: '/presetToggler',
      text: 'PRESETS'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
