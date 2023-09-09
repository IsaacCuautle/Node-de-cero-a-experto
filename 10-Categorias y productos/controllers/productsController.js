import { response, request } from "express";
import { Product } from "../models/index.js";


// Obtener Productos :: paginado - total - populate
const getProducts = async(req=request,res=response) => {
    const {limit = 5, from = 0} = req.query;
    const query = {status: true}

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user','name')
            .populate('category','name')
            .skip(Number(from))
            .limit(Number(limit)),
    ])
    
    res.json({
        total,
        products
    });
}

// Obtener producto ::  populate {}
const getProduct = async(req,res=response) => {
    const {id} = req.params
    const product = await Product.findById(id)
    .populate('user','name')
    .populate('category','name')

    res.json(product)
}

// Crear Producto 
const createProduct = async(req = request, res=response) => {

    const {user,status, ...body} = req.body;

    const productoDB = await Product.findOne({name: body.name });
    //! Si ya exite un producto con el mismo nombre manda un error
    if(productoDB) 
    {
        res.status(400).json({
            msg: `El producto ${productoDB.name } ya existe`
        })
    }

    //* Genera los datos a guardar
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }
    const producto = new Product(data);

    //* Guarda en DB el producto y lo imprime en la respuesta
    await producto.save();
    res.status(201).json(producto);

}

// Actualizar producto 
const updateProduct = async(req,res=response) => {

    const {id} = req.params;
    const {status, user, ...data} = req.body;
    //? Comprueba si el nombre esta en la peticion y lo capitaliza
    if(data.name){
        data.name = data.name.toUpperCase();
    }

    data.user = req.user.id;

    const product = await Product.findByIdAndUpdate(id, data, {new: true});
    res.json(product)

}

// Borrar producto
const deleteProduct = async(req,res=response) => {

    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,{status: false}, {new: true});
    res.json(product)
}


export
{
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}