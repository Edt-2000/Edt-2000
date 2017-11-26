import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gridscape',
  templateUrl: './gridscape.component.html',
  styleUrls: ['./gridscape.component.scss']
})
export class GridscapeComponent implements OnInit {
  public linesVertical = Array(25).map((x,i) => i + 1);
  public linesHorizontal = Array(10).map((x,i) => i + 1);
  public stars = Array(40).map((x,i) => i + 1);

  constructor() { }

  ngOnInit() {
  }

}
