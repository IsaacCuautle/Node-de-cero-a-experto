import express from "express";
import userRoutes from "../routes/user";
import cors from "cors";
import db from "../db/conection";

class Server {

    private app: express.Application;
    private port: string;
    private apiPaths = {
        users: '/api/users',
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        // DB Conection
        this.dbConnect();

        // Middlewares
        this.middlewares();

        // Definir rutas
        this.routes();
    }


    async dbConnect(){
        try {
            await db.authenticate();
            console.log('DB ONLINE')
        } catch (error) {
            console.error('An error occurred:', error);
            throw error;   
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta publica
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto: ",this.port);
            
        })
    }
}

export default Server;