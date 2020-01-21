import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Actions, nextActionFromMsg } from '../../../Shared/actions/actions';
import { AnimationTypes, VidtPresets } from '../../../Shared/vidt-presets';
import { ContentGroup, IColor, ICue } from '../../../Shared/types';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class SocketService extends Socket {
  constructor(
    private socket: Socket,
    private route: ActivatedRoute,
  ) {
    super({
      url: `http://${route.snapshot.queryParams.ip ?? 'localhost'}:${8898}/control`,
      options: {
        transports: ['websocket'],
      },
    });
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
