import { Router, } from "express";
import { check } from "express-validator";
import { 
    getProduct,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/productsController.js";
import { validarCampos, validateJWT,isAdmin } from "../middlewares/index.js";
import { validateCategoryId, validateProductId } from "../helpers/validators.js";

const router = Router();

// Obtener un producto en particular - publico
router.get('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),
    check('id').custom(validateProductId),
    validarCampos
],getProduct);

// Obtener todos los productos - publico
router.get('/',getProducts);

// Crear un producto - cualquier pesona con un token valido
router.post('/',[
    validateJWT,
    check('name','El nombre del producto es obligatorio').not().isEmpty(),
    check('category','No es un ID de Mongo valido ').isMongoId(),
    check('category').custom(validateCategoryId),
    validarCampos
],createProduct);

// Actualizar un producto por id -privado -cualquiera con un token valido
router.put('/:id',[
    validateJWT,
    check('category','No es un ID de Mongo valido'),
    check('id').custom(validateProductId),
],updateProduct);

// Borrar un producto -admin
router.delete('/:id',[
    validateJWT,
    isAdmin,
    check('id','No es un ID de Mongo valido').isMongoId(),
    check('id').custom(validateProductId)
],deleteProduct);

export
{
    router
}