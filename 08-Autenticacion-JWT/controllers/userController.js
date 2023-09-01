import { request, response } from "express"
import {User} from "../models/user.js"
import bcryptjs from 'bcryptjs';



const userGet = async(req = request, res = response) => {

    const {limit = 5, from = 0} = req.query;
    const query = {status: true}

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit)),
    ])

    res.json({
        total,
        users
    })
}

const userPost = async (req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name,email,password, role});

    // Encryptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password,salt)

    // Guardar en DB
    await user.save();
    
    res.json(user)
}

const userPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, email ,password, google, ...resto} = req.body;

    // Validar contra DB
    if(password){
        // Encryptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id, resto, {new: true});

    res.json(user)
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - from Controllers'
    })
}

const userDelete = async(req, res = response) => {
    const {id} = req.params;
    
    // Borrar fisicamente
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false});
    const userAuth = req.user;
    res.json({
        user,
        userAuth
    })
}

export {
    userGet,
    userDelete,
    userPost,
    userPut,
    userPatch
}