import * as fs from "fs";
import * as p from "path";
import { ContentGroup } from "../../../Shared/actions/types";
import { createFullColor } from "../../config/colors";
import { IColor } from "../../../Shared/colors/types";

export const scannedContentGroups = readDirOneDeep(
    "../Edt-Vidt/public/assets/media-by-group",
);

function readDirOneDeep(path: string): ContentGroup[] {
    return fs
        .readdirSync(path)
        .filter((fileOrDir) => !fileOrDir.startsWith("."))
        .filter((fileOrDir) =>
            fs.lstatSync(p.join(path, fileOrDir)).isDirectory(),
        )
        .map((dir) => {
            const assets = fs
                .readdirSync(p.join(path, dir))
                .map((filename) => p.join(dir, filename).replace("\\", "/"));

            let wordSet = ["NO", "WORDS.TXT", "FOUND"];
            try {
                wordSet = fs
                    .readFileSync(p.join(path, dir, "words.txt"), {
                        encoding: "utf8",
                    })
                    .split("\n");
            } catch (e) {
                console.info(
                    `No words.txt file found for ${dir}. Please create a words.txt file in the directory.`,
                );
            }

            let colorPalettes: IColor[][];
            try {
                colorPalettes = fs
                    .readFileSync(p.join(path, dir, "colors.txt"), {
                        encoding: "utf8",
                    })
                    .split("\n")
                    .filter((set) => set.length > 0)
                    .map((set) =>
                        set
                            .split(",")
                            .map((e) => e.trim())
                            .map((hue) => createFullColor(+hue)),
                    );
            } catch (e) {
                console.info(
                    `No colors.txt file found for ${dir}. Please create a colors.txt file in the directory.`,
                );
            }

            const { songNr, title } = checkDirName(dir);

            return {
                songNr,
                title,
                wordSet,
                colorPalettes,
                images: assets.filter(isImage),
                videos: assets.filter(isVideo),
            };
        });
}

export function toFileName(filename): string {
    return p.basename(filename, p.extname(filename));
}

function isImage(filename): boolean {
    return [".jpg", ".jpeg", ".gif", ".png"].includes(p.extname(filename));
}

function isVideo(filename): boolean {
    return p.extname(filename) === ".mp4";
}

function checkDirName(dir: string) {
    // INSERT REGEX??

    const songNr = +dir.split("_")[0];
    const title = dir.split("_")[1];

    return { songNr, title };
}
