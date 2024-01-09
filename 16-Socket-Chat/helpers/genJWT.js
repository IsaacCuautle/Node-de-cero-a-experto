import jsonwebtoken from "jsonwebtoken"
import "dotenv/config";
import { User } from "../models/index.js";
import { renovarToken } from "../controllers/authController.js";

const genJWT = (uid = '') => {
    return new Promise((resolve,reject) => {
        const payload = {uid};

        jsonwebtoken.sign(payload,process.env.SECRET_KEY,{
            expiresIn: '4h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se puedo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}


const comporbarJWT = async(token = '') => {
    try {


        if(token.length < 10){
            return null
        }
        
        
        const {uid} = jsonwebtoken.verify(token,process.env.SECRET_KEY);

        
        const usuario = await User.findById(uid);

        if(usuario)
        {
            if(usuario.status)
            {
                return usuario;
        
            }else{
                return null;
            }
        }

    } catch (error) {
        return null;
    }
}

export
{
    genJWT,
    comporbarJWT
}