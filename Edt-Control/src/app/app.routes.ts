import {PresetControllerComponent} from './pages/preset-controller/preset-controller.component';
import {ColorControllerComponent} from './pages/color-controller/color-controller.component';

export const pages = [
    {
        text: 'Presets',
        path: 'preset-controller',
        component: PresetControllerComponent,
    },
    {
        text: 'Colors',
        path: 'color-controller',
        component: ColorControllerComponent,
    }
];
