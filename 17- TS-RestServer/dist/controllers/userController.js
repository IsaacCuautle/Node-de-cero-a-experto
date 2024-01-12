"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
// Obtener usuarios
const getUsers = (req, res) => {
    res.json({
        msg: "Desde getUsers - usuarios controller"
    });
};
exports.getUsers = getUsers;
// Obtener un usuario
const getUser = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "From getUser - userController",
        id
    });
};
exports.getUser = getUser;
// Crear un usuario
const postUser = (req, res) => {
    const { body } = req;
    res.json({
        msg: "From postUser - userController",
        body
    });
};
exports.postUser = postUser;
// Actualizar un usuario
const putUser = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: "From putUser - userController",
        body
    });
};
exports.putUser = putUser;
// Eliminar un usuario
const deleteUser = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: "From deleteUser - userController",
        id
    });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map