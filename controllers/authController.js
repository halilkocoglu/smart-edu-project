const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect("/");
  } catch (error) {
    res.status(400).json({
      status: "Fail Auth",
      errorMessage: error.message,
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, same) => {
        // USER SESSION
        req.session.userID = user._id;
        res.status(200).redirect("/auth/dashboard");
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.logoutUser = async (req, res) => {
  req.session.destroy(() => res.redirect("/"));
};

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );
  const categories = await Category.find();
  const courses = await Course.find({ user: req.session.userID });
  const users = await User.find();
  console.log(users.countDocument);
  res.status(200).render("dashboard", {
    pageName: "dashboard",
    user,
    categories,
    courses,
    users,
  });
};
