import { Router } from "express";
import { methods as GameMethods } from '../controllers/game.controller'

const router = Router();

router.get('/', GameMethods.getGames);

export default router;
