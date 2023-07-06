
const fs = require('fs')
const crearArchivoDeTabla = async(base = 1,listar = false,hasta=10) => {

    /// ASYNC ///
    try {
        let salida = '';

        for (let i = 1; i <= hasta; i++) {
            salida += `${base} * ${i} = ${base*i}\n`
        }

        if (listar) {

            console.log(`==============================
        Tabla del ${base}\n==============================`);
            console.log(salida.yellow);
        }
        
        fs.writeFileSync(`./salida/Tabla-del-${base}-limite-${hasta}.txt`,salida)
        
        return(`Tabla-del-${base}-limite-${hasta}.txt`);  

    } catch (error) {
        throw error;
    }


    ////////////////
    /// ORIGINAL ///
    ////////////////
    // let salida = '';
    // console.log(`
    // ==============================
    //        Tabla del ${base} 
    // ==============================`);

    // for (let i = 1; i <= 10; i++) {
    //     salida += `${base} * ${i} = ${base*i}\n`
    // }
    
    // console.log(salida);
    
    // fs.writeFileSync(`Tabla-del-${base}.txt`,salida)
    // console.log(`Tabla del ${base}  creado!`);




    ///////////////////////////
    // SOLUCION CON PROMISE ///
    ///////////////////////////
    // return new Promise((resolve,reject) => {

    //     for (let i = 1; i <= 10; i++) {
    //         salida += `${base} * ${i} = ${base*i}\n`
    //     }
        
    //     console.log(salida);
        
    //     fs.writeFileSync(`Tabla-del-${base}.txt`,salida)
    //     salida?resolve(`Tabla del ${base}.txt`):reject('No se pudo crear el archivo');
    // })
    
} 

module.exports = {
    crearArchivoDeTabla
}