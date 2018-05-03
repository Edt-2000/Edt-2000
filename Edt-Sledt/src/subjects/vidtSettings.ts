import {animationTypes} from '../../../Shared/vidt-presets';
import {Subject} from 'rxjs/Subject';
import {IPhotoAsset, IVideoAsset} from '../../../Shared/assets';
import { Actions$ } from '../../../Shared/actions';
import { merge } from 'rxjs/operators';

export const animationType: Subject<animationTypes> = new Subject<animationTypes>();
export const videoSrc: Subject<IVideoAsset> = new Subject<IVideoAsset>();
export const imageSrc: Subject<IPhotoAsset> = new Subject<IPhotoAsset>();

export const animationType$ = animationType.asObservable().pipe(merge(Actions$.animationType));
export const imageSrc$ = imageSrc.asObservable().pipe(merge(Actions$.imageSrc));
export const videoSrc$ = videoSrc.asObservable().pipe(merge(Actions$.videoSrc));
