import { response } from 'express';
import { subirArchivo } from '../helpers/index.js';
import { User,Product } from '../models/index.js';



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


const actualizarImagen= async(req,res=response)=> {
  const {id,coleccion} = req.params

  let modelo;

  // Valida si es una coleccion permitida
  switch (coleccion) {
    // Valida si existe el ID  en la coleccion correspondiente
    case 'usuarios':
        modelo = await User.findById(id);
        if(!modelo)
        {
          return res.status(400).json({
            msg: `No existe un usuario con ID ${id}`
          })
        }
      break;
    case 'productos':
        modelo = await Product.findById(id);
        if(!modelo)
        {
          return res.status(400).json({
            msg: `No existe un producto con ID ${id}`
          })
        }
      break;
    
    default:
      return res.status(500).json({
        msg: 'Coleccion no definida'
      });
  }

  // Establece la ruta donde se guardara la imagen segun  la coleccion
  const pathCompleto = await subirArchivo(req.files,undefined,coleccion);
  // Establece la propiedad Img del objeto en el modelo correspondiente con el nombre de la imgen subida
  modelo.img = pathCompleto;
  // Graba los cambios realizados en el objeto del modelo
  await modelo.save(); 
  // Devuelve el objeto del modelo con sus propiedades actualizadas
  res.json(modelo);
}

export
{
    cargarArchivos,
    actualizarImagen
}