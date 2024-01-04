let user = null;
let socket = null;
const url = 'http://localhost:8080/api/auth/'

// Referencias HTML
const txtUid = document.querySelector('#txt-uid')
const txtMensaje = document.querySelector('#txt-mensaje')
const ulUsuarios = document.querySelector('#ulUsuarios')
const ulMensajes = document.querySelector('#ulMensajes')
const btnSalir = document.querySelector('#btnSalir')

// Vlidar token el local storage
const validarJWT = async() => {
    const token = localStorage.getItem("token") || "";
    if(token.length <= 10) {
        window.location = 'index.html'
        throw new Error('No hay token en el servidor');
    }

    const resp = await fetch(url,{
        headers: {'x-token': token }
    });

    const {user: userDB, token:tokenDB} = await resp.json();
    localStorage.setItem("token",tokenDB);
    user = userDB;
    document.title = user.name;
    await conectarSocket();
}

const conectarSocket = async() => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    // Usuario Conectado
    socket.on('connect', () => {
        console.log('sockets online');
    });

    // Usuario desconectado
    socket.on('disconnect', () => {
        console.log('sockets offline');
    });

    // Recibir Mensaje
    socket.on('recibir-mensajes',() =>{
        // TODO
    })

    // Desplegar usuarios activos
    socket.on('usuarios-activos',() =>{
        // TODO
    })

    // Mensajes privados
    socket.on('mensaje-privado',() =>{
        // TODO
    })
}

const main = async() => {

    await validarJWT()

}

main();

// const socket = io();