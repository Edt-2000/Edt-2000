import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { combineLatest, map } from 'rxjs';
import { Actions$ } from '../../../../../Shared/actions/actions';
import { ActivatedRoute } from '@angular/router';
import { LaunchpadGridComponent } from '../../components/launchpad-grid/launchpad-grid.component';
import { SocketService } from '../../socket.service';

@Component({
    selector: 'app-launchpad-controller',
    templateUrl: './launchpad-controller.component.html',
    standalone: true,
    imports: [AsyncPipe, LaunchpadGridComponent],
})
export class LaunchpadControllerComponent {
    socket = inject(SocketService);
    private readonly route = inject(ActivatedRoute);
    activeLaunchpad$ = combineLatest([
        this.route.paramMap,
        Actions$.launchpadPageIndex,
        Actions$.launchpadPages,
    ]).pipe(
        map(([paramMap, pageIndex, pages]) => {
            const launchpadId = paramMap.get('launchpadId');
            const pageNr = launchpadId && pageIndex[launchpadId];
            if (typeof pageNr === 'number' && Number.isFinite(pageNr)) {
                return { pageNr, page: pages[pageNr] ?? [] };
            } else {
                return false;
            }
        }),
    );

    pageChange(pageNr: number) {
        const launchpadId = this.route.snapshot.paramMap.get('launchpadId');
        launchpadId && this.socket.sendLaunchpadPageChange(launchpadId, pageNr);
    }
}
