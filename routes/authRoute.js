const express = require("express");
const User = require("../models/User");

const { body } = require("express-validator");
const authController = require("../controllers/authController");
const { checkDash } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/signup").post(
  [
    body("name").not().isEmpty().withMessage("Please enter your name"),

    body("email")
      .isEmail()
      .withMessage("Please enter valid email")
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject("Email already exists");
          }
        });
      }),

    body("password").not().isEmpty().withMessage("Please enter your password"),
  ],
  authController.createUser
);
router.route("/login").post(authController.loginUser);
router.route("/logout").get(authController.logoutUser);
router.route("/dashboard").get(checkDash, authController.getDashboardPage);

module.exports = router;
