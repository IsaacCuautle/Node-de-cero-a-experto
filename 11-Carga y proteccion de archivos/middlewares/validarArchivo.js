import { response } from "express"

 const validarArchivoSubir = (req,res=response,next) => {
    // Comprueba si existe un archivo en la req, si la longitud es mayor a 0 o si no existe el atributo "Archivo"
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).send('No files were uploaded. - archivo');
    }

    next();
 }

 export 
 {
    validarArchivoSubir
 }