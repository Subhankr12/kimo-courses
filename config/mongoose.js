const mongoose = require('mongoose');

const uri = process.env.MONGO_URI; // MongoDB connection URI

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
};
