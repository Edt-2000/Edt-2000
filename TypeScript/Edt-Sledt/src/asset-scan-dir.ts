import * as fs from "fs";
import {Actions, nextActionFromMsg} from "../../Shared/actions";

console.log('Scanning directories for assets...');

const photos = fs.readdirSync("../Shared/assets/photos/");
const videos = fs.readdirSync("../Shared/assets/videos/");

nextActionFromMsg(Actions.imageList(photos));
nextActionFromMsg(Actions.videoList(videos));

export const AssetScanDir = 'AssetScanDir';
