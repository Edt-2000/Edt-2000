import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Actions, nextActionFromMsg } from '../../../Shared/actions';
import { animationTypes, VidtPresets } from '../../../Shared/vidt-presets';
import { ContentGroup, IColor, ICue } from '../../../Shared/helpers/types';

@Injectable()
export class SocketService {
  constructor(private socket: Socket) {
    socket.on('toControl', nextActionFromMsg);
  }

  sendVidtPreset(preset: string) {
    this.toSledt(Actions.prepareVidt(VidtPresets[preset]));
  }

  sendBeat() {
    this.toSledt(Actions.mainBeat(127));
  }

  sendPhotoAsset(asset: string) {
    this.toSledt(Actions.imageSrc(asset));
  }

  sendVideoAsset(asset: string) {
    this.toSledt(Actions.videoSrc(asset));
  }

  sendText(main: string) {
    this.toSledt(Actions.mainText(main));
  }

  sendContentGroup(group: ContentGroup) {
    this.toSledt(Actions.contentGroup(group));
  }

  sendGlitchIntensity(intensity: number) {
    this.toSledt(Actions.glitchIntensity(intensity));
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

  sendColor(color: IColor) {
    this.toSledt(Actions.singleColor(color));
  }

  sendMultiColor(colors: IColor[]) {
    this.toSledt(Actions.multiColor(colors));
  }

  sendColorPalette(colors: IColor[]) {
    this.toSledt(Actions.colorPalette(colors));
  }

  private toSledt(message: Actions) {
    this.socket.emit('fromControl', message);
  }
}
