import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommunicationService} from '../../communication.service';
import {tap} from 'rxjs/operators';

@Component({
    selector: 'app-preset-controller',
    template: `
    <p>
      preset-controller works!
    </p>
  `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PresetControllerComponent implements OnInit {

    constructor(private communicationService: CommunicationService) {

    }

    ngOnInit(): void {

    }
}
