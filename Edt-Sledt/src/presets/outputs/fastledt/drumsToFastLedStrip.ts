// import {Subscription} from 'rxjs/Subscription';
// import {PresetLogic} from '../../presets-logic';
// import {IModifierOptions} from '../../../../../Shared/types';
// import {Note} from '../../../../../Shared/midi';
// import {drumTriggerOn$} from "../../../inputs/music-triggers";
// import {DrumNotes, fastLedAmount} from "../../../../../Shared/config";
// import {FastLedtSinglePulse} from "../../../outputs/edt-fastled";
// import {withLatestFrom} from "rxjs/operators";
// import {Actions$} from "../../../../../Shared/actions";
// import {IColor} from "../../../../../Shared/socket";
//
// export class DrumsToFastLedStrip extends PresetLogic {
//     title = 'DrumsToFastLedStrip';
//     note = Note.B1;
//
//     modifierOptions: IModifierOptions = {
//         select: [
//             {label: 'HorizontalCompleteStrips', value: 0},
//             {label: 'VerticalChunks', value: 1},
//             {label: 'VerticalMixedChunks', value: 2},
//         ],
//     };
//
//     private subscriber: Subscription;
//
//     public _startPreset(): void {
//         this.subscriber = drumTriggerOn$
//             .pipe(
//                 withLatestFrom(Actions$.singleColor),
//             )
//             .subscribe(([drumNote, color]) => {
//
//                 switch (this.modifier) {
//                     case 0:
//                         this.horizontalCompleteStrips(drumNote, color);
//                         break;
//
//                     case 1:
//
//                         break;
//
//                     case 2:
//
//                         break;
//                 }
//                 // FastLedtSingleSolid()
//             });
//     }
//
//     public _stopPreset(): void {
//         if (typeof this.subscriber !== 'undefined') {
//             this.subscriber.unsubscribe();
//         }
//     }
//
//     private horizontalCompleteStrips(drumNote: DrumNotes, color: IColor) {
//         // Group into three, with KICK center + outsides if possible
//         // K - - K - - K
//         let flashPattern: DrumNotes[] = [];
//
//         if (fastLedAmount === 3) {
//             flashPattern = [
//                 DrumNotes._2,
//                 DrumNotes._1,
//                 DrumNotes._2,
//             ];
//         }
//
//         if (fastLedAmount === 5) {
//             flashPattern = [
//                 DrumNotes._1,
//                 DrumNotes._2,
//                 DrumNotes._1,
//                 DrumNotes._2,
//                 DrumNotes._1,
//             ];
//         }
//
//         if (fastLedAmount === 7) {
//             flashPattern = [
//                 DrumNotes._2,
//                 DrumNotes._1,
//                 DrumNotes._2,
//                 DrumNotes._1,
//                 DrumNotes._2,
//                 DrumNotes._1,
//                 DrumNotes._2,
//             ];
//         }
//
//         flashPattern.forEach((note, index) => {
//             FastLedtSinglePulse(index + 1, 100, color);
//             // if (note === drumNote) FastLedtSinglePulse(index + 1, 100, color);
//         });
//     }
//
// }
