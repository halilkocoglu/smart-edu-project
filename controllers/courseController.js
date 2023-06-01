const Course = require;

exports.createCourse = async (req, res, next) => {
  const course = await Course.create(req.body);
  try {
    res.status(201).json({
      status: "success",
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: "bad-request",
      error,
    });
  }
};