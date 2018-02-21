import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-color-flashes',
  template: `
    <app-colored-trigger
      *ngFor="let trigger of triggers"
      [bgColor]="trigger"
      (triggerAction)="triggerAction(trigger)"
    >
    </app-colored-trigger>
  `,
  styles: [
    `
      :host {
        display: flex;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorFlashesComponent implements OnInit {

  public triggers: string[] = [
    'red',
    'blue',
    'green',
    'yellow'
  ];

  public triggerAction(color: string) {
    console.log('color:', color);
  }

  constructor() { }

  ngOnInit() {
  }

}
