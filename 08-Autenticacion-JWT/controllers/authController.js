import { response } from "express";
import {User} from '../models/user.js'
import bcryptjs from 'bcryptjs'
import { genJWT } from "../helpers/genJWT.js";

const login = async(req,res = response) => {

    const { email, password} = req.body;

    try {

        // Verificar si el email Existe
        const user = await User.findOne({email})
        if( !user ){
            return res.status(400).json({
                msg: 'El Email / password no son correctos'
            })
        }

        // Verificar si el usuario existe o esta activo
        if( !user.status){
            return res.status(400).json({
                msg: 'Ese usuario no existe'
            })
        }
        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password)
        if( !validPassword ){
            return res.status(400).json({
                msg: 'El password es incorrecto'
            })
        }

        // Generar el JWT
        const token = await genJWT(user.id);


        res.json({
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo Salio Mal'
        })
    }

    
}

export
{
    login
}