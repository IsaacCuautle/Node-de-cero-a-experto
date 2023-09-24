import { Router } from "express";
import { check } from "express-validator";

import { actualizarImagen, cargarArchivos } from "../controllers/uploadsController.js";
import { validarCampos } from '../middlewares/validar_campos.js';
import { coleccionesPermitidas } from "../helpers/index.js";


const router = Router();

router.post('/',cargarArchivos );

router.put('/:coleccion/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos']) ),
    validarCampos
],actualizarImagen);

export {
    router
};
