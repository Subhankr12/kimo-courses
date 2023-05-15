const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  date: {
    type: Number,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  domain: {
    type: [String],
    required: true,
    index: true,
  },
  rating: { type: Number, default: 0 },
  chapters: [
    {
      name: { type: String, required: true },
      text: { type: String, required: true },
      positiveRatings: { type: Number, default: 0 },
      negativeRatings: { type: Number, default: 0 },
    },
  ],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
