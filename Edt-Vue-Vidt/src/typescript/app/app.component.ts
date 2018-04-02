import Vue from 'vue';
import Component from 'vue-class-component';
import * as io from 'socket.io-client';

@Component({
    name: 'app',
    template: require('./app.template')
})
export default class App extends Vue {
    socket = io('localhost:8080');

    mounted() {
        this.socket.on('connect', () =>{
            console.log('socket connected');
        });

        this.socket.on('message', (message: any) => {
            console.log('message', message);
        });


        //communication servicev > socket > obser > filters > meeredere observerabesl
        // router.push({ path: '/screensave-bouncer' });

    }

}

