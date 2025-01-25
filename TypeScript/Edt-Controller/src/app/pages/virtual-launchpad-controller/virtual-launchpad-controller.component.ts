import { Component, inject } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { LaunchpadGridComponent } from '../../components/launchpad-grid/launchpad-grid.component';
import { SocketService } from '../../socket.service';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-virtual-launchpad-controller',
  templateUrl: './virtual-launchpad-controller.component.html',
  styleUrls: ['./virtual-launchpad-controller.component.scss'],
  standalone: true,
  imports: [AsyncPipe, JsonPipe, LaunchpadGridComponent],
})
export class VirtualLaunchpadControllerComponent {
  socket = inject(SocketService);

  pageNr$ = new BehaviorSubject(0);

  launchpadPage$ = combineLatest([Actions$.launchpadPages, this.pageNr$]).pipe(
    map(([pages, pageNr]) => ({ page: pages[pageNr] ?? [], pageNr })),
  );
  protected readonly Number = Number;

  pageChange(pageNr: number) {
    this.pageNr$.next(pageNr);
  }
}
