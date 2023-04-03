const mongoose = require("mongoose");

var forgot_password_schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  accessToken: {
    type: String,
    required: true,
  },
  expiredAt: {
    type: Date,
  },
});

const ForgotPassword = mongoose.model("ForgotPassword", forgot_password_schema);
module.exports = ForgotPassword;
