import { response } from 'express';
import { subirArchivo } from '../helpers/index.js';
import { User,Product } from '../models/index.js';
import * as path from "path"
import * as url from "url";
import * as fs from "fs";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const cargarArchivos = async(req,res=response) => {
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

  // Verificar si ya existe una imagen asignada
  try {
    // Comprueba si la propiedad img existe
    if(modelo.img)
    {
      // Borra la imagen anterior
      const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
      if(fs.existsSync(pathImagen))
      {
        fs.unlinkSync(pathImagen);
      }
    }
  } catch (error) {
    console.log(error);
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


const MostrarImagen = async(req, res=response) => {
  const {id,coleccion} = req.params;

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

  // Verificar si ya existe una imagen asignada
  try {
    // Comprueba si la propiedad img existe
    if(modelo.img)
    {
      // Regresa la imagen que corresponde al id
      const pathImagen = path.join(__dirname,'../uploads',coleccion,modelo.img);
      if(fs.existsSync(pathImagen))
      {
        return res.sendFile(pathImagen)
      }
    }
  } catch (error) {
    console.log(error);
  } 

  // Si no hai una imagen asignada devuelve la sig imagen
  const pathImagen = path.join(__dirname,'../public/assets/no-image.jpg')
  res.sendFile(pathImagen);
}

export
{
    cargarArchivos,
    actualizarImagen,
    MostrarImagen
}