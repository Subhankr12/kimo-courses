const request = require('supertest');
const app = require('../server');

describe('Course Endpoints', () => {
  let courseId;
  let chapterId;

  // Test the endpoint to get a list of all available courses
  describe('GET /courses', () => {
    it('should retrieve all courses', async () => {
      const response = await request(app).get('/courses');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(Array.isArray(response.body.data.courses)).toBe(true);

      courseId = response.body.data.courses[0]._id;
      chapterId = response.body.data.courses[0].chapters[0]._id;
    });
  });

  // Test the endpoint to get the course overview
  describe('GET /courses/:courseId', () => {
    it('should retrieve the course overview', async () => {
      const response = await request(app).get(`/courses/${courseId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.course._id).toBe(courseId);
    });

    it('should return 404 if course does not exist', async () => {
      const invalidCourseId = '646121c15e81932cf698bc6a'; // invalid id
      const response = await request(app).get(`/courses/${invalidCourseId}`);
      expect(response.body.statusCode).toBe(404);
      expect(response.body.message).toBe('Course not found');
    });
  });

  // Test the endpoint to get specific chapter information
  describe('GET /courses/:courseId/chapters/:chapterId', () => {
    it('should retrieve specific chapter information', async () => {
      // Assume courseId and chapterId of an existing chapter
      const response = await request(app).get(
        `/courses/${courseId}/chapters/${chapterId}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.chapter._id).toBe(chapterId);
    });

    it('should return 404 if course does not exist', async () => {
      const invalidCourseId = '646121c15e81932cf698bc6a';
      const response = await request(app).get(
        `/courses/${invalidCourseId}/chapters/${chapterId}`
      );
      expect(response.body.statusCode).toBe(404);
      expect(response.body.message).toBe('Course not found');
    });

    it('should return 404 if chapter does not exist', async () => {
      const invalidChapterId = '646121c15e81932cf698bc6';
      const response = await request(app).get(
        `/courses/${courseId}/chapters/${invalidChapterId}`
      );
      expect(response.body.statusCode).toBe(404);
      expect(response.body.message).toBe('Chapter not found');
    });
  });

  // Test the endpoint to allow users to rate each chapter
  describe('POST /courses/:courseId/chapters/:chapterId/rate', () => {
    it('should rate the chapter and update the course aggregated rating', async () => {
      // Assume courseId and chapterId of an existing chapter
      const rating = 'positive'; // Positive rating

      const response = await request(app)
        .post(`/courses/${courseId}/chapters/${chapterId}/rate`)
        .send(rating);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(response.body.data.success).toBe(true);
    });

    it('should return 404 if course does not exist', async () => {
      const invalidCourseId = '646121c15e81932cf698bc6a';
      const rating = 'positive'; // Positive rating

      const response = await request(app)
        .post(`/courses/${invalidCourseId}/chapters/${chapterId}/rate`)
        .send(rating);
      expect(response.body.statusCode).toBe(404);
      expect(response.body.message).toBe('Course not found');
    });

    it('should return 404 if chapter does not exist', async () => {
      const invalidChapterId = '646121c15e81932cf698bc6';
      const rating = 'positive'; // Positive rating

      const response = await request(app)
        .post(`/courses/${courseId}/chapters/${invalidChapterId}/rate`)
        .send(rating);
      expect(response.body.statusCode).toBe(404);
      expect(response.body.message).toBe('Chapter not found');
    });
  });
});
