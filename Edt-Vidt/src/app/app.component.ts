import {Component, Inject, OnInit} from "@angular/core";
import {CommunicationService} from "./communication.service";

@Component({
  selector: 'app-root',
  styles: [`
        :host {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    `],
  template: `
        <div style="height: 300px;" [ngStyle]="{'background-color':bgColor}"></div>
    `
})
export class AppComponent implements OnInit {
  bgColor: string;

  constructor(@Inject(CommunicationService) private _communicationService: CommunicationService) {
  }


  // @HostBinding('style.backgroundColor') bgColor: string = "hsl(144, 100%, 50%)";

  ngOnInit(): void {
    this._communicationService.getMessageObserver().subscribe((msg) => {
      this.bgColor = `hsl(${msg.bgColor.hue}, ${msg.bgColor.saturation}%, ${msg.bgColor.brightness}%)`
    });
  };
}
