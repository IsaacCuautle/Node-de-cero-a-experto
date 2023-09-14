import { request, response } from "express";
import { User, Category, Product } from "../models/index.js";
import { Types } from 'mongoose';

const coleccionesPermitidas = [
    'users',
    'categories',
    'products',
    'roles'
];

// Buscar usuario por ID o por Nombre
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

// Buscar categoria por ID o por nombre
const buscarCategorias = async(termino='',res=response) =>{
    // Comprobar si se pasa un ID de Mongo
    const esMongoID = Types.ObjectId.isValid(termino);
    if(esMongoID)
    {
        const categoria = await Category.findById(termino).populate('user','name');
        //? Si es un ID de Mongo y corresponde con una categoria regresa un Array con dicha categoria
        //? De otro modo regresa un Array vacio 
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }


    // Comprueba si se pasa una palabra 

    // Expresion regular no sensitiva a Mayusculas
    const regex = new RegExp(termino,'i');
    // Busca la categoria segun el nombre
    const categoria = await Category.find({name: regex})
    res.json({
        results: categoria
    });
}

// Buscar Producto por ID o por nombre
const buscarPoruductos = async(termino='',res=response) =>{
    // Comprobar si se pasa un ID de Mongo
    const esMongoID = Types.ObjectId.isValid(termino);
    if(esMongoID)
    {
        const producto = await Product.findById(termino).populate('user','name').populate('category','name');
        //? Si es un ID de Mongo y corresponde con un producto regresa un Array con dicho producto
        //? De otro modo regresa un Array vacio 
        return res.json({
            results: (producto) ? [producto] : []
        });
    }


    // Comprueba si se pasa una palabra 

    // Expresion regular no sensitiva a Mayusculas
    const regex = new RegExp(termino,'i');
    // Busca el producto segun el nombre
    const producto = await Product.find({name: regex}).populate('user','name').populate('category','name')
    res.json({
        results: producto
    });
}

// Busca segun coleccion y termino
// Ejemplo: /coleccion/termino
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
                buscarCategorias(termino,res);
            break;
        case 'products':
                buscarPoruductos(termino,res);
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