import 'dotenv/config';
import { request, response } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { User } from "../models/user.js";

const validateJWT = async (req=request ,res=response ,next) => {
    const token = req.header('x-token');
    
    if( !token ){
        return res.status(401).json({
            msg: 'Unknow Token'
        })
    }
    
    try {
        
        const {uid} = jsonwebtoken.verify(token,process.env.SECRET_KEY);

        // Leer el usuario que corresponde al uid
        const user = await User.findById(uid);
        if(!user){
            return res.status(401).json({
                msg: 'Unexist User'
            })
        }

        // Verificar si el uid tiene status 'true'
        if(!user.status){
            return res.status(401).json({
                msg: 'Unknow User'
            })
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
    
}

export
{
    validateJWT
}