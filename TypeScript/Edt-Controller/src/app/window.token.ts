import { InjectionToken } from '@angular/core';

export const WINDOW = new InjectionToken('window', {
    providedIn: 'root',
    factory: () => window,
});
