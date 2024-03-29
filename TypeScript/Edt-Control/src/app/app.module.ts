import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PresetControllerComponent } from './pages/preset-controller/preset-controller.component';
import { pages } from './app.routes';
import { PresetSwitcherComponent } from './components/preset-switcher/preset-switcher.component';
import { CuesControllerComponent } from './pages/cues-controller/cues-controller.component';
import { VidtControllerComponent } from './pages/vidt-controller/vidt-controller.component';
import { TriggerButtonComponent } from './components/trigger-button/trigger-button.component';
import { PresetSwitchersComponent } from './components/preset-switchers/preset-switchers.component';
import {
    ActivePresetsControllerComponent,
} from './pages/active-presets-controller/active-presets-controller.component';
import { CustomReuseStrategy } from './custom-reuse-strategy';
import { ColorControllerComponent } from './pages/color-controller/color-controller.component';
import { LaunchpadControllerComponent } from './pages/launchpad-controller/launchpad-controller.component';

@NgModule({
    declarations: [
        AppComponent,
        PresetControllerComponent,
        ActivePresetsControllerComponent,
        PresetSwitcherComponent,
        CuesControllerComponent,
        VidtControllerComponent,
        TriggerButtonComponent,
        PresetSwitchersComponent,
        ColorControllerComponent,
        LaunchpadControllerComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot(
            [
                ...pages,
                {
                    path: '',
                    redirectTo: pages[0].path,
                    pathMatch: 'full',
                },
            ],
            { enableTracing: true }, // <-- debugging purposes only
        ),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    ],
    bootstrap: [AppComponent],
    exports: [],
})
export class AppModule {
}
