const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.APP_PORT || 5000;

const { connectDB } = require('./config/mongoose');

const migrationRouter = require('./migrations/routes');
const courseRouter = require('./src/courses/routes');

app.use(express.json());

app.use('/migrations', migrationRouter);
app.use('/courses', courseRouter);

app.listen(port, async () => {
  await connectDB();

  console.log(`Server is up and running on port: ${port}`);
});

module.exports = app;
