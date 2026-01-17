import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { launchpadRoute, pages } from './app/app.routes';

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter([
            ...pages,
            launchpadRoute,
            {
                path: '',
                redirectTo: pages[0].path,
                pathMatch: 'full',
            },
        ]),
    ],
}).catch(console.log);
