import { Actions, Actions$ } from "../../../Shared/actions/actions";
import { midiCCAutomation$ } from "../communication/midi";
import { animationTypeCCNumber, automationChannel } from "../../config/config";
import { filter, map } from "rxjs";

export const animationTypeCC$ = Actions$.animationType.pipe(
    map((type) => ({
        channel: automationChannel,
        controller: animationTypeCCNumber,
        value: type,
    })),
);

export const animationTypeActions$ = midiCCAutomation$.pipe(
    filter((msg) => msg.controller === animationTypeCCNumber),
    map(({ value: type }) => Actions.animationType(type)),
);
