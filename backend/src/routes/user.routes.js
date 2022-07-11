import { Router } from "express";
import { methods as UserMethods } from '../controllers/user.controller'

const router = Router();

router.get('/', UserMethods.getUsers)
router.get('/:id', UserMethods.getUser)
router.post('/', UserMethods.addUser)
router.delete('/:id', UserMethods.deleteUser)
router.put('/:id', UserMethods.updateUser)

export default router;