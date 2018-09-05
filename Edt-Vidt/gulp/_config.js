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
        assets:         "./dist/assets/",
        scripts:        "./dist/assets/js/",
        styles:         "./dist/assets/css/",
        html:           "./dist/",
        staticAssets:   "./dist/assets/",
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
