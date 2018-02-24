import {Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-gridscape',
  templateUrl: './gridscape.component.html',
  styleUrls: ['./gridscape.component.scss']
})
export class GridscapeComponent implements OnInit {
    public linesVertical = Array(25).map((x, i) => i + 1);
    public linesHorizontal = Array(10).map((x, i) => i + 1);
    public stars = Array(40).map((x, i) => i + 1);

    public bounce: boolean;
    private _track$: Subscription;


    constructor(private communicationService: CommunicationService) {
    }

    ngOnInit() {
        this._track$ = this.communicationService.intensity
            .debounceTime(100)
            .subscribe(() => {
                this.bounce = true;

                setTimeout(() => {
                    this.bounce = false;
                }, 100);
            })

    }


}
