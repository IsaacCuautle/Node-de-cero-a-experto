let user = null;
let socket = null;
const url = 'http://localhost:8080/api/auth/'

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
}

const main = async() => {

    await validarJWT()

}

main();

// const socket = io();