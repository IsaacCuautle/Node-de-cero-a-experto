import { Router } from "express";
import { check } from "express-validator";

import * as  middlewares from '../middlewares/index.js'
import { googleSignIn, login, renovarToken } from "../controllers/authController.js";

const router = Router();

router.post('/login',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    middlewares.validarCampos
],login);


router.post('/google',[
    check('id_token', 'ID_Token es nesesario').not().isEmpty(),
    middlewares.validarCampos,
    googleSignIn
],login);

router.get('/', middlewares.validateJWT, renovarToken)

export
{
    router
}