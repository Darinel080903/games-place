import { Router } from "express";
import { methods as GameMethods } from '../controllers/game.controller'

const storage = require('../multer');
const multer = require('multer');
const uploader = multer({storage})

const router = Router();

router.get('/', GameMethods.getGames);
router.post('/', uploader.single('image') ,GameMethods.addGame);
router.get('/:id', GameMethods.getGame);
router.put('/:id', GameMethods.updateGame);
router.delete('/:id', GameMethods.deleteGame);
router.get('/verifyStock/:id', GameMethods.verifyStock);
router.put('/reduceStock/:id', GameMethods.reduceStock);
export default router;
