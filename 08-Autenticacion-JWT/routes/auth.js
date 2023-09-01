import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar_campos.js'
import { login } from "../controllers/authController.js";

const router = Router();

router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],login);

export
{
    router
}