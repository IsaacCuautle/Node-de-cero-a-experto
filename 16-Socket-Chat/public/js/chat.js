


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
    socket.on('recibir-mensajes',dibujarMensajes);

    // Desplegar usuarios activos
    socket.on('usuarios-activos',dibujarUsuarios);


    // Mensajes privados
    socket.on('mensaje-privado',() =>{
        // TODO
    })
}

// Despliega en pantalla los usuarios conectados y su uid
const dibujarUsuarios = (usuarios = []) =>{
    let usersHtml = '';
    usuarios.forEach(({uid,name}) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        
        `;
    });

    ulUsuarios.innerHTML = usersHtml;
}

// Despliega en pantalla los mesnajes 
const dibujarMensajes = (mensajes = []) =>{
    let mensajesHtml = '';
    mensajes.forEach(({nombre,mensaje}) => {
        mensajesHtml += `
            <li>
                <p>
                    <span class="text-primary">${nombre}: </span>
                    <span>${mensaje}</span>
                </p>
            </li>
        
        `;
    });

    ulMensajes.innerHTML = mensajesHtml;
}


txtMensaje.addEventListener('keyup',({keyCode}) => {
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;
    if(keyCode != 13) return;
    if(mensaje.length === 0) return;

    socket.emit('enviar-mensaje',{mensaje,uid});
    txtMensaje.value = '';

})


const main = async() => {

    await validarJWT()

}

main();

// const socket = io();