import { request, response } from "express"

const isAdmin = (req=request,res=response,next) => {
    if( !req.user )
    {
        return res.status(500).json({
            msg: 'Unhautorized Token'
        });
    }

    const {role, name} = req.user;

    if( role !== 'ADMIN_ROLE')
    {
        return res.status(401).json({
            msg: `User ${name} has unauthorized role`
        });

    }
    
    next();
}

const hasRole = (...roles) => {
    return (req, res=response, next) => {
        if( !req.user )
        {
            return res.status(500).json({
                msg: 'Unhautorized Token'
            });
        }

        if( !roles.includes(req.user.role) )
        {
            return res.status(401).json({
                msg: `Se requiere de alguno de los siguiente roles ${ roles }`
            });
    
        }
        next();
    }

}

export
{
    isAdmin,
    hasRole
}