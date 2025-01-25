import { PresetControllerComponent } from './pages/preset-controller/preset-controller.component';
import { CuesControllerComponent } from './pages/cues-controller/cues-controller.component';
import { VidtControllerComponent } from './pages/vidt-controller/vidt-controller.component';
import { ActivePresetsControllerComponent } from './pages/active-presets-controller/active-presets-controller.component';
import { ColorControllerComponent } from './pages/color-controller/color-controller.component';
import { Route } from '@angular/router';
import { LaunchpadControllerComponent } from './pages/launchpad-controller/launchpad-controller.component';
import { VirtualLaunchpadControllerComponent } from './pages/virtual-launchpad-controller/virtual-launchpad-controller.component';

export const pages: Route[] = [
  {
    title: 'Active Presets',
    path: 'active-presets',
    component: ActivePresetsControllerComponent,
  },
  {
    title: 'Presets',
    path: 'preset-controller',
    component: PresetControllerComponent,
  },
  {
    title: 'Cues',
    path: 'cues-controller',
    component: CuesControllerComponent,
  },
  {
    title: 'Vidt',
    path: 'vidt-controller',
    component: VidtControllerComponent,
  },
  {
    title: 'Color',
    path: 'color-controller',
    component: ColorControllerComponent,
  },
  {
    title: 'Launchpad',
    path: 'virtual-launchpad-controller',
    component: VirtualLaunchpadControllerComponent,
  },
];

export const launchpadRoute = {
  title: 'Launchpad',
  path: 'launchpad-controller/:launchpadId',
  component: LaunchpadControllerComponent,
};
