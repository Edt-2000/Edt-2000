import * as fs from "fs";
import { Actions, nextActionFromMsg } from "../../Shared/actions";

console.log("Scanning directories for assets...");

const photos = fs.readdirSync("../Edt-Control/src/assets/photos/");
const videos = fs.readdirSync("../Edt-Control/src/assets/videos/");

nextActionFromMsg(Actions.imageList(photos));
nextActionFromMsg(Actions.videoList(videos));

export const AssetScanDir = "AssetScanDir";
