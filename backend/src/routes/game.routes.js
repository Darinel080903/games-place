import { Router } from "express";
import { methods as GameMethods } from '../controllers/game.controller'

const router = Router();

router.get('/', GameMethods.getGames);
router.post('/', GameMethods.addGame);
router.get('/:id', GameMethods.getGame);
router.put('/:id', GameMethods.updateGame);
router.delete('/:id', GameMethods.deleteGame);
export default router;
