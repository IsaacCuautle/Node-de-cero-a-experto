import { Role } from "../models/role.js";
import { User } from "../models/user.js";

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

export
{
    validateRol,
    validateEmail,
    validateUserId
}