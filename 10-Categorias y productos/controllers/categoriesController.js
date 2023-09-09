import { response, request } from "express";
import { Category } from "../models/index.js";


// Obtener categorias :: paginado - total - populate
const getCategories = async(req=request,res=response) => {
    const {limit = 5, from = 0} = req.query;
    const query = {status: true}

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user','name')
            .skip(Number(from))
            .limit(Number(limit)),
    ])
    
    res.json({
        total,
        categories
    });
}

// Obtener categoria ::  populate {}
const getOneCategory = async(req,res=response) => {
    const {id} = req.params
    const category = await Category.findById(id).populate('user','name');
    res.json(category)
}

const createCategories = async(req = request, res=response) => {
    const name = req.body.name.toUpperCase();
    const categoriaDB = await Category.findOne({name});
    if(categoriaDB) 
    {
        res.status(400).json({
            msg: `La categoria ${name} ya existe`
        })
    }

    // Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const categoria = new Category(data);

    // Guardar en DB
    await categoria.save();

    res.status(201).json(categoria)
}

// Actualizar categoria 
const updateCategory = async(req,res=response) => {

    const {id} = req.params;
    const {status, user, ...data} = req.body;

    data.name = data.name.toUpperCase();
    data.user = req.user.id;

    const category = await Category.findByIdAndUpdate(id, data, {new: true});

    res.json({
        category
    })

}

// Borrar categoria
const deleteCategory = async(req,res=response) => {

    const {id} = req.params;
    const category = await Category.findByIdAndUpdate(id,{status: false}, {new: true});
    res.json({
        category
    })
}


export
{
    createCategories,
    getCategories,
    getOneCategory,
    updateCategory,
    deleteCategory
}