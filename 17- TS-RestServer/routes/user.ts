import { Router } from "express";
import { deleteUser, getUser, getUsers, postUser, putUser } from "../controllers/userController";


const router = Router();
router.get('/',getUsers);
router.get('/:id',getUser);
router.post('/',postUser);
router.put('/',putUser);
router.delete('/',deleteUser);


export default router