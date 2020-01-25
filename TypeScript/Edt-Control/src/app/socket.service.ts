import { Injectable } from '@angular/core';
import { Actions, nextActionFromMsg } from '../../../Shared/actions/actions';
import { VidtPresets } from '../../../Shared/vidt-presets';
import { ActivatedRoute } from '@angular/router';
import { ContentGroup, ICue } from '../../../Shared/actions/types';
import { IColor } from '../../../Shared/colors/types';
import { AnimationTypes } from '../../../Shared/vidt/animation';
import io from 'socket.io-client';

@Injectable({providedIn: 'root'})
export class SocketService {
  private socket;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.socket = io(`http://${route.snapshot.queryParams.ip || 'localhost'}:${8898}/control`, {
      transports: ['websocket'],
    });
    this.socket.on('toControl', (msg) => {
      nextActionFromMsg(msg);
    });
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

  sendAnimation(animation: string) {
    this.toSledt(Actions.animationType(AnimationTypes[animation]));
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
