import { json, request, response } from "express";
import {User} from '../models/user.js'
import bcryptjs from 'bcryptjs'
import { genJWT } from "../helpers/genJWT.js";
import { googleVerify } from "../helpers/google-verify.js";

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

const googleSignIn = async( req=request, res=response ) => {
    const { id_token } = req.body;

    try {
        const {name, picture, email} = await googleVerify(id_token)
        let user = await User.findOne({email});

        if( !user )
        {
            // Crear el usuario
            const data = {
                name,
                email,
                password: 'Pass',
                picture,
                role: 'USER_ROLE',
                google: true
            };

            user = new User(data);
            await user.save()
        }

        // Si el usuario en DB
        if ( !user.status )
        {
            return res.status(401).json({
                msg: 'User Block'
            });
        }

        // Generar el JWT
        const token = await genJWT(user.id);

        res.json({
            user,
            token
        })
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        })
    }

}

export
{
    login,
    googleSignIn
}