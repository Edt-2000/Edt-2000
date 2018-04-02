const paths = {
    src: {
        src:            "./src/",
        less:           "./src/less/",
        styles:         "./src/scss/",
        html:            "./src/html/",
        twig:            "./src/twig/",
        typescript:     "./src/typescript/",
        icons:          "./src/sprites/icons/",
        iconsUI:        "./src/sprites/ui/",
        assets:         "./src/static/assets/",
        favicons:       "./src/static/favicons/",
        vendor:         "./node_modules/",
    },

    target: {
        tmp:            "./.tmp/",
        assets:         "./dist/assets/",
        scripts:        "./dist/assets/js/",
        styles:         "./dist/assets/css/",
        html:            "./dist/",
        twig:            "./dist/",
        icons:          "./src/static/assets/img",
        staticAssets:   "./dist/assets/",
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
