const fs = require('fs');

function parseCoursesJson() {
  const coursesJson = fs.readFileSync('./config/courses.json');
  const coursesData = JSON.parse(coursesJson);
  return coursesData;
}

module.exports = {
  parseCoursesJson,
};
