import express from "express";
import cors from "cors";
import {createServer} from "http";
import { Server as ServerSoketIo } from "socket.io";


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.server = createServer(this.app);
        this.io = new ServerSoketIo(this.server)
        
        // Moddlewares
        this.middlewares();
        
        // Rutas de la aplicaccion
        this.routes();

        // Configuracion de Sockets
        this.sockets();
    }



    middlewares() {
        // CORS
        this.app.use(cors());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        // this.app.use(this.paths.users, routerUser); 
    }

    sockets(){
        this.io.on('connection',socket => {
            // console.log("Cliente conectado ",socket.id);
            
            socket.on('disconnect', () => {
                // console.log('Cliente desconectado', socket.id);
            });

            socket.on('enviar-mensaje',(payload, callback)=>{
                const id = 'enviado';
                callback(id);
                // this.io.emit('enviar-mensaje',payload);
            })
        });
    }

    listenPort() {
        this.server.listen(this.port, () => {
            console.log('Corriendo en el puerto: '+this.port);
        })
    }
}

export {Server}

