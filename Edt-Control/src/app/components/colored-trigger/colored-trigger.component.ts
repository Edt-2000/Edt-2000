import {Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-colored-trigger',
  template: `
    <div
      class="colored-trigger"
      [style.backgroundColor]="bgColor"
      (click)="triggerAction.emit()"
    ></div>
  `,
  styles: [`
    .colored-trigger {
      flex: 0 0 auto;
      width: 100px;
      height: 100px;
      border: 1px solid black;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColoredTriggerComponent implements OnInit {
  @Input() public bgColor: string;
  @Output() public triggerAction: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
