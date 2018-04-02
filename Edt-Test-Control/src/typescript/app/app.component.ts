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

                if (key === 97) { //a
                    console.log('preset', key)
                    this.socket.emit('preset', {
                        'preset': '/logo'
                    });
                } else if (key === 98) { //b
                    console.log('preset', key)
                    this.socket.emit('preset', {
                        'preset': '/screensave-bouncer'
                    });
                } else if (key >= 49 && key <= 57) { //1-9
                    console.log('intensity', key)
                    this.socket.emit('intensity', {
                        'intensity': key
                    });
                }

            }

        });

        this.socket.on('message', (message: any) => {
            console.log('message', message);
        });

    }

}

