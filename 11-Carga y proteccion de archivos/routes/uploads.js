import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar_campos.js'
import { cargarArchivos } from "../controllers/uploadsController.js";


const router = Router();

router.post('/',cargarArchivos);

export
{
    router
}