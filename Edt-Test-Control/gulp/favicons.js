const paths     = require("./_config").paths;
const favicon   = require("./_config").favicon;
const gulp      = require("gulp");
const favicons  = require("gulp-favicons");

function generateFavicons() {
    return gulp.src(paths.src.favicons + 'favicon.png')
        .pipe(favicons({
                appName:        favicon.name,
                appDescription: favicon.description,
                developerName:  "Us Media",
                developerURL:   "http://www.usmedia.nl/",
                background:     favicon.background,
                url:            favicon.url,
                display:        "browser",
                orientation:    "portrait",
                start_url:      "/",
                version:        1.0,
                logging:        false,
                online:         false,
                replace:        true,
                icons: {
                    android:        true,   // Create Android homescreen icon. `boolean`
                    appleIcon:      true,   // Create Apple touch icons. `boolean` or `{ offset: offsetInPercentage }`
                    favicons:       true,   // Create regular favicons. `boolean`
                    firefox:        false,  // Create Firefox OS icons. `boolean` or `{ offset: offsetInPercentage }`
                    windows:        true,   // Create Windows 8 tile icons. `boolean`
                    yandex:         false,  // Create Yandex browser icon. `boolean`
                    appleStartup:   false,  // Create Apple startup images. `boolean`
                    coast: { offset: 25 }   // Create Opera Coast icon with offset 25%. `boolean` or `{ offset: offsetInPercentage }`
                }
            }
        ))
        .pipe(gulp.dest(paths.target.favicons));
}

exports.generateFavicons = generateFavicons;
