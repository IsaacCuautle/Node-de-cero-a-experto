import { Router } from "express";
import { userDelete, userGet, userPatch, userPost, userPut } from "../controllers/userController.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar_campos.js";
import { validateEmail, validateRol, validateUserId } from "../helpers/validators.js";


const router = Router();

router.get('/',userGet);

router.post('/',[
    check('email', 'El email no es valido').isEmail(),
    check('name', 'El name no es valido').not().isEmpty(),
    check('password', 'El password no es valido').isLength({min:6}),
    // check('role', 'El role no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(validateRol),
    check('email').custom(validateEmail),
    validarCampos
],userPost);


router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validateUserId),
    check('role').custom(validateRol),
    validarCampos,

],userPut);

router.patch('/',userPatch);

router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validateUserId),
    validarCampos
],userDelete);


export {router};