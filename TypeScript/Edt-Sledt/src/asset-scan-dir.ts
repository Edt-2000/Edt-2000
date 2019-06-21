import * as fs from "fs";

export const availablePhotos = fs.readdirSync("../Edt-Control/src/assets/photos/");
export const availableVideos = fs.readdirSync("../Edt-Control/src/assets/videos/");
