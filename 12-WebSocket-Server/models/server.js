import express from "express";
import cors from "cors"


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.middlewares();
        this.paths = {} 
        
        // Rutas de la aplicaccion
        this.routes();
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

    listenPort() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto: '+this.port);
        })
    }
}

export {Server}