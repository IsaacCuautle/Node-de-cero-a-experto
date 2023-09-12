import { response } from "express";
import { User, Category, Product } from "../models/index.js";
import { Types } from 'mongoose';

const coleccionesPermitidas = [
    'users',
    'categories',
    'products',
    'roles'
];

const buscarUsuarios = async(termino = '',res = response ) => {
    // Comprueba si es un ID de Mongo y devuelve el usuario al que corresponde dicho ID
    const esMongoId = Types.ObjectId.isValid(termino);
    if(esMongoId){
        const usuario = await User.findById(termino);
        return res.json({
            //? si no encuentra un usuario manda un array vacio
            results: (usuario) ? [usuario] : []
        });         
    }


    // Expresiones regulares no sensibles a mayusculas
    const regex = new RegExp(termino, 'i')
    // Busca usuarios segun nombre o correo y que su status se encuentre activo
    const usuarios = await User.find({
        $or: [{name: regex},{email: regex}],
        $and: [{status: true}]
    });

    res.json({
        results: usuarios
    });    

}

const buscar = (req,res=response) => {

    const {coleccion,termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion))
    {
        //! Regresa un error si la coleccion no esta permitida
        res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }


    switch (coleccion) {
        case 'users':
                buscarUsuarios(termino,res);
            break;
        case 'categories':

            break;
        case 'products':

            break;
        case 'roles':

            break;
        default:
            res.status(500).json({
                msg: 'Hable con el administrador para añadir esta busqueda'
            });
    }
}


export
{
    buscar,
}