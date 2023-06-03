const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).redirect("auth/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "Fail category ",
      errorMessage: error.message,
      error,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findOneAndRemove({ _id: req.params.id });
    // console.log(req.params.id);

    res.status(200).redirect("/auth/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "failure",
      error,
    });
  }
};
