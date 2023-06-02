const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(200).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail category ",
      errorMessage: error.message,
      error,
    });
  }
};
