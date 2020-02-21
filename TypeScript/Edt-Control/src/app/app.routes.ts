import { PresetControllerComponent } from './pages/preset-controller/preset-controller.component';
import { CuesControllerComponent } from './pages/cues-controller/cues-controller.component';
import { VidtControllerComponent } from './pages/vidt-controller/vidt-controller.component';
import { ActivePresetsControllerComponent } from './pages/active-presets-controller/active-presets-controller.component';

export const pages = [
  {
    text: 'Active Presets',
    path: 'active-presets',
    component: ActivePresetsControllerComponent,
  },
  {
    text: 'Presets',
    path: 'preset-controller',
    component: PresetControllerComponent,
  },
  {
    text: 'Cues',
    path: 'cues-controller',
    component: CuesControllerComponent,
  },
  {
    text: 'Vidt',
    path: 'vidt-controller',
    component: VidtControllerComponent,
  },
];
