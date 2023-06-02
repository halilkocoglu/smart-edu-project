const User = require("../models/User");

const checkDash = async (req, res, next) => {
  const user = await User.findById(req.session.userID).then((err, user) => {
    if (!user) return res.redirect("/login");
    next();
  });
};

const checkLog = async (req, res, next) => {
  if (req.session.userID) return res.redirect("/");
  next();
};

module.exports = {
  checkDash,
  checkLog,
};
