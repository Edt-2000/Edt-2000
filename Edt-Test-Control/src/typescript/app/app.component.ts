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
            console.log('connected');
            document.onkeypress = (e) => {
                const key = e.which;
                this.socket.emit('message', {
                    'key': key
                });
            }

        });

        this.socket.on('message', (message: any) => {
            console.log('message', message);
        });

        // router.push({ path: '/screensave-bouncer' });

    }

}

