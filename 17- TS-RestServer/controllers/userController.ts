import { Request, Response, request } from "express";
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
        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        })

        if(existEmail)
        {
            return res.status(500).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })
        }

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
const putUser = async(req:Request, res: Response) =>{
    const {id} = req.params;
    const {body} = req;
    try {
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                msg: `No existe un usuario con id ${id}`
            })
        }

        const existEmail = await User.findOne({
            where: {
                email: body.email
            }
        })

        if(existEmail)
        {
            return res.status(500).json({
                msg: `Ya existe un usuario con el email ${body.email}`
            })
        }

        await user.update(body);
        res.json({user})

    } catch (error) {
        console.log(`A ocurrido un error ${error}`);
            res.status(500).json({
            msg: 'A ocurrido un error - Hable con el administrador'
        })
    }
}

// Eliminar un usuario
const deleteUser = async(req:Request, res: Response) =>{
    const {id} = req.params;
    try {
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                msg: `No existe un usuario con id ${id}`
            })
        }

        // Eliminacion definitiva
        //await user.destroy();

        // Eliminacion logica
        await user.update({status: false})
        res.json({user})

    } catch (error) {
        console.log(`A ocurrido un error ${error}`);
            res.status(500).json({
            msg: 'A ocurrido un error - Hable con el administrador'
        })
    }
}


export
{
    getUsers,
    getUser,
    postUser,
    putUser,
    deleteUser
}