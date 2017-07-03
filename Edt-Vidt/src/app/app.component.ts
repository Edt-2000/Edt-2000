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
            /*transition: background-color 20ms;*/
        }
    `],
  template: `
        <div style="height: 300px;" [ngStyle]="{'background-color':bgColor,'width.px': blockWidth}"></div>
    `
})
export class AppComponent implements OnInit {

  constructor(@Inject(CommunicationService) private _communicationService: CommunicationService) {
  }

  blockWidth: number;
  bgColor: string;

  // @HostBinding('style.backgroundColor') bgColor: string = "hsl(144, 100%, 50%)";

  ngOnInit(): void {
    this._communicationService.getMessageObserver().subscribe((msg) => {
      console.log('Receive:', msg);
    });

    // let prevVal = 0;
    // this._communicationService.getMessageObserver().subscribe((msg: ControlMessage) => {
    //     console.log('receive!', msg);
    //     if(msg.channel === 0 && msg.type === 'cc') {
    //         if(msg.controller === 74 && msg.value !== prevVal) {
    //             prevVal = msg.value;
    //             this.blockWidth = msg.value;
    //             this.bgColor = 'hsl(' + msg.value + ', 100%, 50%)';
    //         }
    //     }
    //     // if(msg.channel === 0 && msg.type === 'noteoff') {
    //     //     this.bgColor = 'white';
    //     // }
    // });
  };
}
