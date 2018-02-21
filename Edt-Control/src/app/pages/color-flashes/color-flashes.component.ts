import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IColor} from '../../../../../SharedTypes/socket';
import {CommunicationService} from '../../communication.service';

@Component({
  selector: 'app-color-flashes',
  template: `
    <app-colored-trigger
      *ngFor="let trigger of triggers"
      [bgColor]="trigger"
      (triggerAction)="triggerAction($event)"
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
    this.communicationService.sendToSledt(<IColor>{
      hue: 100,
      saturation: 100,
      brightness: 255
    });
  }

  constructor(private communicationService: CommunicationService) { }

  ngOnInit() {
  }

}
