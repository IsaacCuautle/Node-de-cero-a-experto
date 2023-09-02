import express from "express";
import cors from "cors"
import {router as routerUser}  from "../routes/user.js";
import { router as routerAuth } from "../routes/auth.js";
import {dbConection} from "../database/config.js"

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'

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

        this.app.use(this.usuariosPath, routerUser);
        this.app.use(this.authPath, routerAuth);
        
    }

    listenPort() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto: '+this.port);
        })
    }
}

export {Server}