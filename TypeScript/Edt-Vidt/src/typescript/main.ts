import Vue from "vue";
import VueRouter from "vue-router";
import App from "./app/app.component";

Vue.use(VueRouter);

const app = new Vue({
    el: "#app",
    template: "<app />",
    components: {
        App,
    },
});
