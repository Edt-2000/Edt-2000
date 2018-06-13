import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {SocketService} from '../../socket.service';
import {Actions} from '../../../../../Shared/actions';
import { IPhotoAsset, photoAssets } from '../../../../../Shared/assets';
import {vidtPresets} from '../../../../../Shared/vidt-presets';
import {words} from '../../../../../Shared/words';

@Component({
    selector: 'app-vidt-controller',
    template: `
        <div class="columns is-multiline">
            <div class="column is-2">
                <button class="button is-large" (click)="sendBeat()">
                    BEAT
                </button>

                <button class="button is-large" (click)="sendColor(0, 255, 255)" style="background-color: #ff0000;">
                    RED
                </button>

                <button class="button is-large" (click)="sendColor(18, 255, 255)" style="background-color: #FFA500;">
                    ORANGE
                </button>
                
                <button class="button is-large" (click)="sendColor(58, 255, 255)" style="background-color: #FFFF00;">
                    YELLOW
                </button>

                <button class="button is-large" (click)="sendColor(85, 255, 255)" style="background-color: #00FF00;">
                    LIME
                </button>
                
                <button class="button is-large" (click)="sendColor(95, 255, 255)" style="background-color: #008000;">
                    GREEN
                </button>

                <button class="button is-large" (click)="sendColor(105, 255, 255)" style="background-color: #2E8B57;">
                    SEAGREEN
                </button>

                <button class="button is-large" (click)="sendColor(129, 255, 255)" style="background-color: #40E0D0;">
                    TURQUOISE
                </button>

                <button class="button is-large" (click)="sendColor(158, 255, 255)" style="background-color: #0000FF;">
                    BLUE
                </button>

                <button class="button is-large" (click)="sendColor(183, 255, 255)" style="background-color: #800080;">
                    PURPLE
                </button>
                    
                <button class="button is-large" (click)="sendColor(218, 255, 255)" style="background-color: #FF179A;">
                    PINK
                </button>

                <ng-container *ngFor="let vidtPage of vidtPages">
                    <button class="button is-large" (click)="sendVidtPreset(vidtPage)">
                        {{vidtPage.label}}
                    </button>
                </ng-container>
                <ng-container *ngFor="let asset of photoAssets">
                    <button class="button is-large" (click)="sendPhotoAsset(asset)">
                        {{asset.name}}
                    </button>
                </ng-container>

                <input #mainDirect type="text" class="input is-large" (keyup)="sendText(mainDirect.value)">
                
                <input #mainBtn type="text" class="input is-large">
                <button class="button is-large" (click)="sendText(mainBtn.value)">SEND</button>

                <ng-container *ngFor="let word of wordsArray">
                    <button class="button is-large" (click)="sendText(word)">
                        {{word}}
                    </button>
                </ng-container>
            </div>
        </div>
    `,
    styles: [],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VidtControllerComponent implements OnInit {
    photoAssets = photoAssets;
    vidtPages = Array.from(vidtPresets, ([preset, label]) => ({preset, label}));
    wordsArray = words;

    constructor(private socket: SocketService) {
    }

    ngOnInit() {
    }

    sendBeat() {
        this.socket.toSledt(Actions.mainBeat(127));
    }

    sendColor(hue, saturation, brightness) {
        this.socket.toSledt(Actions.singleColor({
            hue,
            saturation,
            brightness,
        }))
    }

    sendPhotoAsset(asset: IPhotoAsset) {
        this.socket.toSledt(Actions.imageSrc(asset));
    }

    sendVidtPreset({preset}) {
        this.socket.toSledt(Actions.prepareVidt(preset));
    }

    sendText(main: string) {
        this.socket.toSledt(Actions.mainText(main));
    }
}
