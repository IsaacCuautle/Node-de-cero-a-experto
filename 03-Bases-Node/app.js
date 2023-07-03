const {crearArchivoDeTabla} = require('./helpers/multiplicar')
console.clear();

const  [, , arg3 = 'base=5'] = process.argv;
const [, base = 5 ] = arg3.split('=')
console.log(base);

crearArchivoDeTabla(base)
    .then(nombreDeArchivo => console.log(nombreDeArchivo,'creado'))
    .catch( err => console.log(err))



