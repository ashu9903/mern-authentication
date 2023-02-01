const {
  registerUserController,
  loginUserController,
  forgetPasswordController,
  resetPasswordController,
  loginWithGoogle,
} = require("../controllers/authController");
const User = require("../models/User");

const router = require("express").Router();
router
  .post("/login", loginUserController)
  .post("/register", registerUserController)
  .post("/forget-password", forgetPasswordController)
  .post("/reset-password", resetPasswordController)
  .post("/login-with-google", loginWithGoogle)
  .delete("/distroy", async (req, res) => {
    await User.deleteMany();
    res.json({
      success: true,
    });
  });
module.exports = router;
