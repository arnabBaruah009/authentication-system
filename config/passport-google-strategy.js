const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const User = require("../models/user_Schema");
const crypto = require("crypto");

passport.use(
  new googleStrategy(
    {
      clientID: "", //paste clientID here
      clientSecret: "", //paste clientSecret here
      callbackURL: "http://localhost:8000/user/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      //find the user
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        //if user is found set it as req.user
        return done(null, user);
      } else {
        //if not found, create the user and set it as req.user
        let user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString("hex"),
        });
        return done(null, user);
      }
    }
  )
);

module.exports = passport;
