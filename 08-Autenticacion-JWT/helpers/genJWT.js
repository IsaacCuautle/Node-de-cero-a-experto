import jsonwebtoken from "jsonwebtoken"
import "dotenv/config";

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

export
{
    genJWT
}