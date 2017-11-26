import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/filter';
import {IColor, IIntensityMsg, IPreparePresetMsg, ITrackMsg} from '../../../SharedTypes/socket';
import 'rxjs/add/operator/do';


@Injectable()
export class SocketService {
  private _messageObs: Observable<any>;

  public color: Observable<IColor>;
  public preset: Observable<IPreparePresetMsg>;
  public intensity: Observable<IIntensityMsg>;
  public track: Observable<ITrackMsg>;

  constructor(private socket: Socket) {
    this._messageObs = this.socket.fromEvent('message');

    // Preset msg
    this.preset = this._messageObs.filter((msg: any): msg is IPreparePresetMsg => {
      return !!msg.preset;
    });

    // Expose observables for various message types
    this.color = this._messageObs.filter((msg: any): msg is IColor => {
      return !!msg.color;
    });

    this.intensity = this._messageObs.filter((msg: any): msg is IIntensityMsg => {
      return typeof msg.intensity === 'number';
    });

    this.track = this._messageObs
      .filter((msg: any): msg is ITrackMsg => {
        return typeof msg.left === 'object' && typeof msg.right === 'object';
      });

  }
}
