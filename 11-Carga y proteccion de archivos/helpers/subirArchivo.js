import * as path from "path"
import * as url from "url";
import { v4 as uuidv4 } from "uuid";

const subirArchivo = (files,extensionesValidas = ['jpg','png','gif'],carpeta='') => {

    return new Promise((resolve,reject) => {
        // Desestrutura la request y solo trae el atributo archivo
        const {archivo} = files; 

        // Separa nombre del archivo y su extension
        const nombreCortado = archivo.name.split('.');
        const extensionArchivo = nombreCortado[nombreCortado.length-1];

        // Validar extension
        if(!extensionesValidas.includes(extensionArchivo))
        {
            return reject(`La extension ${extensionArchivo} no es valida, ${extensionesValidas}`)
        }
        

        // Renombrar la imagen con un uuid
        const nombreTemporal = uuidv4() +'.'+extensionArchivo;

        // Establece la ruta donde se guardara el archivo
        const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
        const uploadPath = path.join(__dirname,'../uploads/',carpeta,nombreTemporal);
        // Mueve el archivo
        archivo.mv(uploadPath, (err) =>{
        if (err) {
            return reject(err);
        }
        // Si se completa la subida manda la response
        resolve(nombreTemporal);
        });
    });

    
}

export
{
    subirArchivo
}