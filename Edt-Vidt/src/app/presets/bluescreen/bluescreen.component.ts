import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bluescreen',
  templateUrl: './bluescreen.component.html',
  styleUrls: ['./bluescreen.component.scss']
})
export class BluescreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
      document.addEventListener("keydown", () => {
          this.router.navigateByUrl('/Shutdown');
      });
  }

}
