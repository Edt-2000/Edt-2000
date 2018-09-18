import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Actions, nextActionFromMsg} from '../../../Shared/actions';
import {IPhotoAsset, IVideoAsset} from "../../../Shared/assets";
import {animationTypes} from "../../../Shared/vidt-presets";
import {ICue} from "../../../Shared/types";

@Injectable()
export class SocketService {
  constructor(private socket: Socket) {
    socket.on('toControl', nextActionFromMsg);
  }

  private toSledt(message: Actions) {
    this.socket.emit('fromControl', message);
  }

  sendBeat() {
    this.toSledt(Actions.mainBeat(127));
  }

  sendPhotoAsset(asset: IPhotoAsset) {
    this.toSledt(Actions.imageSrc(asset));
  }

  sendVideoAsset(asset: IVideoAsset) {
    this.toSledt(Actions.videoSrc(asset));
  }

  sendVidtPreset({preset}) {
    this.toSledt(Actions.prepareVidt(preset));
  }

  sendText(main: string) {
    this.toSledt(Actions.mainText(main));
  }

  sendAnimation(animation: animationTypes) {
    this.toSledt(Actions.animationType(animation));
  }

  activateCue(cue: ICue) {
    cue.actions.forEach(action => this.toSledt(action));
  }

  changePreset(preset, state, modifier = 127) {
    this.toSledt(Actions.presetChange({preset, state, modifier}));
  }

  sendColor(hue, saturation, brightness) {
    this.toSledt(Actions.singleColor({hue, saturation, brightness}))
  }

  sendMultiColor(hues: number[]) {
    this.toSledt(Actions.multiColor(hues.map((hue) => ({
      hue,
      saturation: 255,
      brightness: 255
    }))))

  }
}
