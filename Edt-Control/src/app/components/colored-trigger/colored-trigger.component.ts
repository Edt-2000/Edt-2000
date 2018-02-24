import {Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-colored-trigger',
  template: `
    <div
      [style.backgroundColor]="bgColor"
      (click)="triggerAction.emit(bgColor)"
    ></div>
  `,
  styles: [`
    div {
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
  @Output() public triggerAction: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {}

}
