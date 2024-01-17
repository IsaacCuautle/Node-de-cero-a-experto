import { Request, Response } from "express";
import User from "../models/user";


// Obtener usuarios
const getUsers = async(req:Request, res: Response) =>{

    const users = await User.findAll();

    res.json(users);
}

// Obtener un usuario
const getUser = async(req:Request, res: Response) =>{
    const {id} = req.params;
    const user = await User.findByPk(id);
    if(user){
        res.json(user);
    }else{
        res.status(404).json({msg:`No existe un usuario con id ${id}`});
    }

    
}

// Crear un usuario
const postUser = async(req:Request, res: Response) =>{
    const {body} = req;
    try {
        
        const user = new User(body);
        await user.save();

        res.json(user);

    } catch (error) {
        console.log(`A ocurrido un error ${error}`);
        res.status(500).json({
            msg: 'A ocurrido un error - Hable con el administrador'
        })
    }
}

// Actualizar un usuario
const putUser = (req:Request, res: Response) =>{
    const {id} = req.params;
    const {body} = req;
    res.json({
        msg: "From putUser - userController",
        body,
        id
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