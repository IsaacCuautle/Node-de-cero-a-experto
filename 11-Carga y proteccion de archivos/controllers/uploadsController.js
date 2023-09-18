import { response } from 'express';
import * as path from "path"
import * as url from "url";

const cargarArchivos = (req,res=response) => {
  
    // Comprueba si existe un archivo en la req, si la longitud es mayor a 0 o si no existe el atributo "Archivo"
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
    // Desestrutura la request y solo trae el atributo archivo
    const {archivo} = req.files; 
    // Separa nombre del archivo y su extension
    const nombreCortado = archivo.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length-1];
    // Validar extension
    const extensionesValidas = ['jpg','png','gif'];
    if(!extensionesValidas.includes(extensionArchivo))
    {
      res.json({
        msg: `La extension ${extensionArchivo} no es valida, ${extensionesValidas}`
      });
    }
    
    res.json({
      msg: `${extensionArchivo}`
    });
  
    // // Establece la ruta donde se guardara el archivo
    // const uploadPath = path.join(__dirname,'../uploads/',archivo.name);
    // // Mueve el archivo
    // archivo.mv(uploadPath, (err) =>{
    //   if (err) {
    //     return res.status(500).send({err});
    //   }
    //   // Si se completa la subida manda la response
    //   res.json({'File uploaded to ': uploadPath});
    // });
}

export
{
    cargarArchivos
}