import { Router } from "express";
import { check } from "express-validator";

import { validarCampos } from '../middlewares/validar_campos.js'
import { googleSignIn, login } from "../controllers/authController.js";

const router = Router();

router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],login);


router.post('/google',[
    check('id_token', 'ID_Token es nesesario').not().isEmpty(),
    validarCampos,
    googleSignIn
],login);

export
{
    router
}