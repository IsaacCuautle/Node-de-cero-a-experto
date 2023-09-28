import { Router } from "express";
import { check } from "express-validator";

import { MostrarImagen, actualizarImagen, cargarArchivos } from "../controllers/uploadsController.js";
import { validarCampos } from '../middlewares/validar_campos.js';
import { coleccionesPermitidas } from "../helpers/index.js";
import { validarArchivoSubir } from "../middlewares/validarArchivo.js";


const router = Router();

router.post('/',validarArchivoSubir,cargarArchivos );

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','No es un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos']) ),
    validarCampos
],actualizarImagen);

router.get('/:coleccion/:id',[ 
    check('id','No es un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos']) ),
    validarCampos   
],MostrarImagen)

export {
    router
};
