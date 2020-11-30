import { Router } from "express";
import { getGameBySlug } from "../controller/game.controller";

const router = Router();

router.get("/:slug", getGameBySlug);

export default router;
