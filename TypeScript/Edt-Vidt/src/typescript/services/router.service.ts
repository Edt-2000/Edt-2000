import VueRouter from "vue-router";
import { PhotoGlitcherComponent } from "../presets/photo-glitcher/photo-glitcher.component";
import { BluescreenComponent } from "../presets/bluescreen/bluescreen.component";
import { HackingComponent } from "../presets/hacking/hacking.component";
import { VistaComponent } from "../presets/vista/vista.component";
import { LogoComponent } from "../presets/logo/logo.component";
import { PhotoBouncerComponent } from "../presets/photo-bouncer/photo-bouncer.component";
import { ColorBackgroundComponent } from "../presets/color-background/color-background.component";
import { TextBouncerComponent } from "../presets/text-bouncer/text-bouncer.component";
import { VideoPlayerComponent } from "../presets/video-player/video-player.component";
import { GridscapeComponent } from "../presets/gridscape/gridscape.component";
import { ShutdownComponent } from "../presets/shutdown/shutdown.component";
import { vidtPresets } from "../../../../Shared/vidt-presets";
import { ColorTwinkleComponent } from "../presets/color-twinkle/color-twinkle.component";
import { KaraokeComponent } from "../presets/karaoke/karaoke.component";

/**
 * We need to map the vidtPreset enum to Vue component routing;
 * we don't want cross imports between projects
 */
export const router = new VueRouter({
    base: "",
    routes: [
        { path: "/" + vidtPresets[vidtPresets.logo] || "", component: LogoComponent },
        { path: "/" + vidtPresets[vidtPresets.bluescreen] || "", component: BluescreenComponent },
        { path: "/" + vidtPresets[vidtPresets.color] || "", component: ColorBackgroundComponent },
        { path: "/" + vidtPresets[vidtPresets.gridscape] || "", component: GridscapeComponent },
        { path: "/" + vidtPresets[vidtPresets.hacking] || "", component: HackingComponent },
        { path: "/" + vidtPresets[vidtPresets.photobouncer] || "", component: PhotoBouncerComponent },
        { path: "/" + vidtPresets[vidtPresets.photoglitcher] || "", component: PhotoGlitcherComponent },
        { path: "/" + vidtPresets[vidtPresets.textBouncer] || "", component: TextBouncerComponent },
        { path: "/" + vidtPresets[vidtPresets.shutdown] || "", component: ShutdownComponent },
        { path: "/" + vidtPresets[vidtPresets.video] || "", component: VideoPlayerComponent },
        { path: "/" + vidtPresets[vidtPresets.vista] || "", component: VistaComponent },
        { path: "/" + vidtPresets[vidtPresets.colorTwinkle] || "", component: ColorTwinkleComponent },
        { path: "/" + vidtPresets[vidtPresets.karaoke] || "", component: KaraokeComponent },
        { path: "*", redirect: "/" + vidtPresets[vidtPresets.logo] || "" },
    ],
});
