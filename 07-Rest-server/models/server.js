import express from "express";
import cors from "cors"
import { router } from "../routes/user.js";
import {dbConection} from "../database/config.js"

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'

        // Conect to DB
        this.conectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicaccion
        this.routes();
    }

    async conectDB(){
        await dbConection();
    }

    middlewares() {
        // Directorio publico
        this.app.use(express.static('./public'));

        // CORS
        this.app.use(cors());

        // Lectura y Parseo
        this.app.use(express.json());

    }

    routes() {

        this.app.use(this.usuariosPath, router)
        
    }

    listenPort() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto: '+this.port);
        })
    }
}

export {Server}