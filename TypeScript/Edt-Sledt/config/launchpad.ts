import { LaunchpadPage } from '../../Shared/actions/types';
import { Actions$ } from '../../Shared/actions/actions';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const launchpadPage$: Observable<LaunchpadPage> = combineLatest([
    Actions$.launchpadPageNr,
    Actions$.vidtPresets,
    Actions$.colorPalette,
    Actions$.animationTypes,
    Actions$.contentGroup,
]).pipe(
    map(([pageChange, vidtPresets, colorPalette, animationTypes, contentGroup]) => {

    }),
);

function chunk(arr, n) {
    return arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : [];
}
