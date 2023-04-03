const express = require("express");
const router = express.Router();

const forgotPasswordController = require("../controllers/forgot_password_controller");

router.get("/", forgotPasswordController.home);
router.post("/create-token", forgotPasswordController.create);
router.get("/token/:token", forgotPasswordController.findToken);
router.get("/reset", forgotPasswordController.reset);
router.post("/reset/:id", forgotPasswordController.resetPass);

module.exports = router;
