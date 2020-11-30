import { Router } from "express";
import passport from "passport";
import {
  getAuthLoginSuccess,
  getAuthSteamFailed,
  getLogout,
  setRedirect,
} from "../controller/auth.controller";
import { isAuth } from "../middlewares/isAuth.middleware";

const router = Router();

router.get(
  "/steam",
  setRedirect,
  passport.authenticate("steam", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  })
);

router.get("/steam/callback", passport.authenticate("steam"), (req, res) => {
  const redirect = req.session?.returnTo || "/";
  return res.redirect(process.env.CLIENT_URL + redirect);
});

router.get("/steam/failed", getAuthSteamFailed);

router.get("/login/success", isAuth, getAuthLoginSuccess);

router.get("/logout", getLogout);

export default router;
