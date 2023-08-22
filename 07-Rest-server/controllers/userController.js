import { request, response } from "express"


const userGet = (req = request, res = response) => {

    const {q, name = 'no-name', apikey, page = 1, limit = 10} = req.query;

    res.json({
        msg: 'get API - from Controllers',
        q,
        name,
        apikey,
        page,
        limit
    })
}

const userPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - from Controllers',
        nombre,
        edad
    })
}

const userPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'put API - from Controllers',
        id
    })
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - from Controllers'
    })
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - from Controllers'
    })
}

export {
    userGet,
    userDelete,
    userPost,
    userPut,
    userPatch
}