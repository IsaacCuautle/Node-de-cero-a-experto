import express from "express";
import cors from "cors";
import {createServer} from "http";
import { Server as ServerSoketIo } from "socket.io";
import { socketController } from "../sockets/controller.js";

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
        this.io.on('connection',socketController);
    }

    listenPort() {
        this.server.listen(this.port, () => {
            console.log('Corriendo en el puerto: '+this.port);
        })
    }
}

export {Server}

