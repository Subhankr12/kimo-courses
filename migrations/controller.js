const Course = require('../models/Course');
const { parseCoursesJson } = require('./services');
const { successResponse, errorResponse } = require('../utils/response');

async function importCoursesFromJsonFile(req, res) {
  try {
    const courses = parseCoursesJson();

    // Insert course data into the collection
    await Course.insertMany(courses);

    return successResponse({
      message: 'Course data imported successfully.',
      res,
    });
  } catch (err) {
    console.error('Error importing course data:', err);
    return errorResponse({
      message: 'Failed to import course data.',
      res,
    });
  }
}

module.exports = {
  importCoursesFromJsonFile,
};
