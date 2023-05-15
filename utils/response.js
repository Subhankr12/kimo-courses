const { STATUS_CODES } = require('./common');

const successResponse = ({
  code = STATUS_CODES.SUCCESS,
  message = 'Success!',
  data = {},
  res,
}) => {
  return res.status(STATUS_CODES.SUCCESS).json({
    statusCode: code,
    data,
    message,
  });
};

const errorResponse = ({ code, message, error, res }) => {
  console.error('Error in Kimo Courses: ', error);
  if (error && !code && !message) {
    code =
      (error && error.response && error.response.status) ||
      (error && error.code);
    message = error && error.message;
  }

  if (!code) {
    code = STATUS_CODES.FAILED;
  }
  if (!message) {
    message = 'Internal server error!';
  }

  return res.status(STATUS_CODES.FAILED).json({
    statusCode: code,
    message,
    error: error || 'Internal server error',
  });
};

module.exports = {
  successResponse,
  errorResponse,
};
