import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
    name: 'video-player',
    template: require('./video-player.template'),
    components: {
    }
})

export class VideoPlayerComponent extends Vue {

}
