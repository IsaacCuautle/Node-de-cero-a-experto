import { Category,Product,User } from "../models/index.js";
import { Role } from "../models/role.js";

const validateRol = async(role = '' )=>{
    const existeRol = await Role.findOne({role});
    if(!existeRol){
        throw new Error(`El rol ${role} no esta registrado en la BD`);
    }
}

const validateEmail = async(email = '') => {
    const existEmail = await User.findOne({email});
    if(existEmail){
        throw new Error(`Ya existe alguien registrado con ${email}`)
    }  
}

const validateUserId = async(id) => {
    const existUserId = await User.findById(id);
    if(!existUserId){
        throw new Error(`El id ${id} no existe`)
    }  
}

// Validadores de categorias

const validateCategoryId = async(id) => {
    const existCategoryId = await Category.findById(id);
    if(!existCategoryId){
        throw new Error(`El id ${id} no existe`);
    }  
}

// Validadores Productos

const validateProductId = async(id) => {
    const existProductId = await Product.findById(id);
    if(!existProductId){
        throw new Error(`El id ${id} no existe`);
    }  
}

// Validar colecciones permitidas
const coleccionesPermitidas = (coleccion='',colecciones=[]) =>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida)
    {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;
}

export
{
    validateRol,
    validateEmail,
    validateUserId,
    validateCategoryId,
    validateProductId,
    coleccionesPermitidas
}