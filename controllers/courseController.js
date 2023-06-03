const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      user: req.session.userID,
    });
    res.status(201).redirect("/courses");
  } catch (error) {
    res.status(400).json({
      status: "bad-request",
      errorMessage: error.message,
      error,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort("-createdAt");
    const categories = await Category.find();
    res.status(200).render("courses", {
      courses,
      categories,
      pageName: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail course",
      errorMessage: error.message,
      error,
    });
  }
};

exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    // or u can add .populate('user') to above one and u kinda call like 'course.user.name' instead of the below one(the last one for html file)
    const user = await User.findOne({ _id: course.user });
    res.status(200).render("course-single", {
      course,
      user,
      pageName: "courses",
    });
  } catch (error) {
    res.status(404).json({
      status: "course not found.",
      errorMessage: error.message,
      error,
    });
  }
};
exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect("/auth/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect("/auth/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
