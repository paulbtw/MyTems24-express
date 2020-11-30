import { Router } from "express";
import gameRoutes from "./game.routes";
import testRoutes from "./test.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const router = Router();

router.use("/game", gameRoutes);
router.use("/auth", authRoutes);
router.use("/test", testRoutes);
router.use("/user", userRoutes);

export default router;
