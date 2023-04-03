const ForgotPassword = require("../models/forgot_password");
const User = require("../models/user_Schema");
const crypto = require("crypto");
const forgotPasswordMailer = require("../mailers/forgot_password_mailer");

module.exports.home = function (req, res) {
  return res.render("forgot_password", {
    title: "Enter Email",
  });
};

module.exports.create = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      let dt = new Date();
      let token = await ForgotPassword.create({
        user: user._id,
        accessToken: crypto.randomBytes(20).toString("hex"),
        expiredAt: dt.setMinutes(dt.getMinutes() + 10),
        isExpired: false,
      });
      token = await token.populate("user");
      req.flash("success", "Mail sent");
      forgotPasswordMailer.newToken(token);
      return res.redirect("back");
    } else {
      req.flash("error", "User not found");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Error in creating token");
    return res.redirect("back");
  }
};

module.exports.findToken = async function (req, res) {
  try {
    let token = await ForgotPassword.findOne({ accessToken: req.params.token });

    if (!token) {
      req.flash("error", "Link Expired");
      return res.redirect("/forgot_password");
    }

    if (Date.now() < token.expiredAt.getTime()) {
      token = await token.populate("user");
      let user = await User.findOne({ email: token.user.email });
      token.deleteOne();
      return res.render("reset_password", {
        title: "Reset Password",
        user: user,
      });
    } else {
      token.deleteOne();
      req.flash("error", "Link Expired");
      return res.redirect("/forgot_password");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Error in reset link. Try again");
    return res.redirect("/user/signIn");
  }
};

module.exports.reset = function (req, res) {
  return res.render("reset_password", {
    title: "Reset Password",
  });
};

module.exports.resetPass = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    if (req.body.password == req.body.confirm_password) {
      user.password = req.body.password;
      req.flash("success", "Password reset successfully");
      user.save();
      return res.redirect("/user/signIn");
    } else {
      req.flash("error", "Password not matched");
      return res.redirect("back");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Error in reseting password");
    return res.redirect("/forgot_password");
  }
};
