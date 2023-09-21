import { response } from 'express';
import { subirArchivo } from '../helpers/index.js';



const cargarArchivos = async(req,res=response) => {
  
    // Comprueba si existe un archivo en la req, si la longitud es mayor a 0 o si no existe el atributo "Archivo"
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    // Archivos
    // const pathCompleto = await subirArchivo(req.files,['txt','md'],'textos');
    
    //Imagenes
    const pathCompleto = await subirArchivo(req.files,undefined,'imgs');

    res.json({
      msg:`Archivo ${pathCompleto} subido correctamente`
    })
    
}

export
{
    cargarArchivos
}