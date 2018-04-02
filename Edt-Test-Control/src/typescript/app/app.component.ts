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
                console.log(key);

                // todo make controls interface
                // todo: set preset paths in shared config

                if (key === 49) {
                    this.socket.emit('preset', {
                        'preset': '/logo'
                    });
                } else if (key === 50) {
                    this.socket.emit('preset', {
                        'preset': '/screensave-bouncer'
                    });
                }

            }

        });

        this.socket.on('message', (message: any) => {
            console.log('message', message);
        });

    }

}

