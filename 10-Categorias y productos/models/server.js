import express from "express";
import cors from "cors"

import {router as routerUser}  from "../routes/user.js";
import { router as routerAuth } from "../routes/auth.js";
import { router  as routerCategories} from "../routes/Categories.js";
import { router  as routerProducts} from "../routes/products.js";
import {router as routerBuscar} from "../routes/buscar.js"

import {dbConection} from "../database/config.js"



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/usuarios',
            products: '/api/products',
            buscar: '/api/buscar'
        } 
        

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

        this.app.use(this.paths.users, routerUser);
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.categories, routerCategories);
        this.app.use(this.paths.products, routerProducts);
        this.app.use(this.paths.buscar, routerBuscar);
        
    }

    listenPort() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto: '+this.port);
        })
    }
}

export {Server}