import * as fs from 'fs';
import * as p from 'path';
import { ContentGroup } from '../../Shared/words';

export const scannedContentGroups = readDirOneDeep('../Edt-Control/src/assets/media-by-group');

function readDirOneDeep(path: string): ContentGroup[] {
    return fs.readdirSync(path)
        .filter(fileOrDir => !fileOrDir.startsWith('.'))
        .filter(fileOrDir => fs.lstatSync(p.join(path, fileOrDir)).isDirectory())
        .map(dir => {
            const assets = fs.readdirSync(p.join(path, dir))
                .map(filename => p.join(dir, filename));

            let wordSet = ['NO', 'WORDS.CSV', 'FOUND'];
            try {
                wordSet = fs.readFileSync(p.join(path, dir, 'words.csv'), {encoding: 'utf8'}).split(',');
            } catch (e) {
                console.info(`No words.csv file found for ${dir}`);
            }

            return {
                title: dir,
                wordSet,
                images: assets.filter(isImage),
                videos: assets.filter(isVideo),
            };

            function isImage(filename) {
                return p.extname(filename) === '.jpg';
            }

            function isVideo(filename) {
                return p.extname(filename) === '.mp4';
            }
        });
}
