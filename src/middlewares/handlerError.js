module.exports = (error, _req, res, _next) => {
  if (error.statusCode) {
    const { statusCode, message } = error;
    return res.status(statusCode).json({ message });
  }

  return res.status(500).json({ message: 'Internal Error' });
};
