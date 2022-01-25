const registerUserService = require('../services/registerUserService');

module.exports = async (req, res, next) => {
  try {
    const userRegister = req.body;

    const response = await registerUserService(userRegister);

    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
};
