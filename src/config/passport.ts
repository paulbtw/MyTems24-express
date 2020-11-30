import passport from "passport";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
var SteamStrategy = require("passport-steam").Strategy;

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5000/auth/steam/callback",
      realm: "http://localhost:5000/",
      apiKey: "A093FF24D40F3BC724FD4BEB7DCE80F3",
    },
    async (identifier: string, profile: any, done: any) => {
      const currentUser = await getRepository(User).findOne({
        where: { steamId: profile._json.steamid },
      });
      if (!currentUser) {
        const newUser = new User();
        newUser.steamId = profile._json.steamid;

        const savedUser = await getRepository(User).save(newUser);

        if (savedUser) {
          return done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  getRepository(User)
    .findOne({ where: { id: id } })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(new Error("Failed to deserialize user"));
    });
});
