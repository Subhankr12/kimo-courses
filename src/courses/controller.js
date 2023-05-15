const Course = require('../../models/Course');
const { successResponse, errorResponse } = require('../../utils/response');
const { STATUS_CODES } = require('../../utils/common');

// Endpoint to get a list of all available courses
const getAllCourses = async (req, res) => {
  try {
    const { sort, domain } = req.query;
    let query = {};

    // Apply domain filtering if provided
    if (domain) {
      query.domain = domain;
    }

    let courses;

    // Apply sorting based on the given sort parameter
    if (sort === 'alphabetical') {
      courses = await Course.find(query).sort({ name: 1 });
    } else if (sort === 'date') {
      courses = await Course.find(query).sort({ date: -1 });
    } else if (sort === 'rating') {
      courses = await Course.find(query).sort({ rating: -1 });
    } else {
      courses = await Course.find(query);
    }

    return successResponse({
      message: 'All courses retrieved successfully.',
      data: {
        courses,
      },
      res,
    });
  } catch (error) {
    console.error(error);
    return errorResponse({
      error,
      res,
    });
  }
};

// Endpoint to get the course overview
const getCourseOverview = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw {
        code: STATUS_CODES.NOT_FOUND,
        message: 'Course not found',
      };
    }

    return successResponse({
      message: 'Course overview retrieved successfully.',
      data: {
        course,
      },
      res,
    });
  } catch (error) {
    console.error(error);
    return errorResponse({
      error,
      res,
    });
  }
};

// Endpoint to get specific chapter information
const getChapterById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw {
        code: STATUS_CODES.NOT_FOUND,
        message: 'Course not found',
      };
    }
    const chapter = course.chapters.find(
      (ch) => ch._id.toString() === req.params.chapterId
    );
    if (!chapter) {
      throw {
        code: STATUS_CODES.NOT_FOUND,
        message: 'Chapter not found',
      };
    }

    return successResponse({
      message: 'Chapter data retrieved successfully.',
      data: {
        chapter,
      },
      res,
    });
  } catch (error) {
    console.error(error);
    return errorResponse({
      error,
      res,
    });
  }
};

// Endpoint to allow users to rate each chapter (positive/negative)
const rateChapterById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw {
        code: STATUS_CODES.NOT_FOUND,
        message: 'Course not found',
      };
    }
    const chapter = course.chapters.find(
      (ch) => ch._id.toString() === req.params.chapterId
    );
    if (!chapter) {
      throw {
        code: STATUS_CODES.NOT_FOUND,
        message: 'Chapter not found',
      };
    }

    // Update the chapter rating based on user input
    if (req.body.rating === 'positive') {
      chapter.positiveRatings++;
    } else if (req.body.rating === 'negative') {
      chapter.negativeRatings++;
    }

    // Recalculate the total course rating
    const totalRatings = chapter.positiveRatings + chapter.negativeRatings;
    course.rating =
      totalRatings > 0
        ? (chapter.positiveRatings - chapter.negativeRatings) / totalRatings
        : 0;

    // Save the updated course and chapter
    await course.save();

    return successResponse({
      message: 'Chapter rating updated successfully.',
      data: {
        success: true,
      },
      res,
    });
  } catch (error) {
    console.error(error);
    return errorResponse({ error, res });
  }
};

module.exports = {
  getAllCourses,
  getCourseOverview,
  getChapterById,
  rateChapterById,
};
