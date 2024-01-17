"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
// Obtener usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json(users);
});
exports.getUsers = getUsers;
// Obtener un usuario
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({ msg: `No existe un usuario con id ${id}` });
    }
});
exports.getUser = getUser;
// Crear un usuario
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const user = new user_1.default(body);
        yield user.save();
        res.json(user);
    }
    catch (error) {
        console.log(`A ocurrido un error ${error}`);
        res.status(500).json({
            msg: 'A ocurrido un error - Hable con el administrador'
        });
    }
});
exports.postUser = postUser;
// Actualizar un usuario
const putUser = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: "From putUser - userController",
        body,
        id
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