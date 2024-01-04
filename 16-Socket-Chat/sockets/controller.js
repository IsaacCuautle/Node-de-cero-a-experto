import { Socket } from "socket.io";
import { comporbarJWT } from "../helpers/index.js";
const socketController = async(socket = new Socket) =>{
    const token = socket.handshake.headers['x-token'];
    const usuario = await comporbarJWT(token);
    if (!usuario) {
        return socket.disconnect();
    }

    console.log('Conectado',usuario.name);
}

export
{
    socketController
}