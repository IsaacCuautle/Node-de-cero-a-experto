import { response } from 'express';

const cargarArchivos = (req,res=response) => {
    res.json({
        msg: 'Desde uploadsController'
    })
}

export
{
    cargarArchivos
}