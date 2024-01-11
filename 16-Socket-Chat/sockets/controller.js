import { Socket } from "socket.io";
import { comporbarJWT } from "../helpers/index.js";
import {ChatMensajes } from "../models/index.js";

const chatMensajes = new ChatMensajes(); 

const socketController = async(socket = new Socket(), io ) =>{
    const token = socket.handshake.headers['x-token'];
    const usuario = await comporbarJWT(token);
    if (!usuario) {
        return socket.disconnect();
    }

    // Agregar al usuario conectado
    chatMensajes.conectarUsuaurio(usuario);
    io.emit('usuarios-activos',chatMensajes.usuariosArr);
    socket.emit('recibir-mensajes',chatMensajes.Ultimos10);


    // Conectarlo a una sala especial
    socket.join(usuario.id);


    // Limpiar cuando alguien se desconecta 
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuarios-activos',chatMensajes.usuariosArr);
    })

    // Enviar mensajes
    socket.on('enviar-mensaje',({uid, mensaje}) => {

        // Mensaje global
        if(!uid){
            chatMensajes.enviarMensaje(usuario.id,usuario.name, mensaje)
            io.emit('recibir-mensajes',chatMensajes.Ultimos10);
        }

        // Mensaje privado
        socket.to(uid).emit('mensaje-privado',{de: usuario.name, mensaje})

    })

    

}

export
{
    socketController
}