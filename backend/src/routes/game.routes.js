import { Router } from "express";
import { methods as GameMethods } from '../controllers/game.controller'

const storage = require('../multer');
const multer = require('multer');
const uploader = multer({storage})

const router = Router();

router.get('/', GameMethods.getGames);
router.post('/', uploader.single('image') ,GameMethods.addGame);
router.get('/:id', GameMethods.getGame);
router.put('/:id', uploader.single('image') ,GameMethods.updateGame);
router.put('/stock/:id', GameMethods.updateStock);
router.delete('/:id', GameMethods.deleteGame);
router.get('/verifyStock/:id', GameMethods.verifyStock);
router.put('/reduceStock/:id', GameMethods.reduceStock);
router.get('/search/:title', GameMethods.searchGame);
export default router;
