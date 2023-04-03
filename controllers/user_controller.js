const User = require("../models/user_Schema");

//rendering user home page
module.exports.home = function (req, res) {
  return res.render("user_home", {
    title: "Home",
  });
};

//rendering the sign-in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/home");
  }

  return res.render("user_sign_in", {
    title: "User | Sign In",
  });
};

//rendering the sign-up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/user/home");
  }

  return res.render("user_sign_up", {
    title: "User | Sign Up",
  });
};

//getting the sign up data
module.exports.create = async function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    await User.create(req.body);
    console.log("User created");
    return res.redirect("/user/signIn");
  } else {
    return res.redirect("back");
  }
};

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', "Logged in successfully");
    return res.redirect('/user/home');
}

//function to sign out
module.exports.destroySession = function (req, res) {
  req.logout(function () {
    req.flash("success", "Logged out successfully");
    return res.redirect("/");
  });
};
