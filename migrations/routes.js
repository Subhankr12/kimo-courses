const migrationRouter = require('express').Router();
const migrationController = require('./controller');

migrationRouter.post(
  '/import-courses',
  migrationController.importCoursesFromJsonFile
);

module.exports = migrationRouter;
