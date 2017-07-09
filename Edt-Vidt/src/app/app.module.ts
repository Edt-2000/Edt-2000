import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {ColorflashComponent} from "./colorflash/colorflash.component";
import {CommunicationService} from "./communication.service";

import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

const config: SocketIoConfig = {
  url: 'localhost:8988',
  options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    ColorflashComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    CommunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
