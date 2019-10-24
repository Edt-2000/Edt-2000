import { midiCCAutomation$ } from '../communication/midi';
import { filter } from 'rxjs/operators';
import { Actions$ } from '../../../Shared/actions';

const imageAutomationCCNumber = 16;

// Any `image` message will be recorded to midi CC when triggered
Actions$.imageSrc();

midiCCAutomation$.pipe(
    filter(msg => msg.controller === imageAutomationCCNumber),
);
