import { Router, } from "express";
import { check } from "express-validator";

import { validarCampos, validateJWT } from "../middlewares/index.js";
import { createCategories, deleteCategory, getCategories, getOneCategory, updateCategory } from "../controllers/categoriesController.js";
import { validateCategoryId } from "../helpers/validators.js";
import { isAdmin } from "../middlewares/validar-roles.js";


const router = Router();

// Obtener una categoria en particular - publico
router.get('/:id',
[
    check('id','No es un ID de mongo valido').isMongoId(),
    check('id').custom(validateCategoryId),
    validarCampos
]
,getOneCategory);

// Obtener mtodas las categorias - publico
router.get('/',getCategories);

// Crear una categoria - cualquier pesona con un token valido
router.post('/',
    [
        check('name','Name Obligatory').not().isEmpty(),
        validateJWT,
        validarCampos
    ]
,createCategories);

// Actualizar una categoria por id -privado -cualquiera con un token valido
router.put('/:id',
    validateJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(validateCategoryId),
    validarCampos,
updateCategory);

// Borrar una categoria -admin
router.delete('/:id',
    validateJWT,
    isAdmin,
    check('id','Is not a Mongo ID').isMongoId(),
    check('id').custom(validateCategoryId),
    validarCampos,
deleteCategory);

export
{
    router
}