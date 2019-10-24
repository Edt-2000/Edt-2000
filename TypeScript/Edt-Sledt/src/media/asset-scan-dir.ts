import * as fs from 'fs';
import * as p from 'path';
import { ContentGroup } from '../../../Shared/helpers/types';

export const scannedContentGroups = readDirOneDeep('../Edt-Control/src/assets/media-by-group');

function readDirOneDeep(path: string): ContentGroup[] {
    return fs.readdirSync(path)
        .filter(fileOrDir => !fileOrDir.startsWith('.'))
        .filter(fileOrDir => fs.lstatSync(p.join(path, fileOrDir)).isDirectory())
        .map(dir => {
            const assets = fs.readdirSync(p.join(path, dir))
                .map(filename => p.join(dir, filename));

            let wordSet = ['NO', 'WORDS.TXT', 'FOUND'];
            try {
                wordSet = fs.readFileSync(p.join(path, dir, 'words.txt'), {encoding: 'utf8'}).split('\n');
            } catch (e) {
                console.info(`No words.txt file found for ${dir}. Please create a words.txt file in the directory.`);
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
