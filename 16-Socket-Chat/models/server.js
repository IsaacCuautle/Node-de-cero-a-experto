import express from "express";
import cors from "cors"
import { createServer } from "http";
import { Server as ServerSoketIo } from "socket.io";

import {router as routerUser}  from "../routes/user.js";
import { router as routerAuth } from "../routes/auth.js";
import { router  as routerCategories} from "../routes/Categories.js";
import { router  as routerProducts} from "../routes/products.js";
import {router as routerBuscar} from "../routes/buscar.js"
import {router as routerUploads} from "../routes/uploads.js"
import fileUpload from 'express-fileupload';


import {dbConection} from "../database/config.js"
import { socketController } from "../sockets/controller.js";



class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 8080;
        this.server = createServer(this.app);
        this.io = new ServerSoketIo(this.server);
        
        this.paths = {
            auth: '/api/auth',
            categories: '/api/categories',
            users: '/api/usuarios',
            products: '/api/products',
            buscar: '/api/buscar',
            uploads: '/api/uploads'
        } 
        

        // Conect to DB
        this.conectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicaccion
        this.routes();

        // Sockets
        this.sockets();
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

        // Fileupload - Cargar archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            // Permite crear un directorio si no existe
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.paths.users, routerUser);
        this.app.use(this.paths.auth, routerAuth);
        this.app.use(this.paths.categories, routerCategories);
        this.app.use(this.paths.products, routerProducts);
        this.app.use(this.paths.buscar, routerBuscar);
        this.app.use(this.paths.uploads, routerUploads);
        
    }

    sockets() 
    {
        this.io.on('connection', (socket) => socketController(socket,this.io) );
    }

    listenPort() {
        this.server.listen(this.port, () => {
            console.log('Corriendo en el puerto: '+this.port);
        })
    }
}

export {Server}