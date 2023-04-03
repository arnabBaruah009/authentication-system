const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user_Schema");

// authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      //find a user and establish the identity
      const user = await User.findOne({ email: email });

      if (!user || user.password != password) {
        console.log("Error: Invalid Username/Password");
        return done(null, false);
      }

      return done(null, user);
    }
  )
);

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserilizing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  return done(null, user);
});

//check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  //if the user is not signed in
  return res.redirect("/user/signIn");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed user from the session cookie and we are just sending this to the locals for the views.
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
