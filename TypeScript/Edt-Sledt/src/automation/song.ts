import { songSelectMessage$ } from '../communication/midi';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { Actions, Actions$ } from '../../../Shared/actions/actions';

export const contentGroupChangeActions$ = songSelectMessage$.pipe(
    withLatestFrom(Actions$.contentGroups),
    map(([{song}, contentGroups]) => contentGroups.find(({songNr}) => songNr === song)),
    filter(group => !!group), // filter out any messages that we don't have a content group for
    map(group => Actions.contentGroup(group)),
);
