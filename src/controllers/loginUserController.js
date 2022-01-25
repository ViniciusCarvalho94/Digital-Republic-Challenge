const loginUserService = require('../services/loginUserService');

module.exports = async (req, res, next) => {
  try {
    const userLogin = req.body;

    const token = await loginUserService(userLogin);

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};
