import * as http from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import { IBeatMsg, IIntensityMsg, IPhotoMsg, IPresetMsg, ITextMsg, IVideoMsg } from '../../../../Shared/socket';

export default class SocketServer {
    private app: express.Application;
    private httpServer: http.Server;
    private ioServer: socketIo.Server;
    private port: number = 8080;

    constructor() {
        this.app = express();
        this.httpServer = http.createServer(this.app);

        this.ioServer = socketIo(this.httpServer);

    }

    start () {
        this.httpServer.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });
        //
        this.ioServer.on('connect', (socket: any) =>{
            console.log('Connected client on port %s.', this.port);

            socket.on('preset', (m: IPresetMsg) => {
                this.ioServer.emit('preset', m);
                console.log('preset', m);
            });

            socket.on('beat', (m: IBeatMsg) => {
                this.ioServer.emit('beat', m);
                console.log('beat', m);
            });

            socket.on('intensity', (m: IIntensityMsg) => {
                this.ioServer.emit('intensity', m);
                console.log('intensity', m);
            });

            socket.on('photo', (m: IPhotoMsg) => {
                this.ioServer.emit('photo', m);
                console.log('photo', m);
            });

            socket.on('text', (m: ITextMsg) => {
                this.ioServer.emit('text', m);
                console.log('text', m);
            });

            socket.on('video', (m: IVideoMsg) => {
                this.ioServer.emit('video', m);
                console.log('video', m);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
}
