const express = require("express");
const pageController = require("../controllers/pageController");
const { checkLog } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(pageController.getIndexPage);
router.route("/about").get(pageController.getAboutPage);
router.route("/register").get(checkLog, pageController.getRegisterPage);
router.route("/login").get(checkLog, pageController.getLoginPage);

module.exports = router;
