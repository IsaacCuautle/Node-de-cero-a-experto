import { Request, Response } from "express";


// Obtener usuarios
const getUsers = (req:Request, res: Response) =>{
    res.json({
        msg: "Desde getUsers - usuarios controller"
    })
}

// Obtener un usuario
const getUser = (req:Request, res: Response) =>{
    const {id} = req.params;
    res.json({
        msg: "From getUser - userController",
        id
    })
}

// Crear un usuario
const postUser = (req:Request, res: Response) =>{
    const {body} = req;
    res.json({
        msg: "From postUser - userController",
        body
    })
}

// Actualizar un usuario
const putUser = (req:Request, res: Response) =>{
    const {id} = req.params;
    const {body} = req;
    res.json({
        msg: "From putUser - userController",
        body
    })
}

// Eliminar un usuario
const deleteUser = (req:Request, res: Response) =>{
    const {id} = req.params;
    res.json({
        msg: "From deleteUser - userController",
        id
    })
}


export
{
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
}