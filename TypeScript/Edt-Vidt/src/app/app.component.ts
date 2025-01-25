import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { Actions$ } from '../../../Shared/actions/actions';
import { SocketService } from './socket.service';
import { VidtPresets } from '../../../Shared/vidt-presets';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    private readonly destroyed = new Subject();
    private readonly router = inject(Router);
    // Initiates the sockets connection.
    private readonly sockets = inject(SocketService);

    public ngOnInit() {
        if (!environment.solo) {
            Actions$.prepareVidt.pipe(takeUntil(this.destroyed)).subscribe((preset: VidtPresets) => {
                this.router.navigate([VidtPresets[preset]]);
            });
        }
    }

    public ngOnDestroy() {
        this.destroyed.next(true);
        this.destroyed.complete();
    }
}
