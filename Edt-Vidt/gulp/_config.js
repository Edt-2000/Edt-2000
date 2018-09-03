const paths = {
    src: {
        src:            "./src/",
        less:           "./src/less/",
        styles:         "./src/scss/",
        html:            "./src/html/",
        typescript:     "./src/typescript/",
        icons:          "./src/sprites/icons/",
        iconsUI:        "./src/sprites/ui/",
        assets:         "../assets/",
        vendor:         "./node_modules/",
    },

    target: {
        tmp:            "./.tmp/",
        assets:         "../dist/Edt-Vidt/assets/",
        scripts:        "../dist/Edt-Vidt/assets/js/",
        styles:         "../dist/Edt-Vidt/assets/css/",
        html:           "../dist/Edt-Vidt/",
        staticAssets:   "../dist/Edt-Vidt/assets/",
        icons:          "./src/static/assets/img",
        favicons:       "./src/static/favicons/",
    }
};

const clean = [
    paths.target.tmp,
    paths.target.assets
];

const favicon = {
    name:           "Test project",
    description:    "",
    background:     "#c6004f",
    url:            "https://www.website.com"
};

exports.paths   = paths;
exports.clean   = clean;
exports.favicon = favicon;
