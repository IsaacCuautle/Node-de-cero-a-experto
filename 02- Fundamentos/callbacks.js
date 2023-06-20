// Un callback es una funcion que se ejecuta eventualmente 
// setTimeout (function() {
//     console.log('hola mundo');   
// },1000)

const getUsuarioByID = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Isaac'
    }

    setTimeout(() => {
       callback(usuario)
    }, 1500);
}

getUsuarioByID(10,( usuario)=>{
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
});