const courseRouter = require('express').Router();
const courseController = require('./controller');

courseRouter.get('/', courseController.getAllCourses);
courseRouter.get('/:id', courseController.getCourseOverview);
courseRouter.get('/:id/chapters/:chapterId', courseController.getChapterById);
courseRouter.post(
  '/:id/chapters/:chapterId/rate',
  courseController.rateChapterById
);

module.exports = courseRouter;
