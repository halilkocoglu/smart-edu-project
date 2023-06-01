const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: "success",
      course,
    });
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
    const courses = await Course.find();
    res.status(200).render("courses", {
      courses,
      pageName: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      errorMessage: error.message,
      error,
    });
  }
};

exports.getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render("course-single", {
      course,
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
