import {PresetControllerComponent} from './pages/preset-controller/preset-controller.component';
import {ColorControllerComponent} from './pages/color-controller/color-controller.component';
import {CuesControllerComponent} from './pages/cues-controller/cues-controller.component';
import {VidtControllerComponent} from './pages/vidt-controller/vidt-controller.component';

export const pages = [
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
        text: 'Colors',
        path: 'color-controller',
        component: ColorControllerComponent,
    },
    {
        text: 'Vidt',
        path: 'vidt-controller',
        component: VidtControllerComponent,
    }
];
