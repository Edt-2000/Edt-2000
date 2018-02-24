import {Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-preset-toggle',
  template: `
    <div (click)="toggleAction.emit()">
      {{presetName}}
    </div>
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
export class PresetToggleComponent implements OnInit {
  @Input() public presetName: string;
  @Output() public toggleAction: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
