import { Component, OnInit } from "@angular/core";
import { pages } from "./app.routes";
import { SocketService } from "./socket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  pages = pages;

  constructor(public socket: SocketService) {
  }

  ngOnInit(): void {
  }
}
