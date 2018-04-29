import {animationTypes} from '../../../Shared/vidt-presets';
import {Subject} from 'rxjs/Subject';
import {IPhotoAsset, IVideoAsset} from '../../../Shared/assets';

export const animationType: Subject<animationTypes> = new Subject<animationTypes>();

export const videoSrc: Subject<IVideoAsset> = new Subject<IVideoAsset>();
export const imageSrc: Subject<IPhotoAsset> = new Subject<IPhotoAsset>();
