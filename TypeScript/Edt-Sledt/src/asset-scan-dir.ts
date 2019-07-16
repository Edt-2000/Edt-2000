import * as fs from 'fs';
import * as p from 'path';
import { AssetSet } from '../../Shared/types';

export const availablePhotos = readDirOneDeep('../Edt-Control/src/assets/photos/');
export const availableVideos = readDirOneDeep('../Edt-Control/src/assets/videos/');

function readDirOneDeep(path) {
    return fs.readdirSync(path)
        .filter(file => !file.startsWith('.'))
        .filter(file => fs.lstatSync(p.join(path, file)).isDirectory())
        .map(file => {
            return {
                name: file,
                assets: fs.readdirSync(p.join(path, file))
                    .map(filename => p.join(file, filename)),
            } as AssetSet;
        });
}

