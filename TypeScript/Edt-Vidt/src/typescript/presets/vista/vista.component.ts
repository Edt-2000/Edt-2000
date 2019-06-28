import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
    name: "vista",
    template: require("./vista.template"),
    components: {},
})
export class VistaComponent extends Vue {
}
