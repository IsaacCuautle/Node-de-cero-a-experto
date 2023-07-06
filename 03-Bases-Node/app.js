const {crearArchivoDeTabla} = require('./helpers/multiplicar');
const argv = require('./config/yargs');




console.clear();
// console.log(argv);

// const  [, , arg3 = 'base=5'] = process.argv;
// const [, base = 5 ] = arg3.split('=')

crearArchivoDeTabla(argv.b,argv.l,argv.h)
    .then(nombreDeArchivo => console.log(`${nombreDeArchivo} creado`.brightGreen))
    .catch( err => console.log(err.brightRed))


