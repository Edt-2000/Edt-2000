import * as fs from 'fs';
import * as p from 'path';
import { AssetSet } from '../../Shared/types';

const assetPath = '../Edt-Control/src/assets/media-by-group';
export const availablePhotos = readDirOneDeep(assetPath, '.jpg');
export const availableVideos = readDirOneDeep(assetPath, '.mp4');

function readDirOneDeep(path: string, extension: string) {
    return fs.readdirSync(path)
        .filter(file => !file.startsWith('.'))
        .filter(file => fs.lstatSync(p.join(path, file)).isDirectory())
        .map(file => {
            return {
                name: file,
                assets: fs.readdirSync(p.join(path, file))
                    .map(filename => p.join(file, filename))
                    .filter(filename => p.extname(filename) === extension),
            } as AssetSet;
        });
}
