import { IColor } from './types';
import { Colors } from '../Edt-Sledt/config/colors';

// The drum notes are configurable from label to note played (match your machine)
// 'LABEL' = Note.<<PlayedNote>>

// Black is useful to turn off lights and screens
export const BlackColor: IColor = {
    h: 0,
    s: 0,
    b: 0,
};
export const defaultColor: IColor = {
    h: Colors.Red,
    s: 255,
    b: 255,
};
